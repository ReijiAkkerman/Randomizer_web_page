<?php
    namespace project\model\interfaces;

    interface Auth {
        public function log(): void;
        public function reg(): void;
    }