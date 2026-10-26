<?php
    namespace project\model\components;

    class ListsData extends GoodResponse {
        public array $types;        // хранит тип списка под его номером
        public array $main;
        public array $hard;
        public array $split;
        public array $combined;

        public HardInfo $hard_info;

        public int|false $selected_list_id;
        public string $selected_list_type;

        public function __construct() {
            $this->types = [];
            $this->main = [];
            $this->hard = [];
            $this->split = [];
            $this->combined = [];
        }
    }