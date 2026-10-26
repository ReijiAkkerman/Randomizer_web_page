<?php
    namespace project\model\components;

    class Errors {
        public array $fields;
        public string $alert;

        public function __construct() {
            $this->fields = [];
        }
    }