<?php
    namespace project\model\components;

    class GitErrors {
        public array $fields;
        public string $branch;
        public string $alert;

        public function __construct() {
            $this->fields = [];
        }
    }