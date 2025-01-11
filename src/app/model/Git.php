<?php
    namespace project\model;

    use project\model\regex\Git as rGit;
    use project\model\interfaces\Git as iGit;
    use project\model\components\GitErrors;
    use project\model\traits\WriteError;
    use project\model\traits\SendErrors;
    use project\model\traits\SettingsConnection;
    use project\model\traits\AuthConnection;
    
    use project\control\parent\User;

    class Git extends User implements iGit {
        private string $Repo;
        private string $Branch;

        private \mysqli $mysql;
        private GitErrors $errors;
        private string $error_field;
        private string $error_message;

        private string $git_clone_folder;
        private string $git_safe_directory;

        private array $branches;

        public string $REPOSITORY;
        public string $ACTIVE_BRANCH;
        public string|array $BRANCHES;
        public string $EMAIL;
        public string $LOGIN;
        public string $SWITCHING_COMMIT;





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

        // model\Auth::reg()
        public function initUserSettings($user_id): void {
            $this->createSettingsConnection();
            $query = "INSERT INTO git(USER_ID) VALUES ($user_id)";
            $this->mysql->query($query);
            $this->closeSettingsConnection();
        }



        // control\Randomizer::setRepository()
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

        public function commit(): void {
            
        }

        // control\Randomizer::initRepository()
        public function initRepository(): void {
            if($this->getCookie()) {
                $this->createAuthConnection();
                $query = "SELECT email,login FROM users WHERE ID={$this->_id}";
                $result = $this->mysql->query($query);
                foreach($result as $value) {
                    $this->EMAIL = $value['email'];
                    $this->LOGIN = $value['login'];
                }
                $this->closeAuthConnection();

                `cd {$this->git_clone_folder}; \
                mkdir {$this->LOGIN}; \
                cd {$this->LOGIN}; \
                git init; \
                git config --add user.name "{$this->LOGIN}"; \
                git config --add user.email {$this->EMAIL}; \
                echo "*\n!NW.txt\n!TNW.txt\n!SNW.txt" > .gitignore; \
                touch NW.txt; \
                touch TNW.txt; \
                git add .; \
                git commit -m "switching commit"; \
                git branch -M main`;
                $switchingCommit = `cd {$this->git_clone_folder}{$this->LOGIN};git log --oneline --pretty="%H"`;

                $this->createSettingsConnection();
                $query = "UPDATE git SET switching_commit='$switchingCommit' WHERE USER_ID={$this->_id}";
                $this->mysql->query($query);
                $this->closeSettingsConnection();
                echo '{"prepared":true}';
            }
            else {
                $this->deleteCookie();
                echo '{"redirect":true}';
            }
        }

        // control\Randomizer::createNewBranch()
        public function createNewBranch(): void {
            
        }

        // control\Randomizer::syncWithGithub()
        public function syncWithGithub(): void {
            
        }





        /** 
         * Функции для получения настроек
         */

        // control\Randomizer::view()
        public function getSettings(): void {
            if($this->getCookie()) {
                $this->createSettingsConnection();
                $query = "SELECT * FROM git WHERE USER_ID={$this->_id}";
                $result = $this->mysql->query($query);
                if($result->num_rows) {
                    foreach($result as $value) {
                        $this->REPOSITORY = $value['repository'] ?? '';
                        $this->BRANCHES = $value['branches'] ?? '';
                        $this->SWITCHING_COMMIT = $value['switching_commit'] ?? '';
                    }
                    $this->BRANCHES = ($this->BRANCHES) ? explode(',', $this->BRANCHES) : [];
                }
                $this->closeSettingsConnection();
            }
            else {

            }
        }





        /**
         * Проверка данных пользователя
         */

        // model\Git::setRepository()
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

        // 
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





        // model\Git::initUserSettings()
        use SettingsConnection;
        use AuthConnection;

        // model\Git::setRepository()
        use WriteError;

        // model\Git::setRepository()
        use SendErrors;
    }