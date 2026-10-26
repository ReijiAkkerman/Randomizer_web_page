<?php
    namespace project\model\traits;

    use project\control\parent\User;

    trait SettingsConnection {
        private function createSettingsConnection(): void {
            $this->mysql = new \mysqli('localhost', User::HOSTING_USER.'Settings', 'kISARAGIeKI4', User::HOSTING_USER.'Settings');
        }

        private function closeSettingsConnection(): void {
            $this->mysql->close();
        }
    }