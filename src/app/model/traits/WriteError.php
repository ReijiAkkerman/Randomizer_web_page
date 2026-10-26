<?php
    namespace project\model\traits;

    trait WriteError {
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