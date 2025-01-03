<?php
    namespace project\model\components;

    class Data {
        public string $repository;
        public array $branches;
        public string $active_branch;
        public array $lists;





        public function __construct() {
            $this->repository = '';
            $this->branches = [];
            $this->active_branch = '';
            $this->lists = [];
        }
    }