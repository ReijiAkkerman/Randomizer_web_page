<?php
    namespace project\model;

    use project\control\parent\User;

    use project\model\traits\ListsConnection;

    class Lists extends User {
        private \mysqli $mysql;





        // model\Auth::reg()
        public function createListsTable(int $user_id): void {
            $this->createListsConnection();
            $queries = [ 
                "CREATE TABLE IF NOT EXISTS user{$user_id}(
                    ID SERIAL,
                    name VARCHAR(255) NULL,
                    date DATETIME NOT NULL,
                    language SMALLINT UNSIGNED NOT NULL,
                    content TEXT NOT NULL,
                    standalone BOOLEAN DEFAULT 0 NOT NULL,
                    syncronized BOOLEAN DEFAULT 0 NOT NULL
                )"
            ];
            foreach($queries as $query) {
                $this->mysql->query($query);
            }
            $this->closeListsConnection();
        }





        // model\Lists::createListsTable()
        use ListsConnection;
    }