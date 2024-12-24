<?php
    namespace project\control\parent;

    class User {
        const DB_HOST = 'localhost';
        const CONNECT_FROM = 'localhost';
        const HOSTING_USER = '';

        protected int $_id;
        protected string $_conf;





        protected function deleteCookie(): void {
            setcookie('ID', '', 0, '/');
            setcookie('conf', '', 0, '/');
        }

        protected function getCookie(): bool {
            if(isset($_COOKIE['ID'])) $this->_id = $_COOKIE['ID'];
            else return false;
            if(isset($_COOKIE['conf'])) $this->_conf = $_COOKIE['conf'];
            else return false;
            return true;
        }
    }