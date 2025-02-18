import {Words} from "/src/js/randomizer/MainFrame/Words.js";
import {MainActions} from "/src/js/randomizer/Dashboard/MainActions.js";
import {WordsTypes} from "/src/js/randomizer/DataStructures/WordsTypes.js";
import {Languages} from "/src/js/randomizer/async/MainFrame/Languages.js";
import {QuickAccess} from "/src/js/randomizer/Dashboard/QuickAccess.js";

class Lists {
    static selectors = new Map([
        ['Кнопка разрешающая создание нового списка', '.actions-main__button_create-new-list'],
        ['Кнопка закрывающая действие над списками', '.actions-main__button_close-editing'],
        ['Кнопки быстрого переключения между изучаемыми языками', '.other-languages__button'],
        // define_active_language
        ['Активный язык', '.languages-additional-languages-list__button_studied-language'],
        // focus_on_next_row
        ['Шаблон нумерации строки', '.words__template_number'],
        ['Шаблон строки', '.words__template_word'],
        // select_row_by_click_on_number
        ['Числа нумерующие слова', '.words .counter p'],
        // hide_lists_absense_info
        ['Блоки информации об отсутствии списков', '.lists_absense-info'],
        // create_button_of_new_list
        ['Шаблон кнопки списка', '.lists_select-list__template'],
        // hide_mode_switcher
        // show_mode_switcher
        ['Область переключения режима изучения', '.other-modes'],



        ['Область основных списков', '.lists-word'],
    ]);





    static active_language_mark = false;
    static source_row = 1;
    static translation_row = 0;
    static transcription_row = 0;





    // DOMContentLoaded
    static new_list_creation_access__button = document.querySelector(Lists.selectors.get('Кнопка разрешающая создание нового списка'));
    static close_main_action__button = document.querySelector(Lists.selectors.get('Кнопка закрывающая действие над списками'));
    static quick_access_to_studied_languages__buttons = document.querySelectorAll(Lists.selectors.get('Кнопки быстрого переключения между изучаемыми языками'));
    // define_active_language
    static active_language__button = document.querySelector(Lists.selectors.get('Активный язык'));
    // focus_on_next_row
    static row_number__template = document.querySelector(Lists.selectors.get('Шаблон нумерации строки'));
    static row__template = document.querySelector(Lists.selectors.get('Шаблон строки'));
    // hide_lists_absense_info
    static lists_absense_info__blocks = document.querySelectorAll(Lists.selectors.get('Блоки информации об отсутствии списков'));
    // create_button_of_new_list
    static list_button__template = document.querySelector(Lists.selectors.get('Шаблон кнопки списка'));
    // hide_mode_switcher
    // show_mode_switcher
    static mode_switcher__area = document.querySelector(Lists.selectors.get('Область переключения режима изучения'));



    static main_lists__area = document.querySelector(Lists.selectors.get('Область основных списков'));





    /**
     * При нажатии на кнопку добавления нового списка 
     * запускает режим создания нового списка.
     */
    static new_list_creation_access() {
        if(MainActions.stack.peek() === 'create-new-list') {
            document.addEventListener('keyup', Words.reverse_mode_by_keyup);
            Words.words__area.addEventListener('click', Words.reverse_mode_by_click);
            let elements = Words.words__area.querySelectorAll('pre');
            for(const element of elements) {
                element.removeAttribute('contenteditable');
                element.removeEventListener('keyup', Lists.execute_by_keyup);
            }
            elements = document.querySelectorAll(Lists.selectors.get('Числа нумерующие слова'));
            for(const button of elements)
                button.removeEventListener('click', Lists.select_row_by_click_on_number);
        }
        else {
            document.removeEventListener('keyup', Words.reverse_mode_by_keyup);
            Words.words__area.removeEventListener('click', Words.reverse_mode_by_click);
            let elements = Words.words__area.querySelectorAll('pre');
            for(const element of elements) {
                element.setAttribute('contenteditable', '');
                element.addEventListener('keyup', Lists.execute_by_keyup);
            }
            elements = document.querySelectorAll(Lists.selectors.get('Числа нумерующие слова'));
            for(const button of elements)
                button.addEventListener('click', Lists.select_row_by_click_on_number);
            WordsTypes.resetSections();
            Words.switch_mode();
            let current_mode = WordsTypes.getShownSectionType();
            let row = document.querySelector(`.words_section[data-type="${current_mode}"] pre[data-id="1"]`);
            row.focus();
            Lists.select_text(row);
        }
    }

