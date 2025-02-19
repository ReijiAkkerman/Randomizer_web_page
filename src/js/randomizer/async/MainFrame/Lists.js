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
        // stash_list
        ['Область исходных значений', '.words .source .words_section'],
        ['Область чтений', '.words .transcription .words_section'],
        ['Область переводов', '.words .translation .words_section'],
        ['Область нумерации исходных значений', '.words .source .counter'],
        ['Область нумерации чтений', '.words .transcription .counter'],
        ['Область нумерации переводов', '.words .translation .counter'],



        ['Область основных списков', '.lists-word'],
        ['Место вставки основных списков', '.lists-word .lists_title'],
    ]);





    static active_language_mark = false;
    static source_row = 1;
    static translation_row = 0;
    static transcription_row = 0;
    static row_number_for_deletion = false;





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
    // stash_list
    static source__area = document.querySelector(Lists.selectors.get('Область исходных значений'));
    static translation__area = document.querySelector(Lists.selectors.get('Область переводов'));
    static transcription__area = document.querySelector(Lists.selectors.get('Область чтений'));
    static source_numbers__area = document.querySelector(Lists.selectors.get('Область нумерации исходных значений'));
    static translation_numbers__area = document.querySelector(Lists.selectors.get('Область нумерации переводов'));
    static transcription_numbers__area = document.querySelector(Lists.selectors.get('Область нумерации чтений'));



    static main_lists__area = document.querySelector(Lists.selectors.get('Область основных списков'));
    static main_lists__insertion_place = document.querySelector(Lists.selectors.get('Место вставки основных списков'));





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
                element.removeEventListener('keydown', Lists.remember_row_number);
                element.removeEventListener('keyup', Lists.stash_by_change);
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
                element.addEventListener('keydown', Lists.remember_row_number);
                element.addEventListener('keyup', Lists.stash_by_change);
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
            Lists.check_row_existence();
        }
    }

    /**
     * Первый раз запускается при загрузке страницы.
     * Далее используется при переключении на другой язык с помощью 
     * панели быстрого доступа и при выборе языка из списка в настройках.
     */
    static define_active_language(onstart = false, _language = false) {
        if(onstart === true) {
            if(Lists.active_language__button !== null)
                Lists.active_language_mark = Lists.active_language__button.dataset.mark;
        }
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
            row.addEventListener('keydown', Lists.remember_row_number);
            row.addEventListener('keyup', Lists.stash_by_change);
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

    /**
     * Работает только при режиме создания нового списка
     * или редактирования существующего.
     * Выделяет текст. 
     */
    static select_text(row) {
        if(row.textContent) {
            let range = document.createRange();
            let selection = window.getSelection();
            range.setStartBefore(row.childNodes[0]);
            range.setEndAfter(row.childNodes[0]);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    /**
     * Работает только при включенном режиме создания нового списка.
     * Выделяет строку и если строка пустая заполняет ее 
     * содержимым по умолчанию.
     */
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

    /**
     * Работает всегда.
     * Переключает языки.
     */
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

    static stash_by_change() {
        switch(WordsTypes.getShownSectionType()) {
            case 'source':
                localStorage.setItem('source_rows_number', '' + Lists.source__area.children.length);
                localStorage.setItem('source_' + this.dataset.id, this.textContent);
                break;
            case 'translation':
                localStorage.setItem('translation_rows_number', '' + Lists.translation__area.children.length);
                localStorage.setItem('translation_' + this.dataset.id, this.textContent);
                break;
            case 'transcription':
                localStorage.setItem('transcription_rows_number', '' + Lists.transcription__area.children.length);
                localStorage.setItem('transcription_' + this.dataset.id, '' + this.textContent);
                break;
        }
    }

    static remember_row_number() {
        Lists.row_number_for_deletion = this.dataset.id;
    }

    static check_row_existence() {
        let current_mode = WordsTypes.getShownSectionType();
        let row = document.querySelector(`.words_section[data-type="${current_mode}"] pre[data-id="${Lists.row_number_for_deletion}"]`);
        if(row === null) 
            localStorage.removeItem(current_mode + '_' + Lists.row_number_for_deletion);
    }

    static restore_list(onstart = false) {
        if(localStorage.length) {
            Lists.create_button_of_new_list(onstart);
        }
    }

    static show_list_data(onstart = false) {
        switch((onstart) ? 'new' : this.dataset.type) {
            case 'new':
                let type__area;
                let type_numbers__area;
                let types = ['source', 'translation', 'transcription'];
                for(const type of types) {
                    switch(type) {
                        case 'source':
                            type__area = Lists.source__area.children;
                            type_numbers__area = Lists.source_numbers__area.children;
                            break;
                        case 'translation':
                            type__area = Lists.translation__area.children;
                            type_numbers__area = Lists.translation_numbers__area.children;
                            break;
                        case 'transcription':
                            type__area = Lists.transcription__area.children;
                            type_numbers__area = Lists.transcription_numbers__area.children;
                            break;
                    }
                    for(const number of type__area)
                        number.remove();
                    for(const row of type_numbers__area)
                        row.remove();
                    let rows_in_type = localStorage.getItem(type + '_rows_number');
                    if(rows_in_type !== null)
                        for(let i = 1; i <= rows_in_type; i++) {
                            let number_clone = Lists.row_number__template.content.cloneNode(true);
                            let row_clone = Lists.row__template.content.cloneNode(true);
                            let number = number_clone.querySelector('p');
                            let row = row_clone.querySelector('pre');
                            number.textContent = 
                            row.dataset.id = i;
                            row.textContent = localStorage.getItem(type + '_' + i);
                            switch(type) {
                                case 'source':
                                    Lists.source_numbers__area.append(number);
                                    Lists.source__area.append(row);
                                    break;
                                case 'translation':
                                    Lists.translation_numbers__area.append(number);
                                    Lists.translation__area.append(row);
                                    break;
                                case 'transcription':
                                    Lists.transcription_numbers__area.append(number);
                                    Lists.transcription__area.append(row);
                                    break;
                            }
                        }
                }
                Lists.new_list_creation_access__button.click();
                break;
        }
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

    static create_button_of_new_list(onstart) {
        let list_button = Lists.#create_list_button('Новый список', false);
        list_button.dataset.type = 'new';
        let list_button_delete = list_button.querySelector('button');
        // здесь привязка функции удаления списка
        list_button.addEventListener('click', Lists.show_list_data);
        Lists.main_lists__insertion_place.after(list_button);
        Lists.hide_lists_absense_info();
        Lists.main_lists__area.style.display = '';
        Lists.show_list_data(onstart);
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

    static show_usual_lists_block() {
        
    }
}

export {Lists};

document.addEventListener('DOMContentLoaded', function() {
    Lists.define_active_language(true);
    Lists.restore_list(true);
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