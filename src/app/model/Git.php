<?php
    namespace project\model;

    use project\model\regex\Git as rGit;
    use project\model\interfaces\Git as iGit;
    use project\model\components\GitErrors;
    use project\model\traits\WriteError;
    use project\model\traits\SendErrors;
    use project\model\traits\SettingsConnection;
    
    use project\control\parent\User;

    class Git extends User implements iGit {
        private string $Repo;
        private string $Branch;

        private \mysqli $mysql;
        private GitErrors $errors;
        private string $error_field;
        private string $error_message;
        private string $git_clone_folder;

        private array $branches;

        public string $REPOSITORY;
        public string $ACTIVE_BRANCH;
        public string|array $BRANCHES;





        public function __construct() {
            $this->errors = new GitErrors();
            $this->error_field = '';
            $this->error_message = '';
            $this->git_clone_folder = '/var/www/test/git/';

            $this->branches = [];

            $this->REPOSITORY = '';
        }





        /**
         * Функции для установки настроек
         */

        public function initUserSettings($user_id): void {
            $this->createSettingsConnection();
            $query = "INSERT INTO git(USER_ID) VALUES ($user_id)";
            $this->mysql->query($query);
            $this->closeSettingsConnection();
        }

        public function setRepository(): void {
            if($this->getCookie()) {
                if($this->validateRepository()) {
                    $this->createSettingsConnection();
                    $query = "UPDATE git SET repository='{$this->Repo}',branches=NULL,active_branch=NULL WHERE USER_ID={$this->_id}";
                    $this->mysql->query($query);
                    $this->closeSettingsConnection();
                    $this->deleteRepository();
                    echo '{"updated":true}';
                }
                else {
                    if($this->error_field) {
                        $this->writeError();
                        $this->sendErrors();
                    }
                }
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        public function createNewBranch(): void {
            
        }

        public function syncWithGithub(): void {
            if($this->getCookie()) {
                if($this->isRepository() === false) {
                    $this->cloneRepository();
                }
                $this->defineBranches();
            }
        }





        /** 
         * Функции для получения настроек
         */

        public function getSettings(int $user_id): void {
            $this->createSettingsConnection();
            $query = "SELECT * FROM git WHERE USER_ID=$user_id";
            $result = $this->mysql->query($query);
            if($result->num_rows) {
                foreach($result as $value) {
                    $this->REPOSITORY = $value['repository'] ?? '';
                    $this->BRANCHES = $value['branches'] ?? '';
                }
                // if($this->BRANCHES) 
                //     $this->BRANCHES = explode(',', $this->BRANCHES);
                // else 
                //     $this->BRANCHES = [];
                $this->BRANCHES = ($this->BRANCHES) ? explode(',', $this->BRANCHES) : [];
            }
            $this->closeSettingsConnection();
        }





        /**
         * Проверка данных пользователя
         */

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

        private function validateBranch(): bool {
            $result = preg_match(rGit::branch->value, $this->Branch);
            if($result === 1) return true;
            else if($result === 0) {
                $this->error_field = 'new_branch';
                $this->error_message = 'Имя ветки не соответствует шаблону!';
                return false;
            }
            else {
                $this->error_field = 'alert';
                $this->error_message = 'Во время проверки имени ветки произошла ошибка!';
                return false;
            }
        }





        /**
         * Git функционал
         */

        private function cloneRepository(): void {
            $this->createSettingsConnection();
            $query = "SELECT * FROM git WHERE USER_ID={$this->_id}";
            $result = $this->mysql->query($query);
            foreach($result as $value) {
                $this->REPOSITORY = $value['repository'];
                $this->BRANCHES = $value['branches'] ?? '';
                $this->ACTIVE_BRANCH = $value['active_branch'] ?? '';
            }
            $this->closeSettingsConnection();

            `cd {$this->git_clone_folder}; \
            git clone --progress {$this->REPOSITORY} user{$this->_id}; \
            chown :web -R user{$this->_id}; \
            chmod 775 -R user{$this->_id};`;
        }

        private function deleteRepository(): void {
            `cd {$this->git_clone_folder}; \
            rm -Rf user{$this->_id}`;
        }

        private function isRepository(): bool {
            $dir = $this->git_clone_folder . "user{$this->_id}";
            return is_dir($dir);
        }

        private function defineBranches(): void {
            $stdout = `cd {$this->git_clone_folder}/user{$this->_id}; \
                git remote show origin | grep "tracked"`;
            preg_match_all(rGit::branches_selection->value, $stdout, $matches, PREG_PATTERN_ORDER);
            foreach($matches[0] as $branch) {
                $this->branches[] = ltrim($branch);
            }
            
            $keyOfMain = array_search('main', $this->branches, true);
            if($keyOfMain !== false) 
                unset($this->branches[$keyOfMain]);
            $this->branches = array_values($this->branches);
            
            $BRANCHES = '';
            foreach($this->branches as $branch) {
                $BRANCHES .= $branch . ',';
            }
            $BRANCHES = rtrim($BRANCHES, ',');

            $this->createSettingsConnection();
            $query = "UPDATE git SET branches='$BRANCHES' WHERE USER_ID={$this->_id}";
            $this->mysql->query($query);
            $this->closeSettingsConnection();
            $Branches = json_encode($this->branches);
            echo "{\"branches\":$Branches}";
        }





        use SettingsConnection;
        use WriteError;
        use sendErrors;
    }