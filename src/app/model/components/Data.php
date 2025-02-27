<?php
    namespace project\model\components;

    use project\model\components\Language;
    use project\model\components\ListsData;

    class Data {
        public string $repository;
        public array $branches;
        public bool $switching_commit_exists;

        public Language $main_language;
        public array $studied_languages;
        public array $all_languages;

        public ListsData $lists;
        public array $sources;
        public array $translations;
        public array $transcriptions;

        public array $studied_languages_list;
        public bool $show_all_languages;





        public function __construct() {
            $this->repository = '';
            $this->branches = [];
            $this->switching_commit_exists = false;

            $this->main_language = new Language();
            $this->studied_languages = [];
            $this->all_languages = [];

            $this->sources = [];
            $this->translations = [];
            $this->transcriptions = [];

            $this->studied_languages_list = [];
            $this->show_all_languages = false;
        }
    }