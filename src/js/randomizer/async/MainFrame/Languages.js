import {Settings} from '/src/js/randomizer/async/MainFrame/Settings.js';

class Languages {
    static selectors = new Map([
        // add_new()
        ['Форма добавления языка', '.languages-add-create__form'],
        ['Кнопка добавления нового языка', '.languages-add-create__button_add'],
        ['Шаблон кнопки изучаемого языка', '.languages-additional-languages-list__template'],

        // select_main()
        ['Кнопка выбора основного языка', '#main'],

        // select_studied()
        ['Кнопка добавления изучаемого языка', '#new'],

        // clear_new_language_fields()
        ['Наименование языка', '.languages-add-create__input_language-name'],
        ['Наименование папки', '.languages-add-create__input_language-folder'],
        ['Метка языка', '.languages-add-create__input_shorthand'],
        ['Наличие иероглифов', '#present-kanji'],
    ]);





    // add_new()
    static add_new__form = document.querySelector(Languages.selectors.get('Форма добавления языка'));
    static add_new__button = document.querySelector(Languages.selectors.get('Кнопка добавления нового языка'));
    static studied_language_button__template = document.querySelector(Languages.selectors.get('Шаблон кнопки изучаемого языка'));
    
    // select_main
    static select_main__button = document.querySelector(Languages.selectors.get('Кнопка выбора основного языка'));

    // select_studied
    static add_new_studied__button = document.querySelector(Languages.selectors.get('Кнопка добавления изучаемого языка'));

    // add_new()
    // clear_new_language_fields()
    static #name = document.querySelector(Languages.selectors.get('Наименование языка'));
    static #foldername = document.querySelector(Languages.selectors.get('Наименование папки'));
    static #mark = document.querySelector(Languages.selectors.get('Метка языка'));
    static #kanji = document.querySelector(Languages.selectors.get('Наличие иероглифов'));





    static add_new(event) {
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        let data = new FormData(Languages.add_new__form);
        xhr.open('POST', '/randomizer/addNewLanguage');
        xhr.send(data);
        xhr.responseType = 'json';
        xhr.onloadend = () => {
            switch(Settings.where_to_add_new_language) {
                case 'main':
                    Languages.select_main__button.textContent = 
                    Languages.select_main__button.dataset.language = Languages.#name.value;
                    Languages.select_main__button.dataset.folder = Languages.#foldername.value;
                    Languages.select_main__button.dataset.mark = Languages.#mark.value;
                    Languages.select_main__button.dataset.kanji = (Languages.#kanji.checked) ? 'true' : '';
                    Languages.clear_new_language_fields();
                    break;
                case 'studied':
                    let clone = Languages.studied_language_button__template.content.cloneNode(true);
                    let button = clone.querySelector('button');
                    button.id = 
                    button.textContent = 
                    button.dataset.language = Languages.#name.value;
                    button.dataset.folder = Languages.#foldername.value;
                    button.dataset.mark = Languages.#mark.value;
                    button.dataset.kanji = (Languages.#kanji.checked) ? 'true' : '';
                    button.addEventListener('click', Settings.__select_studied_language_for_editing);
                    Languages.add_new_studied__button.before(button);
                    Languages.clear_new_language_fields();
                    break;
                case 'git':
                    break;
            }
            // alert(xhr.response);
        };
    }

    static select_main() {
        Settings.where_to_add_new_language = 'main';
    }

    static select_studied() {
        Settings.where_to_add_new_language = 'studied';
    }

    static clear_new_language_fields() {
        Languages.#name.value = '';
        Languages.#foldername.value = '';
        Languages.#mark.value = '';
        Languages.#kanji.checked = false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    Languages.add_new__button.addEventListener('click', Languages.add_new);
    Languages.select_main__button.addEventListener('click', Languages.select_main);
    Languages.add_new_studied__button.addEventListener('click', Languages.select_studied);
});