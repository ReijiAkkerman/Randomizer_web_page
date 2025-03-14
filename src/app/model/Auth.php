<?php
    /**
     * $this->snake_notation для работы скрипта (наименования свойств)
     * 
     * $this->_snake_notation для Cookie клиента
     * 
     * $this->SNAKE_NOTATION_WITH_ALL_CAPITAL_LETTERS для данных полученных из БД
     * причем независимо от регистра колонок из которых они взяты
     * данные в свойстве лежат в неизменном от БД виде
     * 
     * $this->CamelCaseBeginningWithCapitalLetter для данных 
     * полученных от пользователя
     * 
     * $this->usualCamelCase для именования методов
     * 
     * $usualCamelCase для именования переменных (не свойств!)
     * для работы скрипта
     * 
     * $CamelCaseBeginningWithCapitalLetter для данных 
     * отправляемых пользователю
     * 
     * $SNAKE_NOTATION_WITH_ALL_CAPITAL_LETTERS для переменных
     * данные которых записываются в БД
     * причем независимо от регистра колонки которой они предназначены
     * 
     * $_snake_notation для аргументов функций
     * 
     * $snake_notation для возвращаемых значений
     */

    // class::method() указывает какая функция вызывает описанный ниже метод

    namespace project\model;

    use project\control\interfaces\Auth as c_iAuth;
    use project\model\regex\Auth as rAuth;
    use project\model\components\AuthErrors;
    use project\model\traits\WriteError;
    use project\model\traits\SendErrors;
    use project\model\traits\AuthConnection;
    use project\model\traits\SettingsConnection;

    use project\model\Git;

    class Auth implements c_iAuth {
        private string $Email;
        private string $Login;
        private string $Name;
        private string $Password;

        private \mysqli $mysql;
        private bool $redirect;
        private AuthErrors $errors;
        private string $error_field;
        private string $error_message;
        private string $password;

        private int $ID;
        private string $CREATED;
        private string $PASSWORD;





        public function __construct() {
            $this->redirect = true;
            $this->errors = new AuthErrors();
        }





        // control\Auth::log()
        public function log(): void {
            $functionsNeedTrue = [
                'checkLogin',
                'checkPassword',
                'validateLogin',
                'validatePassword',
            ];
            foreach($functionsNeedTrue as $function) {
                if($this->$function() === false) {
                    $this->redirect = false;
                    if(in_array($this->error_field, $this->errors->fields));
                    else $this->writeError();
                }
            }
            $this->Password = $_POST['password'];
            if($this->redirect) {
                $this->createAuthConnection();
                $query = "SELECT ID,password,created FROM users WHERE login='{$this->Login}'";
                $result = $this->mysql->query($query);
                if($result->num_rows) {
                    foreach($result as $value) {
                        $this->ID = $value['ID'];
                        $this->CREATED = $value['created'];
                        $this->PASSWORD = $value['password'];
                    }
                    if($this->comparePassword() === false) {
                        $this->redirect = false;
                        $this->error_field = 'password';
                        $this->error_message = 'Пароль неверный!';
                        $this->writeError();
                    }
                }
                else {
                    $this->redirect = false;
                    $this->error_field = 'login';
                    $this->error_message = 'Указанный пользователь не найлен!';
                    $this->writeError();
                }
                if($this->redirect) {
                    $this->setCookie();
                    echo '{"redirect":true}';
                }
                else $this->sendErrors();
            }
            else $this->sendErrors();
        }

        // control\Auth::reg()
        public function reg(): void {
            $functionsNeedTrue = [
                'checkEmail',
                'checkLogin',
                'checkName',
                'checkPassword',
                'checkRepeatedPassword',
                'validateEmail',
                'validateLogin',
                'validateName',
                'validatePassword',
                'validateRepeatedPassword',
                'comparePasswords',
            ];
            $dataNeedNotExists = [
                'isEmailExists',
                'isLoginExists'
            ];
            foreach($functionsNeedTrue as $function) {
                if($this->$function() === false) {
                    $this->redirect = false;
                    if(in_array($this->error_field, $this->errors->fields));
                    else $this->writeError();
                }
            }
            if($this->redirect) {
                $this->Email = strtolower($this->Email);
                $this->createAuthConnection();
                foreach($dataNeedNotExists as $function) {
                    if($this->$function() === true) {
                        $this->redirect = false;
                        $this->writeError();
                    }
                }
                if($this->redirect) {
                    $this->encryptPassword();
                    $query = "INSERT INTO users(
                        email,
                        login,
                        name,
                        password,
                        created
                    ) VALUES (
                        '{$this->Email}',
                        '{$this->Login}',
                        '{$this->Name}',
                        '{$this->password}',
                        NOW()
                    )";
                    $this->mysql->query($query);
                    $query = "SELECT ID,created FROM users WHERE login='{$this->Login}'";
                    $result = $this->mysql->query($query);
                    foreach($result as $value) {
                        $this->ID = $value['ID'];
                        $this->CREATED = $value['created'];
                    }
                    $this->closeAuthConnection();
                    $this->createSettingsConnection();
                    $query = "SELECT * FROM all_languages WHERE name='Русский'";
                    $result = $this->mysql->query($query);
                    foreach($result as $value) {
                        $LANGUAGE_ID = $value['ID'];
                    }
                    $query = "INSERT INTO languages(USER_ID,main) VALUES ({$this->ID},'$LANGUAGE_ID')";
                    $this->mysql->query($query);
                    $this->closeSettingsConnection();
                    $git = new Git();
                    $git->initUserSettings($this->ID);
                    $lists = new Lists();
                    $lists->createListsTable($this->Login);
                    $this->setCookie();
                    echo '{"redirect":true}';
                }
                else $this->sendErrors();
            }
            else $this->sendErrors();
        }

        // вызов из /src/test.php
        public function init(): void {
            $functions = [
                'createAuth',
                'createSettings',
                'createLists'
            ];
            $this->mysql = new \mysqli('localhost', 'root', 'KisaragiEki4');
            foreach($functions as $function) {
                $this->$function();
            }
            $this->mysql->close();
        }





        // model\Auth::reg()
        private function isLoginExists(): bool {
            $query = "SELECT * FROM users WHERE login='{$this->Login}'";
            $result = $this->mysql->query($query);
            if($result->num_rows) {
                $this->error_field = 'login';
                $this->error_message = 'Пользователь с таким логином уже существует!';
                return true;
            } 
            else return false;
        }

        // model\Auth::reg()
        private function isEmailExists(): bool {
            $query = "SELECT * FROM users WHERE email='{$this->Email}'";
            $result = $this->mysql->query($query);
            if($result->num_rows) {
                $this->error_field = 'email';
                $this->error_message = 'Пользователь с указанной почтой уже существует!';
                return true;
            }
            else return false;
        }





        // Проверяет заполенно ли поле в принципе

        // model\Auth::reg()
        private function checkEmail(): bool {
            if($_POST['email'] === '') {
                $this->error_field = 'email';
                $this->error_message = 'Не указана электронная почта!';
                return false;
            }
            else return true;
        }

        // model\Auth::reg()
        // model\Auth::log()
        private function checkLogin(): bool {
            if($_POST['login'] === '') {
                $this->error_field = 'login';
                $this->error_message = 'Логин не указан!';
                return false;
            }
            else return true;
        }

        // model\Auth::reg()
        private function checkName(): bool {
            if($_POST['name'] === '') {
                $this->error_field = 'name';
                $this->error_message = 'Имя не указано!';
                return false;
            }
            else return true;
        }

        // model\Auth::reg()
        // model\Auth::log()
        private function checkPassword(): bool {
            if($_POST['password'] === '') {
                $this->error_field = 'password';
                $this->error_message = 'Пароль не указан!';
                return false;
            }
            else return true;
        }

        // model\Auth::reg()
        private function checkRepeatedPassword(): bool {
            if($_POST['repeat_password'] === '') {
                $this->error_field = 'repeat_password';
                $this->error_message = 'Повторный пароль не указан!';
                return false;
            }
            else return true;
        }

        // Проверяет правильно ли заполнено поле

        // model\Auth::reg()
        private function validateEmail(): bool {
            $result = preg_match(rAuth::email->value, $_POST['email']);
            if($result === 1) {
                $this->Email = $_POST['email'];
                return true;
            }
            else if($result === 0) {
                $this->error_field = 'email';
                $this->error_message = 'Электронная почта не соответствует шаблону!';
                return false;
            }
            else {
                $this->error_field = 'alert';
                $this->error_message = 'Во время обработки электронной почты произошла ошибка!';
                return false;
            }
        }

        // model\Auth::reg()
        // model\Auth::log()
        private function validateLogin(): bool {
            $result = preg_match(rAuth::login->value, $_POST['login']);
            if($result === 1) {
                $this->Login = $_POST['login'];
                return true;
            }
            else if($result === 0) {
                $this->error_field = 'login';
                $this->error_message = 'Логин не соответствует шаблону!';
                return false;
            }
            else {
                $this->error_field = 'alert';
                $this->error_message = 'Во время обработки логина произошла ошибка!';
                return false;
            }
        }

        // model\Auth::reg()
        private function validateName(): bool {
            $result = preg_match(rAuth::name->value, $_POST['name']);
            if($result === 1) {
                $this->Name = $_POST['name'];
                return true;
            }
            else if($result === 0) {
                $this->error_field = 'name';
                $this->error_message = 'Имя не соответствует шаблону!';
                return false;
            }
            else {
                $this->error_field = 'alert';
                $this->error_message = 'Во время обработки имени произошла ошибка!';
                return false;
            }
        }

        // model\Auth::reg()
        // model\Auth::log()
        private function validatePassword(): bool {
            $result = preg_match(rAuth::password->value, $_POST['password']);
            if($result === 1) {
                return true;
            }
            else if($result === 0) {
                $this->error_field = 'password';
                $this->error_message = 'Пароль не соответствует шаблону!';
                return false;
            }
            else {
                $this->error_field = 'alert';
                $this->error_message = 'Во время обработки пароля произошла ошибка!';
                return false;
            }
        }

        // model\Auth::reg()
        private function validateRepeatedPassword(): bool {
            $result = preg_match(rAuth::password->value, $_POST['repeat_password']);
            if($result === 1) {
                return true;
            }
            else if($result === 0) {
                $this->error_field = 'repeat_password';
                $this->error_message = 'Повторный пароль не соответствует шаблону!';
                return false;
            }
            else {
                $this->error_field = 'repeat_password';
                $this->error_message = 'Во время обработки повторного пароля произошла ошибка!';
                return false;
            }
        }





        // Сравнивает введенные пароли

        // model\Auth::reg()
        private function comparePasswords(): bool {
            if($_POST['password'] === $_POST['repeat_password']) {
                $this->Password = $_POST['password'];
                return true;
            }
            else {
                $this->error_field = 'repeat_password';
                $this->error_message = 'Пароли не совпадают!';
                return false;
            }
        }

        // Проверяет совпадает ли введенный пароль с тем что 
        // хранится в базе данных

        // model\Auth::log()
        private function comparePassword(): bool {
            return password_verify($this->Password, $this->PASSWORD);
        }

        // Шифрует пароль

        // model\Auth::reg()
        private function encryptPassword(): void {
            $this->password = password_hash($this->Password, PASSWORD_DEFAULT);
        }

        /**
         * ID - идентификатор пользователя
         * 
         * conf - "confirmation" выбрано такое сокращение в целях безопасности,
         * защита от дурака чтобы думали что это конфигурация
         */

        // model\Auth::reg()
        // model\Auth::log()
        private function setCookie(): void {
            setcookie('ID', $this->ID, time()+3600*24*30, '/');
            setcookie('conf', $this->CREATED, time()+3600*24*30, '/');
        }





        // init функциональность

        // model\Auth::init()
        private function createAuth(): void {
            $queries = [
                'CREATE DATABASE IF NOT EXISTS Auth',
                "CREATE USER IF NOT EXISTS 'Auth'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'kISARAGIeKI4'",
                "GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON Auth.* TO 'Auth'@'localhost'",
                'USE Auth',
                'CREATE TABLE IF NOT EXISTS users(
                    ID INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
                    email VARCHAR(80) UNIQUE NOT NULL,
                    login VARCHAR(55) BINARY UNIQUE NOT NULL,
                    name VARCHAR(25) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    created DATETIME NOT NULL
                )'
            ];
            foreach($queries as $query) {
                $this->mysql->query($query);
            }
        }

        // model\Auth::init()
        private function createLists(): void {
            $queries = [
                "CREATE DATABASE IF NOT EXISTS Lists",
                "CREATE USER IF NOT EXISTS 'Lists'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'kISARAGIeKI4'",
                "USE Lists",
                "GRANT SELECT,INSERT,UPDATE,DELETE,DROP,CREATE ON Lists.* TO 'Lists'@'localhost'"
            ];
            foreach($queries as $query) {
                $this->mysql->query($query);
            }
        }

        //model\Auth::init()
        private function createSettings(): void {
            $queries = [
                "CREATE DATABASE IF NOT EXISTS Settings",
                "CREATE USER IF NOT EXISTS 'Settings'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'kISARAGIeKI4'",
                "USE Settings",
                "CREATE TABLE IF NOT EXISTS all_languages(
                    ID SMALLINT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
                    name VARCHAR(50) NOT NULL UNIQUE,
                    mark VARCHAR(3) NOT NULL UNIQUE,
                    kanji BOOLEAN DEFAULT 0 NOT NULL,
                    foldername VARCHAR(50) NOT NULL UNIQUE
                )",
                "CREATE TABLE IF NOT EXISTS git(
                    USER_ID INT UNSIGNED UNIQUE NOT NULL,
                    repository VARCHAR(255) NULL,
                    branches VARCHAR(1023) NULL,
                    active_branch VARCHAR(50) NULL,
                    show_all_branches BOOLEAN DEFAULT 0 NOT NULL,
                    foldernames VARCHAR(1023) NULL,
                    switching_commit VARCHAR(50) NULL
                )",
                "CREATE TABLE IF NOT EXISTS languages(
                    USER_ID INT UNSIGNED UNIQUE NOT NULL,
                    main SMALLINT NULL,
                    studied VARCHAR(255) NULL,
                    selected SMALLINT NULL
                )",
                "CREATE TABLE IF NOT EXISTS changed_languages(
                    USER_ID INT UNSIGNED NOT NULL,
                    LANG_ID SMALLINT UNSIGNED NOT NULL,
                    name VARCHAR(50) NULL,
                    foldername VARCHAR(50) NULL,
                    mark VARCHAR(3) NULL,
                    kanji TINYINT(1) NULL
                )",
                "GRANT SELECT,INSERT,UPDATE,DELETE ON Settings.git TO 'Settings'@'localhost'",
                "GRANT SELECT,INSERT,UPDATE,DELETE ON Settings.languages TO 'Settings'@'localhost'",
                "GRANT SELECT,INSERT,UPDATE ON Settings.all_languages TO 'Settings'@'localhost'",
                "GRANT SELECT,INSERT,UPDATE,DELETE ON Settings.changed_languages TO 'Settings'@'localhost'",
                "INSERT INTO all_languages(name,foldername,mark,kanji) VALUES ('Русский','russian','ru',0);",
            ];
            foreach($queries as $query) {
                $this->mysql->query($query);
            }
        }





        use AuthConnection;
        use SettingsConnection;
        use WriteError;
        use SendErrors;
    }