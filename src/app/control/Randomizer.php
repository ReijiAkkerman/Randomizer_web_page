<?php
    namespace project\control;

    use project\control\traits\View;
    use project\control\parent\Page;

    class Randomizer extends Page {
        use View;

        



        public function __construct() {
            if($this->isAccessGranted() === false) {
                header('Location: ../auth/view');
                exit;
            }
        }





        public function view(): void {
            if($this->isAccessGranted() === true) 
                require_once __DIR__ . '/../view/randomizer.php';
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
    }