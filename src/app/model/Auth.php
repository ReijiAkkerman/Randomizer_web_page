<?php
    /**
     * $snake_notation для работы скрипта
     * 
     * $_snake_notation для Cookie клиента
     * 
     * $SNAKE_NOTATION_WITH_ALL_CAPITAL_LETTERS для данных полученных из БД
     * причем независимо от регистра колонок из которых они взяты
     * 
     * $CamelCaseBeginningWithCapitalLetter для данных пользователей
     * 
     * usualCamelCase для именования методов
     * 
     * $usualCamelCase для именования переменных (не свойств!)
     */

    namespace project\model;

    use project\model\interfaces\Auth as iAuth;
    use project\model\regex\Auth as rAuth;
    use project\model\components\AuthErrors;

    use project\control\parent\Page;

    class Auth implements iAuth {
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
                    $query = "SELECT ID,created FROM users WHERE login='{$this->login}'";
                    $result = $this->mysql->query($query);
                    foreach($result as $value) {
                        $this->ID = $value['ID'];
                        $this->CREATED = $value['created'];
                    }
                    $this->closeAuthConnection();
                    $this->setCookie();
                    echo '{"redirect":true}';
                }
                else $this->sendErrors();
            }
            else $this->sendErrors();
        }

        public function init(): void {
            $functions = [
                'createAuth',
            ];
            $this->mysql = new \mysqli('localhost', 'root', 'KisaragiEki4');
            foreach($functions as $function) {
                $this->$function();
            }
            $this->mysql->close();
        }





        private function createAuthConnection(): void {
            $this->mysql = new \mysqli(
                'localhost',
                Page::HOSTING_USER.'Auth',
                'kISARAGIeKI4',
                Page::HOSTING_USER.'Auth'
            );
        }

        private function closeAuthConnection(): void {
            $this->mysql->close();
        }

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

        private function checkEmail(): bool {
            if($_POST['email'] === '') {
                $this->error_field = 'email';
                $this->error_message = 'Не указана электронная почта!';
                return false;
            }
            else return true;
        }

        private function checkLogin(): bool {
            if($_POST['login'] === '') {
                $this->error_field = 'login';
                $this->error_message = 'Логин не указан!';
                return false;
            }
            else return true;
        }

        private function checkName(): bool {
            if($_POST['name'] === '') {
                $this->error_field = 'name';
                $this->error_message = 'Имя не указано!';
                return false;
            }
            else return true;
        }

        private function checkPassword(): bool {
            if($_POST['password'] === '') {
                $this->error_field = 'password';
                $this->error_message = 'Пароль не указан!';
                return false;
            }
            else return true;
        }

        private function checkRepeatedPassword(): bool {
            if($_POST['repeat_password'] === '') {
                $this->error_field = 'repeat_password';
                $this->error_message = 'Повторный пароль не указан!';
                return false;
            }
            else return true;
        }

        // Проверяет правильно ли заполнено поле

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

        private function comparePassword(): bool {
            return password_verify($this->Password, $this->PASSWORD);
        }

        // Шифрует пароль

        private function encryptPassword(): void {
            $this->password = password_hash($this->Password, PASSWORD_DEFAULT);
        }

        /**
         * ID - идентификатор пользователя
         * 
         * conf - "confirmation" выбрано такое сокращение в целях безопасности,
         * защита от дурака чтобы думали что это конфигурация
         * 
         */

        private function setCookie(): void {
            setcookie('ID', $this->ID, time()+3600*24*30, '/');
            setcookie('conf', $this->CREATED, time()+3600*24*30, '/');
        }

        private function sendErrors(): void {
            echo json_encode($this->errors, JSON_UNESCAPED_UNICODE);
        }





        // init функциональность

        private function createAuth(): void {
            $queries = [
                'CREATE DATABASE IF NOT EXISTS Auth',
                "CREATE USER IF NOT EXISTS 'Auth'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'kISARAGIeKI4'",
                "GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON Auth.* TO 'Auth'@'localhost'",
                'USE Auth',
                'CREATE TABLE IF NOT EXISTS users(
                    ID SERIAL,
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

        private function createLists(): void {
            ;
        }

        private function createSettings(): void {
            ;
        }





        /**
         * Перед записью ошибки в класс AuthErrors
         * данные ошибки должны быть записаны в 
         * $this->error_field - для указания какому полю выводить ошибку
         * $this->error_message - для указания содержимого ошибки 
         */

        private function writeError(): void {
            $error_field = 
            $this->errors->fields[] = $this->error_field;
            $this->errors->$error_field = $this->error_message;
        }
    }