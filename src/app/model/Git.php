<?php
    namespace project\model;

    use project\model\regex\Git as rGit;
    use project\model\interfaces\Git as iGit;
    use project\model\components\GitErrors;
    use project\model\traits\WriteError;
    use project\model\traits\SettingsConnection;
    
    use project\control\parent\User;

    class Git extends User implements iGit {
        private string $Repo;

        private \mysqli $mysql;
        private GitErrors $errors;
        private string $error_field;
        private string $error_message;

        public string $REPOSITORY;





        public function __construct() {
            $this->error_field = '';
            $this->error_message = '';

            $this->REPOSITORY = '';
        }





        public function setRepository(): void {
            if($this->getCookie()) {
                if($this->validateRepository()) {
                    $this->createSettingsConnection();
                    $query = "SELECT * FROM git WHERE USER_ID={$this->_id}";
                    $result = $this->mysql->query($query);
                    if($result->num_rows)
                        $query = "UPDATE git SET repository='{$this->Repo}' WHERE USER_ID={$this->_id}";
                    else 
                        $query = "INSERT INTO git(USER_ID,repository) VALUES ({$this->_id}, '{$this->Repo}')";
                    $this->mysql->query($query);
                    $this->closeSettingsConnection();
                    echo '{"updated":true}';
                }
                else {
                    if($this->error_field) 
                        $this->writeError();
                }
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }





        public function getSettings(int $user_id): void {
            $this->createSettingsConnection();
            $query = "SELECT * FROM git WHERE USER_ID=$user_id";
            $result = $this->mysql->query($query);
            if($result->num_rows) {
                foreach($result as $value) {
                    $this->REPOSITORY = $value['repository'];
                }
            }
            $this->closeSettingsConnection();
        }





        // Проверяет указанный репозиторий на соответствие шаблону

        private function validateRepository(): bool {
            $result = preg_match(rGit::repo->value, $_POST['repo']);
            if($result === 1) {
                $this->Repo = $_POST['repo'];
                return true;
            }
            else if($result === 0) return false;
            else {
                $this->error_field = 'alert';
                $this->error_message = 'Во время проверки репозитория на соответствие шаблону произошла ошибка!';
                return false;
            }
        }





        use SettingsConnection;
        use WriteError;
    }