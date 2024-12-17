<?php
    /**
     * $snake_notation для данных пользователей
     * 
     * $SNAKE_NOTATION_WITH_ALL_CAPITAL_LETTERS для данных полученных из БД
     * причем независимо от регистра колонок из которых они взяты
     * 
     * $CamelCaseBeginningWithCapitalLetter для работы скрипта
     * 
     * usualCamelCase для именования методов
     */

    namespace project\model;

    use project\model\interfaces\Auth as iAuth;
    use project\model\regex\Auth as rAuth;

    use project\control\parent\Page;

    class Auth implements iAuth {
        public static $ErrorMessage = '';

        private string $email;
        private string $login;
        private string $name;
        private string $password;
        private string $encrypted_password;

        private \mysqli $Mysql;

        private int $ID;
        private string $CREATED;





        public function reg(): void {
            $FunctionsNeedTrue = [
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
            foreach($FunctionsNeedTrue as $Function) {
                if($this->$Function() === false) {
                    header('Location: ../auth/view');
                    exit;
                }
            }
            $this->encryptPassword();
            $Mysql = new \mysqli(Page::DB_HOST, Page::HOSTING_USER.'Auth', 'kISARAGIeKI4', Page::HOSTING_USER.'Auth');
            $Query = "INSERT INTO users(email,login,name,password,created) VALUES ('{$this->email}','{$this->login}','{$this->name}','{$this->encrypted_password}',NOW())";
            $Mysql->query($Query);
            $Query = "SELECT ID,created FROM users WHERE BINARY login='{$this->login}'";
            $Result = $Mysql->query($Query);
            foreach($Result as $Value) {
                $this->ID = $Value['ID'];
                $this->CREATED = $Value['created'];
            }
            $Mysql->close();
            $this->encryptConfirmation();
            $this->setCookie();
            header('Location: ../randomizer/view');
        }

        public function init(): void {
            $Functions = [
                'createAuth',
            ];
            $this->Mysql = new \mysqli('localhost', 'root', 'KisaragiEki4');
            foreach($Functions as $Function) {
                $this->$Function();
            }
            $this->Mysql->close();
        }





        // Проверяет заполенно ли поле в принципе

        private function checkEmail(): bool {
            if($_POST['email'] === '') {
                self::$ErrorMessage = 'Не указана электронная почта!';
                return false;
            }
            else return true;
        }

        private function checkLogin(): bool {
            if($_POST['login'] === '') {
                self::$ErrorMessage = 'Логин не указан!';
                return false;
            }
            else return true;
        }

        private function checkName(): bool {
            if($_POST['name'] === '') {
                self::$ErrorMessage = 'Имя не указано!';
                return false;
            }
            else return true;
        }

        private function checkPassword(): bool {
            if($_POST['password'] === '') {
                self::$ErrorMessage = 'Пароль не указан!';
                return false;
            }
            else return true;
        }

        private function checkRepeatedPassword(): bool {
            if($_POST['repeat_password'] === '') {
                self::$ErrorMessage = 'Повторный пароль не указан!';
                return false;
            }
            else return true;
        }

        // Проверяет правильно ли заполнено поле

        private function validateEmail(): bool {
            $result = preg_match(rAuth::email->value, $_POST['email']);
            if($result === 1) {
                $this->email = $_POST['email'];
                return true;
            }
            else if($result === 0) {
                self::$ErrorMessage = 'Электронная почта не соответствует шаблону!';
                return false;
            }
            else {
                self::$ErrorMessage = '|Во время обработки электронной почты произошла ошибка!';
                return false;
            }
        }

        private function validateLogin(): bool {
            $result = preg_match(rAuth::login->value, $_POST['login']);
            if($result === 1) {
                $this->login = $_POST['login'];
                return true;
            }
            else if($result === 0) {
                self::$ErrorMessage = 'Логин не соответствует шаблону!';
                return false;
            }
            else {
                self::$ErrorMessage = '|Во время обработки логина произошла ошибка!';
                return false;
            }
        }

        private function validateName(): bool {
            $result = preg_match(rAuth::name->value, $_POST['name']);
            if($result === 1) {
                $this->name = $_POST['name'];
                return true;
            }
            else if($result === 0) {
                self::$ErrorMessage = 'Имя не соответствует шаблону!';
                return false;
            }
            else {
                self::$ErrorMessage = '|Во время обработки имени произошла ошибка!';
                return false;
            }
        }

        private function validatePassword(): bool {
            $result = preg_match(rAuth::password->value, $_POST['password']);
            if($result === 1) {
                return true;
            }
            else if($result === 0) {
                self::$ErrorMessage = 'Пароль не соответствует шаблону!';
                return false;
            }
            else {
                self::$ErrorMessage = '|Во время обработки пароля произошла ошибка!';
                return false;
            }
        }

        private function validateRepeatedPassword(): bool {
            $result = preg_match(rAuth::password->value, $_POST['repeat_password']);
            if($result === 1) {
                return true;
            }
            else if($result === 0) {
                self::$ErrorMessage = 'Повторный пароль не соответствует шаблону!';
                return false;
            }
            else {
                self::$ErrorMessage = '|Во время обработки повторного пароля произошла ошибка!';
                return false;
            }
        }





        // Сравнивает введенные пароли

        private function comparePasswords(): bool {
            if($_POST['password'] === $_POST['repeat_password']) {
                $this->password = $_POST['password'];
                return true;
            }
            else {
                self::$ErrorMessage = 'Пароли не совпадают!';
                return false;
            }
        }

        // Шифрует пароль

        private function encryptPassword(): void {
            $this->encrypted_password = password_hash($this->password, PASSWORD_DEFAULT);
        }

        // Проверяет совпадает ли введенный пароль с тем что 
        // хранится в базе данных

        private function comparePassword(): bool {

        }

        /**
         * ID - идентификатор пользователя
         * 
         * conf - "confirmation" выбрано такое сокращение в целях безопасности,
         * защита от дурака чтобы думали что это конфигурация
         * 
         */

        private function setCookie(): void {
            setcookie('ID', $this->ID, 3600*24*30, '/');
            setcookie('conf', $this->Confirmation, 3600*24*30, '/');
        }

        private function encryptConfirmation(): void {
            $this->Confirmation = bin2hex($this->CREATED);
        }

        private function decryptConfirmation(): void {
            $this->Confirmation = hex2bin($_COOKIE['conf']);
        }





        // init функциональность

        private function createAuth(): void {
            $Queries = [
                'CREATE DATABASE IF NOT EXISTS Auth',
                "CREATE USER IF NOT EXISTS 'Auth'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'kISARAGIeKI4'",
                "GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON Auth.* TO 'Auth'@'localhost'",
                'USE Auth',
                'CREATE TABLE IF NOT EXISTS users(
                    ID SERIAL,
                    email VARCHAR(80) UNIQUE NOT NULL,
                    login VARCHAR(55) UNIQUE NOT NULL,
                    name VARCHAR(25) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    created DATETIME NOT NULL
                )'
            ];
            foreach($Queries as $Query) {
                $this->Mysql->query($Query);
            }
        }

        private function createLists(): void {
            ;
        }

        private function createSettings(): void {
            ;
        }
    }