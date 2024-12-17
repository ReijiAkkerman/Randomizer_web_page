<?php
    namespace project\control\parent;

    use project\model\Auth;

    abstract class Page {
        abstract public function view();

        const DB_HOST = 'localhost';
        const CONNECT_FROM = 'localhost';
        const HOSTING_USER = '';





        public static function deleteCookie(): void {

        }

        protected function isAccessGranted(): bool {
            $this->getPageCookie();
            connect();
            getDBPassword();
            if(isPasswordsEqual()) return true;
            else return false;
        }
    }