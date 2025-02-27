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
                $query = "SELECT source,translation,transcription FROM $tableName WHERE ID";
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

        public function getAllListsData($_async = false) {
            if($this->getCookie()) {
                $this->createAuthConnection();
                $tableName = $this->getUserTableName();
                $this->closeAuthConnection();

                $this->createSettingsConnection();
                // получение основного и изучаемого языка 
                $query = "SELECT main,selected FROM languages WHERE USER_ID={$this->_id}";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $mainLanguageId = $value['main'];
                    $selectedLanguageId = $value['selected'];
                }
                $this->closeSettingsConnection();

                $this->createListsConnection();
                // получение списков
                $query = "SELECT source,translation,transcription,date,name,type,ID FROM $tableName WHERE native_language='$mainLanguageId' && active_language='$selectedLanguageId'";
                $result = $this->mysql->query($query);
                $list = new ListData();
                $lists = new ListsData();
                foreach($result as $value) {
                    $list->sources = $value['source'];
                    $list->translations = $value['translation'];
                    $list->transcriptions = $value['transcription'];
                    $list->date = $value['date'];
                    $list->name = $value['name'];
                    $list->type = $value['type'];
                    $list->id = $value['ID'];
                    switch($list->type) {
                        case 'main':
                            $lists->main[] = clone $list;
                            break;
                        case 'hard':
                            $lists->hard[] = clone $list;
                            break;
                        case 'split':
                            $lists->split[] = clone $list;
                            break;
                        case 'combined':
                            $lists->combined[] = clone $list;
                            break;
                    }
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
            &$transcriptions = ''
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





        // model\Lists::createListsTable()
        use ListsConnection;
        use SettingsConnection;
        use AuthConnection;
        use WriteError;
        use SendErrors;
    }