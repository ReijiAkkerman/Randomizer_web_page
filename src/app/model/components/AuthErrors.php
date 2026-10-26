<?php
    namespace project\model\components;

    use project\model\components\Errors;

    final class AuthErrors extends Errors {
        public string $email;
        public string $login;
        public string $name;
        public string $password;
        public string $repeat_password;
    }