<?php
    namespace project\model\traits;

    use project\control\parent\User;

    trait ListsConnection {
        private function createListsConnection(): void {
            $this->mysql = new \mysqli('localhost', User::HOSTING_USER.'Lists', 'kISARAGIeKI4', User::HOSTING_USER.'Lists');
        }

        private function closeListsConnection(): void {
            $this->mysql->close();
        }
    }