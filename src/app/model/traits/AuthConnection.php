<?php
    namespace project\model\traits; 

    use project\control\parent\User;

    trait AuthConnection {
        private function createAuthConnection(): void {
            $this->mysql = new \mysqli('localhost', User::HOSTING_USER.'Auth', 'kISARAGIeKI4', User::HOSTING_USER.'Auth');
        }

        private function closeAuthConnection(): void {
            $this->mysql->close();
        }
    }