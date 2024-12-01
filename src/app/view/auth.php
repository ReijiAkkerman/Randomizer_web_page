<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>input{display:block;margin:10px;}</style>
    </head>
    <body>
        <form action="auth/log">
            <input type="text" name="login" placeholder="Логин или почта">
            <input type="password" name="password" placeholder="Пароль">
            <button>Войти</button>
        </form>
        <form action="auth/reg">
            <input type="text" name="email" placeholder="Электронная почта">
            <input type="text" name="login" placeholder="Логин">
            <input type="text" name="name" placeholder="Имя">
            <input type="password" name="password" placeholder="Пароль">
            <input type="password" name="repeat_password" placeholder="Повторить пароль">
            <button>Зарегистрироваться</button>
        </form>
    </body>
</html>