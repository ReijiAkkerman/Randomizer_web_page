<?php
    namespace project\model;

    use project\control\parent\User;

    use project\model\regex\Languages as rLanguages;
    use project\model\components\LanguagesErrors;
    use project\model\traits\WriteError;
    use project\model\traits\SendErrors;
    use project\model\traits\SettingsConnection;

    class Languages extends User {
        private string $Name;
        private string $Foldername;
        private string $Mark;
        private bool $Kanji;

        private \mysqli $mysql;
        private LanguagesErrors $errors;
        private string $error_field;
        private string $error_message;





        public function __construct() {
            $this->errors = new LanguagesErrors();
        }





        public function addNewLanguage(): void {
            if($this->getCookie()) {
                $functionsNeedTrue = [
                    'validateName',
                    'validateFoldername',
                    'validateMark',
                ];
                $this->checkErrors($functionsNeedTrue);
                $kanji = $_POST['kanji'] ?? '';
                $this->Kanji = (bool)$kanji;
                $KANJI = (int)$this->Kanji;

                $this->createSettingsConnection();
                $query = "SELECT * FROM all_languages WHERE name='{$this->Name}' OR foldername='{$this->Foldername}' OR mark='{$this->Mark}'";
                $result = $this->mysql->query($query);
                if($result->num_rows) {
                    $functionsNeedTrue = [
                        'checkName',
                        'checkFoldername',
                        'checkMark',
                    ];
                    $this->checkErrors($functionsNeedTrue, $result);
                }
                else {
                    $query = "INSERT INTO all_languages(
                        name,
                        foldername,
                        mark,
                        kanji
                    ) VALUES (
                        '{$this->Name}',
                        '{$this->Foldername}',
                        '{$this->Mark}',
                        {$KANJI}
                    )";
                    $this->mysql->query($query);
                }
                $this->closeSettingsConnection();
                echo '{"updated":true}';
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        public function addNewLanguageToStudied(): void {

        }

        public function changeMainLanguage(): void {

        }

        public function changeStudiedLanguage(): void {

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