    /**
     * Работает только при включенном режиме создания нового списка.
     * Определяет что происходит при нажатии определенной клавиши.
     */
    static execute_by_keyup(event) {
        switch(WordsTypes.getShownSectionType()) {
            case 'source':
                Lists.source_row = this.dataset.id;
                break;
            case 'translation':
                Lists.translation_row = this.dataset.id;
                break;
            case 'transcription':
                Lists.transcription_row = this.dataset.id;
                break;
        }
        switch(event.code) {
            case 'Enter':
                /**
                 * Добавление новых строк по нажатию на Enter
                 */
                for(const element of this.children) {
                    let text = this.textContent;
                    element.remove();
                    this.textContent = text;
                }
                Words.switch_to_next_mode();
                Lists.focus_on_next_row();
                break;
            case 'Backspace':
                /**
                 * Удаление существующей строки по нажатию на Backspace
                 */
                if(this.textContent === "") {
                    if(this.dataset.id > 1) {
                        Lists.delete_number_and_row(this.dataset.id);
                        this.remove();
                    }
                }
                break;
        }
    }

    /**
     * Работает только при включенном режиме создания нового списка.
     * Удаляет номер и строку на которой стоит фокус.
     * В параметр number передается номер строки для удаления.
     * Параметр передается в методе execute_by_keyup.
     */
    static delete_number_and_row(number) {
        if(number > 1) {
            let current_mode = WordsTypes.getShownSectionType();
            let all_numbers = document.querySelectorAll(`.${current_mode} .counter p`);
            let all_rows = document.querySelectorAll(`.words_section[data-type="${current_mode}"] pre`);
            let number_for_deletion = document.querySelector(`.${current_mode} .counter p[data-id="${number}"]`);
            let row_for_deletion = document.querySelector(`.words_section[data-type="${current_mode}"] pre[data-id="${number}"]`);
            for(let i = number; i < all_numbers.length; i++) 
                all_numbers[i].textContent = all_numbers[i].dataset.id = i;
            for(let i = number; i < all_rows.length; i++)
                all_rows[i].dataset.id = i;
            number_for_deletion.remove();
            row_for_deletion.remove();
            let _number;
            switch(current_mode) {
                case 'source':
                    _number = --Lists.source_row;
                    break;
                case 'translation':
                    _number = --Lists.translation_row;
                    break;
                case 'transcription':
                    _number = --Lists.transcription_row;
                    break;
            }
            let row = document.querySelector(`.words_section[data-type="${current_mode}"] pre[data-id="${_number}"]`);
            if(row.textContent === '') {
                row.textContent = 'Сюда писать ';
                switch(current_mode) {
                    case 'source':
                        row.textContent += 'исходное значение';
                        break;
                    case 'translation':
                        row.textContent += 'перевод';
                        break;
                    case 'transcription':
                        row.textContent += 'чтение';
                        break;
                }
            }
            Lists.select_text(row);
        }
    }

    /**
     * Первый раз запускается при загрузке страницы.
     * Далее используется при переключении на другой язык с помощью 
     * панели быстрого доступа и при выборе языка из списка в настройках.
     */
    static define_active_language(onstart = false, _language = false) {
        if(Lists.active_language__button !== null)
            if(onstart === true)
                Lists.active_language_mark = Lists.active_language__button.dataset.mark;
            else 
                Lists.active_language_mark = _language.dataset.mark;
    }

    static unset_active_language_mark() {
        Lists.active_language_mark = false;
    }

