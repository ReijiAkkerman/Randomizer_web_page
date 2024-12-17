<?php
    namespace project\control;

    use project\control\interfaces\Auth as iAuth;

    use project\model\Auth as m_Auth;

    use project\control\traits\View;

    class Auth implements iAuth {
        use View;

        public function reg(): void {
            $Auth = new m_Auth();
            $Auth->reg();
        }
    }