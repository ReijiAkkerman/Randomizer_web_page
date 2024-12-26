<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="/src/css/fonts.css">
        <link rel="stylesheet" href="/src/css/auth/position.css">
        <link rel="stylesheet" href="/src/css/auth/style.css">
    </head>
    <body class="auth">
        <main>
            <div class="form">
                <div class="form-switcher">
                    <button class="form-switcher__button form-switcher__button_log" style="border-color:#000;">Вход</button>
                    <button class="form-switcher__button form-switcher__button_reg">Регистрация</button>
                </div>
                <form action="/auth/log" method="POST">
                    <p class="form-error form-error_log-login"></p>
                    <input class="form__input" type="text" name="login" placeholder="Логин">
                    <p class="form-error form-error_log-password"></p>
                    <input class="form__input" type="password" name="password" placeholder="Пароль">
                    <button class="form__button form__button_log">Войти</button>
                </form>
                <form action="/auth/reg" method="POST" style="display:none;">
                    <p class="form-error form-error_reg-email"></p>
                    <input class="form__input" type="text" name="email" placeholder="Электронная почта">
                    <p class="form-error form-error_reg-login"></p>
                    <input class="form__input" type="text" name="login" placeholder="Логин">
                    <p class="form-error form-error_reg-name"></p>
                    <input class="form__input" type="text" name="name" placeholder="Имя">
                    <p class="form-error form-error_reg-password"></p>
                    <input class="form__input" type="password" name="password" placeholder="Пароль">
                    <p class="form-error form-error_reg-repeat-password"></p>
                    <input class="form__input" type="password" name="repeat_password" placeholder="Повторить пароль">
                    <button class="form__button form__button_reg">Зарегистрироваться</button>
                </form>
            </div>
        </main>



        <script type="module" src="/src/js/auth/Form.js"></script>
        <script type="module" src="/src/js/auth/async/Form.js"></script>
    </body>
</html>