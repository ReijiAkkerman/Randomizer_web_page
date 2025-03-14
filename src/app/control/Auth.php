<?php
    namespace project\control;

    use project\control\interfaces\Auth as iAuth;

    use project\control\parent\Page;
    use project\control\traits\View;

    use project\model\Auth as m_Auth;

    class Auth extends Page implements iAuth {
        use View;





        public function __construct() {

        }





        public function view(): void {
            if($this->isAccessGranted() === true) {
                header('Location: ../randomizer/view');
                exit;
            }
            else 
                require_once __DIR__ . '/../view/auth.php';
        }

        public function log(): void {
            $auth = new m_Auth();
            $auth->log();
        }

        public function reg(): void {
            $auth = new m_Auth();
            $auth->reg();
        }
    }