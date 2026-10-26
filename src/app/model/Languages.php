<?php
    namespace project\model;

    use project\control\parent\User;

    use project\model\regex\Languages as rLanguages;
    use project\model\components\LanguagesErrors;
    use project\model\traits\WriteError;
    use project\model\traits\SendErrors;
    use project\model\traits\SettingsConnection;
    use project\model\components\Language;
    use project\model\components\LanguageSelected;

    class Languages extends User {
        private string $Name;
        private string $Foldername;
        private string $Mark;
        private bool $Kanji;

        private \mysqli $mysql;
        private LanguagesErrors $errors;
        private string $error_field;
        private string $error_message;

        private string $language_id;
        private string $languages_ids;





        public function __construct() {
            $this->errors = new LanguagesErrors();
        }





        public function createNew(): void {
            if($this->getCookie()) {
                $this->createSettingsConnection();
                $query = "SELECT * FROM all_languages";
                $result = $this->mysql->query($query);
                $validateFunctions = [
                    'validateName',
                    'validateFoldername',
                    'validateMark',
                ];
                $checkFunctions = [
                    'checkName',
                    'checkFoldername',
                    'checkMark',
                ];
                $this->checkErrors($validateFunctions);
                $this->checkErrors($checkFunctions, $result);
                $this->Kanji = ($_POST['kanji'] ?? '') ? true : false;
                $KANJI = ($this->Kanji) ? 1 : 0;
                $query = "INSERT INTO all_languages(
                    name,
                    foldername,
                    mark,
                    kanji
                ) VALUES (
                    '{$this->Name}',
                    '{$this->Foldername}',
                    '{$this->Mark}',
                    $KANJI
                )";
                $this->mysql->query($query);
                $this->closeSettingsConnection();
                echo '{"updated":true}';
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        public function addStudied($_language_mark): void {
            if($this->getCookie()) {
                $this->createSettingsConnection();
                $query = "SELECT ID FROM all_languages WHERE mark='$_language_mark'";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $this->language_id = $value['ID'];
                }
                $query = "SELECT studied FROM languages WHERE USER_ID={$this->_id}";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $this->languages_ids = $value['studied'] ?? '';
                }
                if($this->languages_ids) {
                    $LANGUAGES_IDS = $this->languages_ids . ',' . $this->language_id;
                }
                else {
                    $LANGUAGES_IDS = $this->language_id;
                }
                $LANGUAGES_IDS = ltrim($LANGUAGES_IDS, ',');
                $query = "UPDATE languages SET studied='$LANGUAGES_IDS' WHERE USER_ID={$this->_id}";
                $this->mysql->query($query);
                $this->closeSettingsConnection();
                echo "{\"updated\":true,\"id\":{$this->language_id}}";
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        public function setMain($_language_mark): void {
            if($this->getCookie()) {
                $this->createSettingsConnection();
                $query = "SELECT ID FROM all_languages WHERE mark='$_language_mark'";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $this->language_id = $value['ID'];
                }
                $query = "UPDATE languages SET main={$this->language_id} WHERE USER_ID={$this->_id}";
                $this->mysql->query($query);
                $this->closeSettingsConnection();
                echo "{\"updated\":true,\"id\":{$this->language_id}}";
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        public function exchangeStudied($_what_exchange, $_exchange_on): void {
            if($this->getCookie()) {
                $this->createSettingsConnection();
                $query = "SELECT ID FROM all_languages WHERE mark='$_what_exchange'";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $whatExchangeId = $value['ID'];
                }
                $query = "SELECT ID FROM all_languages WHERE mark='$_exchange_on'";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $exchangeOnId = $value['ID'];
                }
                $query = "SELECT studied FROM languages WHERE USER_ID={$this->_id}";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $this->languages_ids = $value['studied'];
                }
                $languagesIds__array = explode(',', $this->languages_ids);
                $languageId__array = [(string)$whatExchangeId];
                $languagesIds = array_diff($languagesIds__array, $languageId__array);
                $LANGUAGES_IDS = '';
                foreach($languagesIds as $id) {
                    $LANGUAGES_IDS .= $id . ',';
                }
                $LANGUAGES_IDS .= $exchangeOnId;
                $LANGUAGES_IDS = ltrim($LANGUAGES_IDS, ',');
                $query = "UPDATE languages SET studied='$LANGUAGES_IDS' WHERE USER_ID={$this->_id}";
                $this->mysql->query($query);
                $this->closeSettingsConnection();
                echo '{"updated":true}';
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        public function removeStudied($_language_mark): void {
            if($this->getCookie()) {
                $this->createSettingsConnection();
                $query = "SELECT LANG_ID FROM changed_languages WHERE mark='$_language_mark'";
                $result = $this->mysql->query($query);
                if($result->num_rows) {
                    foreach($result as $value) {
                        $this->language_id = $value['LANG_ID'];
                    }
                }
                else {
                    $query = "SELECT ID FROM all_languages WHERE mark='$_language_mark'";
                    $result = $this->mysql->query($query);
                    foreach($result as $value) {
                        $this->language_id = $value['ID'];
                    }
                }
                $query = "SELECT studied FROM languages WHERE USER_ID={$this->_id}";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $this->languages_ids = $value['studied'];
                }
                $languagesIds__array = explode(',', $this->languages_ids);
                $languageId__array = [$this->language_id];
                $languagesIds__array = array_diff($languagesIds__array, $languageId__array);
                if($languagesIds__array) {
                    $LANGUAGES_IDS = '';
                    foreach($languagesIds__array as $id) {
                        $LANGUAGES_IDS .= $id . ',';
                    }
                    $LANGUAGES_IDS = rtrim($LANGUAGES_IDS, ',');
                    $LANGUAGES_IDS = ltrim($LANGUAGES_IDS, ',');
                }
                else {
                    $LANGUAGES_IDS = NULL;
                }
                $query = "UPDATE languages SET studied='$LANGUAGES_IDS' WHERE USER_ID={$this->_id}";
                $this->mysql->query($query);
                $this->closeSettingsConnection();
                echo '{"updated":true}';
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        public function changeForUser($_language_mark): void {
            if($this->getCookie()) {
                $this->createSettingsConnection();
                // Проверка данных на правильность заполнения
                $functionsNeedTrue = [
                    'validateName',
                    'validateFoldername',
                    'validateMark',
                ];
                $this->checkErrors($functionsNeedTrue);
                $this->Kanji = ($_POST['kanji'] ?? '') ? true : false;
                // Сравнение полученных данных с данными из БД
                $query = "SELECT LANG_ID FROM changed_languages WHERE mark='$_language_mark'";
                $result = $this->mysql->query($query);
                if($result->num_rows) {
                    foreach($result as $value) {
                        $this->language_id = $value['LANG_ID'];
                    }
                    $query = "SELECT * FROM all_languages WHERE ID={$this->language_id}";
                }
                else 
                    $query = "SELECT * FROM all_languages WHERE mark='$_language_mark'";
                $result = $this->mysql->query($query);
                $language_differ = false;
                foreach($result as $row) {
                    foreach($row as $key => $value) {
                        switch($key) {
                            case 'ID':
                                $this->language_id = $LANG_ID = $value;
                                break;
                            case 'name':
                                if($this->Name === $value) $NAME = 'NULL';
                                else {
                                    $NAME = "'{$this->Name}'";
                                    $language_differ = true;
                                }
                                break;
                            case 'foldername':
                                if($this->Foldername === $value) $FOLDERNAME = 'NULL';
                                else {
                                    $FOLDERNAME = "'{$this->Foldername}'";
                                    $language_differ = true;
                                }
                                break;
                            case 'mark':
                                if($this->Mark === $value) $MARK = 'NULL';
                                else {
                                    $MARK = "'{$this->Mark}'";
                                    $language_differ = true;
                                }
                                break;
                            case 'kanji':
                                if($this->Kanji === (bool)$value) $KANJI = 'NULL';
                                else {
                                    $KANJI = (int)$this->Kanji;
                                    $language_differ = true;
                                }
                                break;
                        }
                    }
                }
                if($language_differ) {
                    // Проверка наличия записи об изменении параметров интересующего 
                    // языка для конкретного пользователя и обновление информации
                    $query = "SELECT * FROM changed_languages WHERE USER_ID={$this->_id} && LANG_ID={$this->language_id}";
                    $result = $this->mysql->query($query);
                    if($result->num_rows) 
                        $query = "UPDATE changed_languages SET 
                            name=$NAME,
                            foldername=$FOLDERNAME,
                            mark=$MARK,
                            kanji=$KANJI
                        WHERE 
                            LANG_ID=$LANG_ID &&
                            USER_ID={$this->_id}";
                    else 
                        $query = "INSERT INTO changed_languages (
                            USER_ID,
                            LANG_ID,
                            name,
                            foldername,
                            mark,
                            kanji
                        ) VALUES (
                            {$this->_id},
                            $LANG_ID,
                            $NAME,
                            $FOLDERNAME,
                            $MARK,
                            $KANJI
                        )";
                }
                else 
                    $query = "DELETE FROM changed_languages WHERE USER_ID={$this->_id} && LANG_ID={$this->language_id}";
                $this->mysql->query($query);
                $this->closeSettingsConnection();
                echo "{\"updated\":true,\"id\":{$this->language_id}}";
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        public function setSelected($_language_mark): void {
            if($this->getCookie()) {
                $this->createSettingsConnection();
                // получаем ID выбранного языка
                $query = "SELECT LANG_ID FROM changed_languages WHERE mark='$_language_mark' && USER_ID={$this->_id}";
                $result = $this->mysql->query($query);
                if($result->num_rows) {
                    foreach($result as $value) {
                        $LANG_ID = $value['LANG_ID'];
                    }
                }
                else {
                    $query = "SELECT ID FROM all_languages WHERE mark='$_language_mark'";
                    $result = $this->mysql->query($query);
                    foreach($result as $value) {
                        $LANG_ID = $value['ID'];
                    }
                }
                // устанавливаем выбранный язык
                $query = "UPDATE languages SET selected=$LANG_ID WHERE USER_ID={$this->_id}";
                $this->mysql->query($query);
                $this->closeSettingsConnection();
                echo '{"updated":true}';
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        public function unsetSelected(): void {
            if($this->getCookie()) {
                $this->createSettingsConnection();
                $query = "UPDATE languages SET selected=NULL WHERE USER_ID={$this->_id}";
                $this->mysql->query($query);
                $this->closeSettingsConnection();
                echo '{"updated":true}';
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }





        public function getMain(): Language {
            if($this->getCookie()) {
                $language = new Language();
                $this->createSettingsConnection();
                $query = "SELECT main FROM languages WHERE USER_ID={$this->_id}";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $languageId = $value['main'];
                }
                // $query = "SELECT * FROM all_languages WHERE ID=$languageId";
                $query = "SELECT 
                    all_languages.ID as ID, 
                    COALESCE(changed_languages.name,all_languages.name) AS name, 
                    COALESCE(changed_languages.foldername,all_languages.foldername) AS foldername, 
                    COALESCE(changed_languages.mark,all_languages.mark) AS mark, 
                    COALESCE(changed_languages.kanji,all_languages.kanji) AS kanji 
                FROM 
                    all_languages
                LEFT JOIN 
                    changed_languages 
                ON 
                    changed_languages.LANG_ID=all_languages.ID AND
                    changed_languages.USER_ID={$this->_id}
                WHERE 
                    ID=$languageId";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $language->id = $value['ID'];
                    $language->name = $value['name'];
                    $language->foldername = $value['foldername'];
                    $language->mark = $value['mark'];
                    $language->kanji = (bool)$value['kanji'];
                }
                $this->closeSettingsConnection();
                return $language;
            }
        }

        public function getStudied(): array {
            if($this->getCookie()) {
                $studied_languages = [];
                $this->createSettingsConnection();
                $query = "SELECT * FROM languages WHERE USER_ID={$this->_id}";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $languagesIds = $value['studied'] ?? '';
                }
                if($languagesIds) {
                    $languagesIds__array = explode(',', $languagesIds);
                    // $query = "SELECT * FROM all_languages ORDER BY BINARY name";
                    $query = "SELECT 
                        all_languages.ID as ID, 
                        COALESCE(changed_languages.name,all_languages.name) AS name, 
                        COALESCE(changed_languages.foldername,all_languages.foldername) AS foldername, 
                        COALESCE(changed_languages.mark,all_languages.mark) AS mark, 
                        COALESCE(changed_languages.kanji,all_languages.kanji) AS kanji 
                    FROM 
                        all_languages
                    LEFT JOIN 
                        changed_languages 
                    ON 
                        changed_languages.LANG_ID=all_languages.ID AND
                        changed_languages.USER_ID={$this->_id}
                    ORDER BY BINARY 
                        all_languages.name";
                    $result = $this->mysql->query($query);
                    $studied_languages = [];
                    foreach($result as $value) {
                        if(in_array($value['ID'], $languagesIds__array)) {
                            $language = new LanguageSelected();
                            $selectedLanguageId = $this->getSelected();
                            $language->id = $value['ID'];
                            $language->name = $value['name'];
                            $language->foldername = $value['foldername'];
                            $language->mark = $value['mark'];
                            $language->kanji = (bool)$value['kanji'];
                            if(isset($selectedLanguageId))
                                $language->selected = ($selectedLanguageId == $value['ID']) ? true : false;
                            else 
                                $language->selected = false;
                            $studied_languages[] = clone $language;
                        }
                    }
                }
                $this->closeSettingsConnection();
                return $studied_languages;
            }
        }

        public function getAll(): array {
            if($this->getCookie()) {
                $all_languages = [];
                $language = new Language();
                $this->createSettingsConnection();
                // $query = "SELECT * FROM all_languages ORDER BY BINARY name";
                $query = "SELECT 
                    all_languages.ID as ID, 
                    COALESCE(changed_languages.name,all_languages.name) AS name, 
                    COALESCE(changed_languages.foldername,all_languages.foldername) AS foldername, 
                    COALESCE(changed_languages.mark,all_languages.mark) AS mark, 
                    COALESCE(changed_languages.kanji,all_languages.kanji) AS kanji 
                FROM 
                    all_languages
                LEFT JOIN 
                    changed_languages 
                ON 
                    changed_languages.LANG_ID=all_languages.ID AND
                    changed_languages.USER_ID={$this->_id}
                ORDER BY BINARY 
                    all_languages.name";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $language->id = $value['ID'];
                    $language->name = $value['name'];
                    $language->foldername = $value['foldername'];
                    $language->mark = $value['mark'];
                    $language->kanji = $value['kanji'];
                    $all_languages[] = clone $language;
                }
                $this->closeSettingsConnection();
                return $all_languages;
            }
        }

        private function getSelected(): int|null {
            $query = "SELECT selected FROM languages WHERE USER_ID={$this->_id}";
            $result = $this->mysql->query($query);
            foreach($result as $value) {
                if($value['selected'] !== NULL)
                    $selected_language_id = (int)$value['selected'];
                else return null;
            }
            return $selected_language_id;
        }





        private function checkErrors(array $functions, $data = ''): void {
            $errorsExists = false;
            if($data) {
                foreach($functions as $function) {
                    if($this->$function($data) === false) {
                        $this->writeError();
                        $errorsExists = true;
                    }
                }
            }
            else {
                foreach($functions as $function) {
                    if($this->$function() === false) {
                        $this->writeError();
                        $errorsExists = true;
                    }
                }
            }
            if($errorsExists) {
                $this->sendErrors();
                if(isset($this->mysql))
                if(get_class($this->mysql) === 'mysqli')
                        $this->mysql->close();
                exit;
            }
        }

        private function validateName(): bool {
            $name = $_POST['name'] ?? '';
            if($name) {
                $result = preg_match(rLanguages::name->value, $name);
                if($result === 1) {
                    $this->Name = $name;
                    return true;
                }
                else if($result === 0) {
                    $this->error_field = 'name';
                    $this->error_message = 'Наименование языка должно содержать только буквы русского алфавита и быть длиной не более 40 символов!';
                }
                else {
                    $this->error_field = 'alert';
                    $this->error_message = 'Во время проверки наименования языка произошла ошибка';
                }
            }
            else {
                $this->error_field = 'name';
                $this->error_message = 'Наименование языка не указано!';
            }
            return false;
        }

        private function validateFoldername(): bool {
            $foldername = $_POST['foldername'] ?? '';
            if($foldername) {
                $result = preg_match(rLanguages::foldername->value, $foldername);
                if($result === 1) {
                    $this->Foldername = $foldername;
                    return true;
                }
                else if($result === 0) {
                    $this->error_field = 'foldername';
                    $this->error_message = 'Папка языка должна содержать только символы латинского алфавита и быть длиной не более 40 символов!';
                }
                else {
                    $this->error_field = 'alert';
                    $this->error_message = 'Во время проверки папки языка произошла ошибка!';
                }
            }
            else {
                $this->error_field = 'foldername';
                $this->error_message = 'Папка языка не указана!';
            }
            return false;
        }

        private function validateMark(): bool {
            $mark = $_POST['mark'] ?? '';
            if($mark) {
                $result = preg_match(rLanguages::mark->value, $mark);
                if($result === 1) {
                    $this->Mark = $mark;
                    return true;
                }
                else if($result === 0) {
                    $this->error_field = 'mark';
                    $this->error_message = 'Метка языка должна содержать только символы латинского алфавита и иметь длину не более двух символов!';
                }
                else {
                    $this->error_field = 'alert';
                    $this->error_message = 'Во время проверки метки языка произошла ошибка!';
                }
            }
            else {
                $this->error_field = 'mark';
                $this->error_message = 'Метка языка не указана!';
            }
            return false;
        }

        private function checkName($data): bool {
            foreach($data as $value) {
                if($this->Name === $value['name']) {
                    $this->error_field = 'name';
                    $this->error_message = 'Указанный язык уже существует!';
                    return false;
                }
            }
            return true;
        }

        private function checkFoldername($data): bool {
            foreach($data as $value) {
                if($this->Foldername === $value['foldername']) {
                    $this->error_field = 'foldername';
                    $this->error_message = 'Папка языка с таким наименованием уже существует!';
                    return false;
                }
            }
            return true;
        }

        private function checkMark($data): bool {
            foreach($data as $value) {
                if($this->Mark === $value['mark']) {
                    $this->error_field = 'mark';
                    $this->error_message = 'Указанная метка языка уже существует!';
                    return false;
                }
            }
            return true;
        }





        use WriteError;
        use SendErrors;
        use SettingsConnection;
    }