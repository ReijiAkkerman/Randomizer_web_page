<?php
    namespace project\model\components;

    class GitErrors {
        public array $fields;
        public string $new_branch;
        public string $alert;

        public function __construct() {
            $this->fields = [];
        }
    }