    static focus_on_next_row() {
        let _number;
        let current_mode = WordsTypes.getShownSectionType();
        switch(current_mode) {
            case 'source':
                _number = ++Lists.source_row;
                break;
            case 'translation':
                _number = ++Lists.translation_row;
                break;
            case 'transcription':
                _number = ++Lists.transcription_row;
                break;
        }
        let target_row = document.querySelector(`.words_section[data-type="${current_mode}"] pre[data-id="${_number}"]`);
        if(target_row === null) {
            let number_clone = Lists.row_number__template.content.cloneNode(true);
            let row_clone = Lists.row__template.content.cloneNode(true);
            let number = number_clone.querySelector('p');
            let row = row_clone.querySelector('pre');
            number.dataset.id = _number;
            number.textContent = _number;
            number.addEventListener('click', Lists.select_row_by_click_on_number);
            row.dataset.id = _number;
            let text;
            switch(WordsTypes.getShownSectionType()) {
                case 'source':
                    text = 'исходное значение';
                    break;
                case 'translation':
                    text = 'перевод';
                    break;
                case 'transcription':
                    text = 'чтение';
                    break;
            }
            row.textContent += text;
            row.setAttribute('contenteditable', '');
            row.addEventListener('keyup', Lists.execute_by_keyup);
            let number_insertion_place = document.querySelector(`.${current_mode} .counter`);
            let row_insertion_place = document.querySelector(`.words_section[data-type="${current_mode}"]`);
            number_insertion_place.append(number);
            row_insertion_place.append(row);
            row.focus();
            Lists.select_text(row);
        }
        else 
            target_row.focus();
    }

    static select_text(row) {
        let range = document.createRange();
        let selection = window.getSelection();
        range.setStartBefore(row.childNodes[0]);
        range.setEndAfter(row.childNodes[0]);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    static select_row_by_click_on_number() {
        let current_mode = WordsTypes.getShownSectionType();
        let row = document.querySelector(`.words_section[data-type="${current_mode}"] pre[data-id="${this.dataset.id}"]`);
        if(row.textContent === '') {
            row.textContent = 'Сюда писать ';
            switch(WordsTypes.getShownSectionType()) {
                case 'source':
                    row.textContent += 'исходное значение';
                    break;
                case 'translation':
                    row.textContent += 'перевод';
                    break;
                case 'transcription':
                    row.textContent += 'чтение';
                    break;
            }
        }
        Lists.select_text(row);
    }

    static get_lists_from_another_language() {
        if(Lists.active_language_mark)
            Languages.unset_active_color_for_active_language(Lists.active_language_mark);
        Lists.define_active_language(false, this);
        WordsTypes.defineSections(false, this);
        Words.switch_mode();
        Lists.check_mode_switcher_existence_for_language(this);
        Lists.close_main_action();
        QuickAccess.set_active_colors_for_modes(true);
        QuickAccess.unset_active_colors_for_modes();
        Languages.set_active_color_for_active_language(Lists.active_language_mark);
    }

    static save_list() {

    }

    static stash_list() {
        
    }

    static close_main_action() {
        Lists.close_main_action__button.click();
    }





    /**
     * методы для работы с внешним видом
     */

    static hide_lists_absense_info() {
        for(const block of Lists.lists_absense_info__blocks)
            block.style.display = 'none';
    }

    static create_button_of_new_list() {
        let list_button = Lists.#create_list_button('Новый список', false);
        list_button_button.dataset.type = 'new';
        let list_button_delete = list_button.querySelector('button');
        // здесь привязка функции удаления списка
        // здесь привязка функции выбора списка
        Lists.main_lists__area.prepend(list_button);
    }

    static #create_list_button(list_name, default_deletion = true) {
        let clone = Lists.list_button__template.content.cloneNode(true);
        let list_button = clone.querySelector('div');
        let list_button_name = list_button.querySelector('p');
        list_button_name.textContent = list_name;
        if(default_deletion === true) {
            let list_button_delete = list_button.querySelector('button');
            // здесь привязка функции удаления списка
        }
        return list_button;
    }

    static check_mode_switcher_existence_for_language(_language) {
        if(_language.dataset.kanji) 
            Lists.show_mode_switcher();
        else
            Lists.hide_mode_switcher();
    }

    static hide_mode_switcher() {
        Lists.mode_switcher__area.style.display = 'none';
    }

    static show_mode_switcher() {
        Lists.mode_switcher__area.style.display = '';
    }
}

export {Lists};

document.addEventListener('DOMContentLoaded', function() {
    Lists.define_active_language(true);
    Lists.new_list_creation_access__button.addEventListener('click', Lists.new_list_creation_access);
    /**
     * Переключение языков через кнопки языков на панели быстрого доступа
     */
    for(const button of Lists.quick_access_to_studied_languages__buttons) {
        button.addEventListener('click', Lists.get_lists_from_another_language);
    }
    /**
     * Переключение языков через кнопки языков в настройках
     */
    for(const button of Languages.studied_languages_for_switching__buttons) {
        button.addEventListener('click', Lists.get_lists_from_another_language);
    }
});