<?php
    namespace project\control\parent;

    use project\model\Auth;

    abstract class Page {
        abstract public function view();

        const DB_HOST = 'localhost';
        const CONNECT_FROM = 'localhost';
        const HOSTING_USER = '';

        private int $_id;
        private string $_conf;





        protected function isAccessGranted(): bool {
            if($this->getCookie()) {
                $mysql = new \mysqli(
                    'localhost',
                    Page::HOSTING_USER.'Auth',
                    'kISARAGIeKI4',
                    Page::HOSTING_USER.'Auth'
                );
                $query = "SELECT * FROM users WHERE ID={$this->_id} AND created='{$this->_conf}'";
                $result = $mysql->query($query);
                if($result->num_rows) return true;
                else {
                    $this->deleteCookie();
                    return false;
                } 
            }
            else return false;
        }

        protected function deleteCookie(): void {
            setcookie('ID', '', 0, '/');
            setcookie('conf', '', 0, '/');
        }

        private function getCookie(): bool {
            if(isset($_COOKIE['ID'])) $this->_id = $_COOKIE['ID'];
            else return false;
            if(isset($_COOKIE['conf'])) $this->_conf = $_COOKIE['conf'];
            else return false;
            return true;
        }
    }