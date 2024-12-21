<?php
    namespace project\model\components;

    final class AuthErrors {
        public array $fields;
        public string $email;
        public string $login;
        public string $name;
        public string $password;
        public string $repeat_password;
        public string $alert;

        public function __construct() {
            $this->fields = [];
        }
    }