<?php
    namespace project\control;

    use project\control\traits\View;
    use project\control\parent\Page;

    use project\model\Git;
    use project\model\Languages;
    use project\model\Lists;
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
                $languages = new Languages();

                $git->getSettings();

                $data->repository = $git->REPOSITORY;
                $data->branches = $git->BRANCHES;
                $data->switching_commit_exists = ($git->SWITCHING_COMMIT) ? true : false;
                $data->main_language = $languages->getMain();
                $data->studied_languages = $languages->getStudied();
                $data->all_languages = $languages->getAll();

                foreach($data->studied_languages as $language) {
                    $data->studied_languages_list[] = $language->name;
                }
                if($data->studied_languages_list)
                    foreach($data->studied_languages as $language) {
                        if(!in_array($language->name, $data->studied_languages_list))
                            $data->show_all_languages = true;
                    }
                else 
                    $data->show_all_languages = true;
                
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





        // Методы для работы с настройками языков

        public function createNewLanguage(): void {
            $languages = new Languages();
            $languages->createNew();
        }

        public function addStudiedLanguage(array $args): void {
            $languageMark = $args[0];
            $languages = new Languages();
            $languages->addStudied($languageMark);
        }

        public function addMainLanguage(array $args): void {
            $languageMark = $args[0];
            $languages = new Languages();
            $languages->setMain($languageMark);
        }

        public function exchangeStudiedLanguage(array $args): void {
            $whatExchange = $args[0];
            $exchangeOn = $args[1];
            $languages = new Languages();
            $languages->exchangeStudied($whatExchange, $exchangeOn);
        }

        public function removeStudiedLanguage(array $args): void {
            $languageForRemoving = $args[0];
            $languages = new Languages();
            $languages->removeStudied($languageForRemoving);
        }

        public function exchangeMainLanguage(array $args): void {
            $languageMark = $args[0];
            $languages = new Languages();
            $languages->setMain($languageMark);
        }

        public function changeLanguageParams(array $args): void {
            $languageMark = $args[0];
            $languages = new Languages();
            $languages->changeForUser($languageMark);
        }

        public function setSelectedLanguage(array $args): void {
            $languageMark = $args[0];
            $languages = new Languages();
            $languages->setSelected($languageMark);
        }

        public function unsetSelectedLanguage(): void {
            $languages = new Languages();
            $languages->unsetSelected();
        }




        // Методы для работы со списками

        public function createNewList(array $args): void {
            $activeLanguageMark = $args[0];
            $listType = $args[1];
            if(isset($args[2])) $listName = $args[2];
            else $listName = '';
            $lists = new Lists();
            $lists->createNew($activeLanguageMark, $listType, $listName);
        }

        public function getListData(array $args): void {
            $listId = $args[0];
            $lists = new Lists();
            $lists->getListData($listId);
        }
    }