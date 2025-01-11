<?php
    namespace project\model\components;

    class Data {
        public string $repository;
        public array $branches;
        public bool $switching_commit_exists;





        public function __construct() {
            $this->repository = '';
            $this->branches = [];
            $this->switching_commit_exists = false;
        }
    }