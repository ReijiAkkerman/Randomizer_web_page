<?php
    namespace project\control;

    use project\control\traits\View;
    use project\control\parent\Page;

    use project\model\Git;
    use project\model\components\Data;

    class Randomizer extends Page {
        use View;

        



        public function __construct() {
            if($this->isAccessGranted() === false) {
                header('Location: ../auth/view');
                exit;
            }
        }





        public function view(): void {
            if($this->isAccessGranted() === true) {
                $data = new Data();
                $git = new Git();

                $git->getSettings();

                $data->repository = $git->REPOSITORY;
                $data->branches = $git->BRANCHES;
                $data->switching_commit_exists = ($git->SWITCHING_COMMIT) ? true : false;
                
                require_once __DIR__ . '/../view/randomizer.php';
            }
            else {
                header('Location: ../auth/view');
                exit;
            }
        }

        public function exit(): void {
            $this->deleteCookie();
            header('Location: ../auth/view');
            exit;
        }





        // Методы для работы с настройками Git

        public function setRepository(): void {
            $git = new Git();
            $git->setRepository();
        }

        public function initRepository(): void {
            $git = new Git();
            $git->initRepository();
        }

        public function createNewBranch(array $args): void {
            $branch = $args[0];
            $git = new Git();
            $git->createNewBranch($branch);
        }

        public function syncWithGithub(): void {
            $git = new Git();
            $git->syncWithGithub();
        }

        public function commit(): void {
            $git = new Git();
            $git->commit();
        }
    }