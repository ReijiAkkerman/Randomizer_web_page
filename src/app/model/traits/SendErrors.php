<?php
    namespace project\model\traits;

    trait SendErrors {
        /**
         * Для работы метода необходимо свойство $errors
         */

        private function sendErrors(): void {
            echo json_encode($this->errors, JSON_UNESCAPED_UNICODE);
        }
    }