<?php
    namespace project\control\interfaces;

    interface Auth {
        public function log(): void;
        public function reg(): void;
    }