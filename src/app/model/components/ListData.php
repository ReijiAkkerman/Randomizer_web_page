<?php
    namespace project\model\components;

    use project\model\components\GoodResponse;

    class ListData extends GoodResponse {
        public string $source;
        public string $translation;
        public string|null $transcription;
        public string $date;
        public string $name;
        public string $type;
        public int $tied_list_id;
        public int $id;
    }