class Form {
    static selectors = new Map([
        // Форма 
        ['Вход', '.form-switcher__button_log'],
        ['Регистрация', '.form-switcher__button_reg'],
        ['Форма входа', 'form[action="/auth/log"]'],
        ['Форма регистрации', 'form[action="/auth/reg"]'],
        ['Кнопка входа', '.form__button_log'],
        ['Кнопка регистрации', '.form__button_reg'],
        // Поля для ошибок
        ['Вход ошибка логина', '.form-error_log-login'],
        ['Вход ошибка пароля', '.form-error_log-password'],
        ['Регистрация ошибка электронной почты', '.form-error_reg-email'],
        ['Регистрация ошибка логина', '.form-error_reg-login'],
        ['Регистрация ошибка имени', '.form-error_reg-name'],
        ['Регистрация ошибка пароля', '.form-error_reg-password'],
        ['Регистрация ошибка повторного пароля', '.form-error_reg-repeat-password'],
    ]);





    // Форма 
    static log = document.querySelector(Form.selectors.get('Вход'));
    static log_form = document.querySelector(Form.selectors.get('Форма входа'));
    static reg = document.querySelector(Form.selectors.get('Регистрация'));
    static reg_form = document.querySelector(Form.selectors.get('Форма регистрации'));
    // Поля для ошибок
    static log_error_login = document.querySelector(Form.selectors.get('Вход ошибка логина'));
    static log_error_password = document.querySelector(Form.selectors.get('Вход ошибка пароля'));
    static reg_error_email = document.querySelector(Form.selectors.get('Регистрация ошибка электронной почты'));
    static reg_error_login = document.querySelector(Form.selectors.get('Регистрация ошибка логина'));
    static reg_error_name = document.querySelector(Form.selectors.get('Регистрация ошибка имени'));
    static reg_error_password = document.querySelector(Form.selectors.get('Регистрация ошибка пароля'));
    static reg_error_repeat_password = document.querySelector(Form.selectors.get('Регистрация ошибка повторного пароля'));





    static switchToLog() {
        Form.log_form.style.display = '';
        Form.log.style.borderColor = '#000';
        Form.reg_form.style.display = 'none';
        Form.reg.style.borderColor = '';
    }

    static switchToReg() {
        Form.reg_form.style.display = '';
        Form.reg.style.borderColor = '#000';
        Form.log_form.style.display = 'none';
        Form.log.style.borderColor = '';
    }

    static showErrors(data, type) {
        for(const field of data.fields)
            if(field === 'alert')
                console.log(data.alert);
            else 
                Form[`${type}_error_${field}`].textContent = data[`${field}`];
    }

    static resetErrors(type) {
        let fields = [
            'email',
            'login',
            'name',
            'password',
            'repeat_password'
        ];
        for(const field of fields) 
            Form[`${type}_error_${field}`].textContent = '';
    }
}

// var form = new Form();

export {Form};

document.addEventListener('DOMContentLoaded', function() {
    Form.log.addEventListener('click', Form.switchToLog);
    Form.reg.addEventListener('click', Form.switchToReg);
});