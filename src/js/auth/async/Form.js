import {Form} from '/src/js/auth/Form.js';

class asyncForm {
    static selectors = new Map([
        ['Кнопка входа', '.form__button_log'],
        ['Кнопка регистрации', '.form__button_reg'],
    ]);





    static log_button = document.querySelector(asyncForm.selectors.get('Кнопка входа'));
    static reg_button = document.querySelector(asyncForm.selectors.get('Кнопка регистрации'));





    static log(event) {
        event.preventDefault();
        let data = new FormData(Form.log_form);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/auth/log');
        xhr.send(data);
        xhr.responseType = 'json';
        xhr.onload = () => {
            Form.resetErrors('log');
        };
        xhr.onloadend = () => {
            if(xhr.response.hasOwnProperty('redirect')) {
                location.href = '/randomizer/view';
            }
            else {
                Form.showErrors(xhr.response, 'log');
            }
            // alert(xhr.responseText);
        };
    }

    static reg(event) {
        event.preventDefault();
        let data = new FormData(Form.reg_form);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/auth/reg');
        xhr.send(data);
        xhr.responseType = 'json';
        xhr.onload = () => {
            Form.resetErrors('reg');
        }
        xhr.onloadend = () => {
            if(xhr.response.hasOwnProperty('redirect')) {
                location.href = '/randomizer/view';
            }
            else {
                Form.showErrors(xhr.response, 'reg');
            }
            // alert(xhr.responseText);
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    asyncForm.log_button.addEventListener('click', asyncForm.log);
    asyncForm.reg_button.addEventListener('click', asyncForm.reg);
});