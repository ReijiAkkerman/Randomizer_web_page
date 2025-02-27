<?php
    namespace project\model\components;

    use project\model\components\GoodResponse;

    class ListData extends GoodResponse {
        public string $source;
        public string $translation;
        public string|null $transcription;
    }