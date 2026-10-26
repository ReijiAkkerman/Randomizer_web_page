<?php
    namespace project\control\parent;

    abstract class Page extends User {
        abstract public function view();





        protected function isAccessGranted(): bool {
            if($this->getCookie()) {
                $mysql = new \mysqli(
                    'localhost',
                    User::HOSTING_USER.'Auth',
                    'kISARAGIeKI4',
                    User::HOSTING_USER.'Auth'
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
    }