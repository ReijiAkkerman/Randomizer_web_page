<?php
    namespace project\model;

    use project\control\parent\User;

    use project\model\traits\ListsConnection;
    use project\model\traits\SettingsConnection;
    use project\model\traits\AuthConnection;

    use project\model\regex\Lists as rLists;

    use project\model\components\ListsErrors;
    use project\model\traits\WriteError;
    use project\model\traits\SendErrors;

    use project\model\components\ListData;
    use project\model\components\ListsData;

    class Lists extends User {
        private \mysqli $mysql;
        private ListsErrors $errors;
        private string $error_field;
        private string $error_message;

        private int $kanji;





        public function __construct() {
            $this->errors = new ListsErrors();
        }





        // model\Auth::reg()
        public function createListsTable(string $username): void {
            $this->createListsConnection();
            $queries = [ 
                "CREATE TABLE IF NOT EXISTS $username(
                    ID SERIAL,
                    name VARCHAR(255) NULL,
                    type VARCHAR(10) NOT NULL,
                    date DATETIME NOT NULL,
                    hash VARCHAR(50) UNIQUE,
                    native_language SMALLINT UNSIGNED NOT NULL,
                    active_language SMALLINT UNSIGNED NOT NULL,
                    source TEXT NOT NULL,
                    translation TEXT NOT NULL,
                    transcription TEXT NULL,
                    syncronized BOOLEAN DEFAULT 0 NOT NULL
                )",
                "CREATE TABLE IF NOT EXISTS __LISTS__(
                    USER_ID SMALLINT UNSIGNED NOT NULL,
                    SELECTED_LIST_ID BIGINT UNSIGNED NULL
                )"
            ];
            foreach($queries as $query) {
                $this->mysql->query($query);
            }
            $this->closeListsConnection();
        }




        /**
         * Создает новый основной список
         */

        public function createNew(
            string $_active_language_mark,
            string $_list_type,
            string $_list_name
        ): void {
            if($this->getCookie()) {
                $this->createSettingsConnection();
                $LIST_TYPE = urldecode($_list_type);
                $LIST_NAME = urldecode($_list_name);
                // проверка полученных данных на соответствие формату обработки
                if(!$this->validateLanguageMark($_active_language_mark)) $this->exitWithError();
                if(!$this->validateListType($LIST_TYPE)) $this->exitWithError();
                if($this->checkListNameExistence($LIST_NAME))
                    if(!$this->validateListName($LIST_NAME)) $this->exitWithError();
                // получение информации о наличии в языке иероглифов
                $query = "SELECT LANG_ID,kanji FROM changed_languages WHERE mark='$_active_language_mark' && USER_ID={$this->_id}";
                $result = $this->mysql->query($query);
                if($result->num_rows) {
                    foreach($result as $value) {
                        $ACTIVE_LANGUAGE_ID = $value['LANG_ID'];
                        $this->kanji = $value['kanji'];
                    }
                }
                else {
                    $query = "SELECT ID,kanji FROM all_languages WHERE mark='$_active_language_mark'";
                    $result = $this->mysql->query($query);
                    foreach($result as $value) {
                        $ACTIVE_LANGUAGE_ID = $value['ID'];
                        $this->kanji = $value['kanji'];
                    }
                }
                // получение исходного языка списка
                $query = "SELECT main FROM languages WHERE USER_ID={$this->_id}";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $MAIN_LANGUAGE_ID = $value['main'];
                }
                $this->closeSettingsConnection();

                // получение наименования таблицы пользователя
                $this->createAuthConnection();
                $TABLE_NAME = $this->getUserTableName();
                $this->closeAuthConnection();

                // подготовка строк
                $this->createListsConnection();
                if(!$this->checkRowsExistence()) $this->exitWithError();
                $sources = 
                $translations = null;
                if($this->kanji) {
                    $transcriptions = null;
                    $this->prepareRows($sources, $translations, $transcriptions);
                    if(!$this->checkRowsNumberEquality($sources, $translations, $transcriptions)) $this->exitWithError();
                    $HASH = $this->prepareListHash($sources, $translations, $transcriptions);
                    if($this->checkListExistence($TABLE_NAME, $HASH)) $this->exitWithError();
                    $query = "INSERT INTO $TABLE_NAME(
                        name,
                        type,
                        date,
                        hash,
                        native_language,
                        active_language,
                        source,
                        translation,
                        transcription
                    ) VALUES (
                        '$LIST_NAME',
                        '$LIST_TYPE',
                        NOW(),
                        '$HASH',
                        $MAIN_LANGUAGE_ID,
                        $ACTIVE_LANGUAGE_ID,
                        '$sources',
                        '$translations',
                        '$transcriptions'
                    )";
                    $this->mysql->query($query);
                }
                else {
                    $this->prepareRows($sources, $translations);
                    if(!$this->checkRowsNumberEquality($sources, $translations)) $this->exitWithError();
                    $HASH = $this->prepareListHash($sources, $translations);
                    if($this->checkListExistence($TABLE_NAME, $HASH)) $this->exitWithError();
                    $query = "INSERT INTO $TABLE_NAME(
                        name,
                        type,
                        date,
                        hash,
                        native_language,
                        active_language,
                        source,
                        translation
                    ) VALUES (
                        '$LIST_NAME',
                        '$LIST_TYPE',
                        NOW(),
                        '$HASH',
                        $MAIN_LANGUAGE_ID,
                        $ACTIVE_LANGUAGE_ID,
                        '$sources',
                        '$translations'
                    )";
                    $this->mysql->query($query);
                }
                $query = "SELECT ID,date FROM $TABLE_NAME WHERE hash='$HASH'";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $Id = $value['ID'];
                    $Date = $value['date'];
                }
                $this->closeListsConnection();
                echo "{\"updated\":true,\"id\":$Id,\"date\":\"$Date\"}";
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        public function getListData($_list_id): void {
            if($this->getCookie()) {
                $this->createAuthConnection();
                $tableName = $this->getUserTableName();
                $this->closeAuthConnection();

                $this->createListsConnection();
                $query = "SELECT source,translation,transcription FROM $tableName WHERE ID=$_list_id";
                $result = $this->mysql->query($query);
                $listData = new ListData();
                foreach($result as $value) {
                    $listData->source = $value['source'];
                    $listData->translation = $value['translation'];
                    $listData->transcription = $value['transcription'];
                }
                $listData->updated = true;
                $ListData = json_encode($listData, JSON_UNESCAPED_UNICODE);
                $this->closeListsConnection();
                echo $ListData;
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        public function getAllListsData(int|false $_selected_language_id = false, $_async = false) {
            if($this->getCookie()) {
                $this->createAuthConnection();
                $tableName = $this->getUserTableName();
                $this->closeAuthConnection();

                $this->createSettingsConnection();
                // получение основного языка
                $query = "SELECT main,selected FROM languages WHERE USER_ID={$this->_id}";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $mainLanguageId = $value['main'];
                    $selectedLanguageId = $value['selected'];
                }
                $this->closeSettingsConnection();

                $this->createListsConnection();
                // получение списков
                if($_selected_language_id)
                    $query = "SELECT source,translation,transcription,date,name,type,ID FROM $tableName WHERE native_language='$mainLanguageId' && active_language='$_selected_language_id'";
                else 
                    $query = "SELECT source,translation,transcription,date,name,type,ID FROM $tableName WHERE native_language='$mainLanguageId' && active_language='$selectedLanguageId'";
                $result = $this->mysql->query($query);
                $list = new ListData();
                $lists = new ListsData();
                foreach($result as $value) {
                    $list->source = $value['source'];
                    $list->translation = $value['translation'];
                    $list->transcription = $value['transcription'];
                    $list->date = $value['date'];
                    $list->name = $value['name'];
                    $list->type = $value['type'];
                    $list->id = $value['ID'];
                    switch($list->type) {
                        case 'main':
                            $lists->main[$list->id] = clone $list;
                            break;
                        case 'hard':
                            $lists->hard[$list->id] = clone $list;
                            break;
                        case 'split':
                            $lists->split[$list->id] = clone $list;
                            break;
                        case 'combined':
                            $lists->combined[$list->id] = clone $list;
                            break;
                    }
                    $lists->types[$list->id] = $list->type;
                }
                $this->closeListsConnection();
                $lists->updated = true;
                if($_async === true) {
                    $Lists = json_encode($lists, JSON_UNESCAPED_UNICODE);
                    echo $Lists;
                }
                else 
                    return $lists;
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        public function deleteList($_list_id): void {
            if($this->getCookie()) {
                $this->createAuthConnection();
                $tableName = $this->getUserTableName();
                $this->closeAuthConnection();

                $this->createListsConnection();
                $query = "DELETE FROM $tableName WHERE ID=$_list_id";
                $this->mysql->query($query);
                $this->closeListsConnection();
                echo '{"updated":true}';
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        public function updateList($_list_id): void {
            if($this->getCookie()) {
                $SOURCE = $TRANSLATION = $TRANSCRIPTION = null;
                $this->kanji = ($_POST['transcription']) ? true : false;
                $this->prepareRows($SOURCE, $TRANSLATION, $TRANSCRIPTION);

                $this->createAuthConnection();
                $tableName = $this->getUserTableName();
                $this->closeAuthConnection();

                $this->createListsConnection();
                if($this->kanji)
                    $query = "UPDATE $tableName SET 
                        source='$SOURCE',
                        translation='$TRANSLATION',
                        transcription='$TRANSCRIPTION'
                    WHERE ID=$_list_id";
                else 
                    $query = "UPDATE $tableName SET
                        source='$SOURCE',
                        translation='$TRANSLATION'
                    WHERE ID=$_list_id";
                $this->mysql->query($query);
                $this->closeListsConnection();
                echo '{"updated":true}';
            }
            else {
                $this->deleteCookie();
                echo '{"redirect": true}';
            }
        }

        public function setSelectedListId(int $_selected_list_id): void {
            if($this->getCookie()) {
                $this->createListsConnection();
                $query = "SELECT SELECTED_LIST_ID FROM __LISTS__ WHERE USER_ID={$this->_id}";
                $result = $this->mysql->query($query);
                if($result->num_rows) 
                    $query = "UPDATE __LISTS__ SET SELECTED_LIST_ID=$_selected_list_id WHERE USER_ID={$this->_id}";
                else 
                    $query = "INSERT INTO __LISTS__(USER_ID,SELECTED_LIST_ID) VALUES ({$this->_id},$_selected_list_id)";
                $this->mysql->query($query);
                $this->closeListsConnection();
                echo '{"updated":true}';
            }
            else {
                $this->deleteCookie();
                echo '{"updated":true}';
            }
        }

        public function resetSelectedListId(): void {
            if($this->getCookie()) {
                $this->createListsConnection();
                $query = "UPDATE __LISTS__ SET SELECTED_LIST_ID=NULL WHERE USER_ID={$this->_id}";
                $this->mysql->query($query);
                $this->closeListsConnection();
                echo '{"updated":true}';
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        public function getSelectedListId(): int|false {
            if($this->getCookie()) {
                $this->createListsConnection();
                $query = "SELECT SELECTED_LIST_ID FROM __LISTS__ WHERE USER_ID={$this->_id}";
                $result = $this->mysql->query($query);
                $this->closeListsConnection();
                if($result->num_rows) {
                    foreach($result as $value) {
                        $SelectedListId = $value['SELECTED_LIST_ID'] ?? 0;
                        return $SelectedListId;
                    }
                }
                else return false;
            }
        }

        public function sort(int $_selected_list_id): void {
            if($this->getCookie()) {
                if($_selected_list_id) {
                    $this->createAuthConnection();
                    $tableName = $this->getUserTableName();
                    $this->closeAuthConnection();
    
                    $this->createListsConnection();
                    $query = "SELECT source,translation,transcription FROM $tableName WHERE ID=$_selected_list_id";
                    $result = $this->mysql->query($query);
                    foreach($result as $value) {
                        $source = $value['source'];
                        $translation = $value['translation'];
                        $transcription = $value['transcription'];
                    }
                    $rows = $this->prepareRowsForSort($source, $translation, $transcription);
                    $number_array = [];
                    $random_number;
                    for($i = 0; $i < sizeof($rows); $i++) {
                        while(in_array($random_number = rand(0, sizeof($rows) - 1), $number_array));
                        $number_array[] = $random_number;
                    }
                    $output_rows = [];
                    for($i = 0; $i < sizeof($number_array); $i++) {
                        $output_rows[$i] = $rows[$number_array[$i]];
                    }
                    $SOURCE = $TRANSLATION = $TRANSCRIPTION = '';
                    if(isset($transcription)) {
                        for($i = 0; $i < sizeof($output_rows); $i++) {
                            [$source, $translation, $transcription] = explode(';', $output_rows[$i]);
                            $SOURCE .= $source . ';';
                            $TRANSLATION .= $translation . ';';
                            $TRANSCRIPTION .= $transcription . ';';
                        }
                        $SOURCE = rtrim($SOURCE, ';');
                        $TRANSLATION = rtrim($TRANSLATION, ';');
                        $TRANSCRIPTION = rtrim($TRANSCRIPTION, ';');
                        $query = "UPDATE $tableName SET
                            source='$SOURCE',
                            translation='$TRANSLATION',
                            transcription='$TRANSCRIPTION'
                        WHERE ID=$_selected_list_id";
                    }
                    else {
                        for($i = 0; $i < sizeof($output_rows); $i++) {
                            [$source, $translation] = explode(';', $output_rows[$i]);
                            $SOURCE .= $source . ';';
                            $TRANSLATION .= $translation . ';';
                        }
                        $SOURCE = rtrim($SOURCE, ';');
                        $TRANSLATION = rtrim($TRANSLATION, ';');
                        $query = "UPDATE $tableName SET
                            source='$SOURCE',
                            translation='$TRANSLATION'
                        WHERE ID=$_selected_list_id";
                    }
                    $this->mysql->query($query);
                    $this->closeListsConnection();
                }
            }
        }





        private function checkListNameExistence($_list_name): bool {
            if($_list_name) return true; 
            else return false;
        }

        private function validateListName($_list_name): bool {
            $regex = rLists::listName->value;
            $result = preg_match($regex, $_list_name);
            if($result === 1) return true;
            else if($result === 0) {
                $this->error_field = 'list_name';
                $this->error_message = 'Название списка должно содержать только русские или латинские символы и быть длиной не более 250 символов!';
                return false;
            }
            else {
                $this->error_field = 'alert';
                $this->error_message = 'Во время проверки наименования списка произошла ошибка!';
                return false;
            }
        }

        private function validateLanguageMark($_language_mark): bool {
            $regex = rLists::languageMark->value;
            $result = preg_match($regex, $_language_mark);
            if($result === 1) return true;
            else if($result === 0) {
                $this->error_field = 'alert';
                $this->error_message = 'Метка языка искажена!';
                return false;
            }
            else {
                $this->error_field = 'alert';
                $this->error_message = 'Во время проверки метки языка произошла ошибка!';
                return false;
            }
        }

        private function validateListType($type): bool {
            $accessibleTypes = [
                'main',
                'hard',
                'combined',
                'split'
            ];
            if(in_array($type, $accessibleTypes)) {
                return true;
            }
            else {
                $this->error_field = 'alert';
                $this->error_message = 'Тип списка не соответствует ни одному из допустимых типов!';
                return false;
            }
        }

        private function checkRowsExistence(): bool {
            if($this->kanji) {
                if($_POST['source'] && $_POST['translation'] && $_POST['transcription'])
                    return true;
            }
            else {
                if($_POST['source'] && $_POST['translation'])
                    return true;
            }
            $this->error_field = 'alert';
            $this->error_message = 'Как минимум один из режимов не заполнен вовсе!';
            return false;
        }

        private function prepareRows(
            &$sources,
            &$translations,
            &$transcriptions = '',
            
        ): void {
            $sources = rtrim($_POST['source'], ';');
            $translations = rtrim($_POST['translation'], ';');
            if($this->kanji) {
                $transcriptions = rtrim($_POST['transcription'], ';');
            }
        }

        private function checkRowsNumberEquality(
            string $sources,
            string $translations,
            string $transcriptions = null
        ): bool {
            $sourceRowsNumber = sizeof(explode(';', $sources));
            $translationRowsNumber = sizeof(explode(';', $translations));
            if($sourceRowsNumber !== $translationRowsNumber) {
                $this->error_field = 'alert';
                $this->error_message = 'Количество строк переводов не совпадает с количеством исходных значений!';
                return false;
            }
            if($transcriptions !== null) {
                $transcriptionRowsNumber = sizeof(explode(';', $transcriptions));
                if($sourceRowsNumber !== $transcriptionRowsNumber) {
                    $this->error_field = 'alert';
                    $this->error_message = 'Количество строк чтений не совпадает с количеством исходных значений!';
                    return false;
                }
            }
            return true;
        }

        private function checkListExistence($_table_name, $_list_hash): bool {
            $query = "SELECT ID FROM $_table_name WHERE hash='$_list_hash'";
            $result = $this->mysql->query($query);
            if($result->num_rows) {
                $this->error_field = 'alert';
                $this->error_message = 'Список с таким содержимым уже существует!';
                return true;
            }
            else return false;
        }

        private function prepareListHash(
            string $sources,
            string $translations,
            string $transcriptions = ''
        ): string {
            $str = $sources . $translations . $transcriptions;
            return hash('sha1', $str);
        }

        private function getUserTableName(): string {
            $query = "SELECT login FROM users WHERE ID={$this->_id}";
            $result = $this->mysql->query($query);
            foreach($result as $value) {
                $table_name = $value['login'];
            }
            return $table_name;
        }

        private function exitWithError(): void {
            $this->writeError();
            $this->sendErrors();
            exit;
        }

        private function prepareRowsForSort($source, $translation, $transcription): array {
            $rows = [];
            $source_rows = explode(';', $source);
            $translation_rows = explode(';', $translation);
            if(isset($transcription)) {
                $transcription_rows = explode(';', $transcription);
                for($i = 0; $i < sizeof($source_rows); $i++) {
                    $row = $source_rows[$i] . ';' . $translation_rows[$i] . ';' . $transcription_rows[$i];
                    $rows[$i] = $row;
                }            
            }
            else {
                for($i = 0; $i < sizeof($source_rows); $i++) {
                    $row = $source_rows[$i] . ';' . $translation_rows[$i];
                    $rows[$i] = $row;
                }
            }
            return $rows;
        }





        // model\Lists::createListsTable()
        use ListsConnection;
        use SettingsConnection;
        use AuthConnection;
        use WriteError;
        use SendErrors;
    }