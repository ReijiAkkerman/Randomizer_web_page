<?php
    namespace project\model\components;

    class ListsData extends GoodResponse {
        public array $main;
        public array $hard;
        public array $split;
        public array $combined;

        public function __construct() {
            $this->main = [];
            $this->hard = [];
            $this->split = [];
            $this->combined = [];
        }
    }