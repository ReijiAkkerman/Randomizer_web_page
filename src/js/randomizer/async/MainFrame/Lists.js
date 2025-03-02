import {Words} from "/src/js/randomizer/MainFrame/Words.js";
import {MainActions} from "/src/js/randomizer/Dashboard/MainActions.js";
import {WordsTypes} from "/src/js/randomizer/DataStructures/WordsTypes.js";
import {Languages} from "/src/js/randomizer/async/MainFrame/Languages.js";
import {QuickAccess} from "/src/js/randomizer/Dashboard/QuickAccess.js";
import {UserInterface} from "/src/js/randomizer/UserInterface.js";
import {Adaptive} from "/src/js/randomizer/Adaptive.js";

class Lists {
    static selectors = new Map([
        ['Кнопка разрешающая создание нового списка', '.actions-main__button_create-new-list'],
        ['Кнопка закрывающая действие над списками', '.actions-main__button_close-editing'],
        ['Кнопки быстрого переключения между изучаемыми языками', '.other-languages__button'],
        ['Кнопки списков', '.lists_select-list'],
        ['Кнопки основных списков', '.lists-word .lists_select-list'],
        ['Область слов', '.words'],
        // define_active_language
        ['Область переключения изучаемых языков', '.languages-additional-languages-list'],
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
        // create_button_of_new_list
        ['Область основных списков', '.lists-word'],
        ['Место вставки основных списков', '.lists-word .lists_title'],
        // save_new_list
        ['Форма слов', '.words__form'],
        ['Поле для наименования языка', '.actions-additional__input[name="list_name"]'],
        ['Место вывода ошибки о наименовании списка', '.actions-additional_errors-info'],
        ['Кнопка сохранения списка', '.actions-additional__button_save-list'],
        // define_native_language
        ['Кнопка основного языка', '#main'],
    ]);





    static active_language_mark = false;
    static source_row = 1;
    static translation_row = 0;
    static transcription_row = 0;
    static row_number_for_deletion = false;
    static editing_mode = false;
    static selected_list_type = false;
    static selected_list_id = false;
    static deletion_access;
    static row_id_for_editing = false;
    static deviation = {};
    static editing_access = false;
    static editing_access__timeoutID = false;
    static row_id__timeoutID = false;
    static edited_row = false;





    // DOMContentLoaded
    static new_list_creation_access__button = document.querySelector(Lists.selectors.get('Кнопка разрешающая создание нового списка'));
    static close_main_action__button = document.querySelector(Lists.selectors.get('Кнопка закрывающая действие над списками'));
    static quick_access_to_studied_languages__buttons = document.querySelectorAll(Lists.selectors.get('Кнопки быстрого переключения между изучаемыми языками'));
    static list__buttons = document.querySelectorAll(Lists.selectors.get('Кнопки списков'));
    static main_list__buttons = document.querySelectorAll(Lists.selectors.get('Кнопки основных списков'));
    static words__area = document.querySelector(Lists.selectors.get('Область слов'));
    // define_active_language
    static studied_languages_for_switching__area = document.querySelector(Lists.selectors.get('Область переключения изучаемых языков'));
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
    // create_button_of_new_list
    static main_lists__area = document.querySelector(Lists.selectors.get('Область основных списков'));
    static main_lists__insertion_place = document.querySelector(Lists.selectors.get('Место вставки основных списков'));
    // save_new_list
    static words__form = document.querySelector(Lists.selectors.get('Форма слов'));
    static list_name__input = document.querySelector(Lists.selectors.get('Поле для наименования языка'));
    static list_name__error = document.querySelector(Lists.selectors.get('Место вывода ошибки о наименовании списка'));
    static save_list__button = document.querySelector(Lists.selectors.get('Кнопка сохранения списка'));
    // define_native_language
    static main_language__button = document.querySelector(Lists.selectors.get('Кнопка основного языка'));





    /**
     * При нажатии на кнопку добавления нового списка 
     * запускает режим создания нового списка.
     */
    static new_list_creation_access() {
        if(MainActions.stack.peek() === 'create-new-list')
            Lists.set_editing_mode();
        else {
            let new_list = Lists.main_lists__area.querySelector('.lists_select-list[data-type="new"]');
            if(new_list === null) {
                Lists.#clear_words_area();
                Lists.#insert_empty_rows('Сюда писать исходное значение');
            }
            Lists.set_editing_mode();
            WordsTypes.resetSections();
            Words.switch_mode();
            let current_mode = WordsTypes.getShownSectionType();
            let row = document.querySelector(`.words_section[data-type="${current_mode}"] pre[data-id="1"]`);
            row.focus();
            Lists.select_text(row);
            Lists.enable_editing_mode();
        }
    }

    static set_editing_mode() {
        document.removeEventListener('keyup', Words.reverse_mode_by_keyup);
        Words.words__area.removeEventListener('click', Words.reverse_mode_by_click);
        let elements = Words.words__area.querySelectorAll('pre');
        for(const element of elements) {
            element.setAttribute('contenteditable', '');
            element.addEventListener('input', Lists.stash_by_change);
            if(Adaptive.getDevice() === 'desktop') 
                element.addEventListener('keyup', Lists.execute_by_keyup);
            else
                element.addEventListener('input', Lists.execute_by_input);
        }
        elements = document.querySelectorAll(Lists.selectors.get('Числа нумерующие слова'));
        for(const button of elements)
            button.addEventListener('click', Lists.select_row_by_click_on_number);
    }

    static unset_editing_mode() {
        document.addEventListener('keyup', Words.reverse_mode_by_keyup);
        Words.words__area.addEventListener('click', Words.reverse_mode_by_click);
        let elements = Words.words__area.querySelectorAll('pre');
        for(const element of elements) {
            element.removeAttribute('contenteditable');
            element.removeEventListener('input', Lists.stash_by_change);
            if(Adaptive.getDevice() === 'desktop') 
                element.removeEventListener('keyup', Lists.execute_by_keyup);
            else
                element.removeEventListener('input', Lists.execute_by_input);
        }
        elements = document.querySelectorAll(Lists.selectors.get('Числа нумерующие слова'));
        for(const button of elements)
            button.removeEventListener('click', Lists.select_row_by_click_on_number);
    }

    /**
     * Работает только при включенном режиме создания нового списка.
     * Определяет что происходит при нажатии определенной клавиши.
     */
    static execute_by_input(event) {
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
        switch(event.inputType) {
            /**
             * Добавление новых строк по нажатию на Enter
             */
            case 'insertParagraph':
                for(const element of this.children) {
                    let text = this.textContent;
                    element.remove();
                    this.textContent = text;
                }
                Words.switch_to_next_mode();
                Lists.focus_on_next_row();
                break;
            /**
             * Удаление существующей строки по нажатию на Backspace
             */
            case 'deleteContentBackward':
                if(this.textContent === "") {
                    if(this.dataset.id > 1) {
                        if(Lists.deletion_access === true) {
                            Lists.delete_number_and_row(this.dataset.id);
                            this.remove();
                        }
                    }
                }
                break;
            case 'insertCompositionText':
                Lists.deletion_access = true;
                break;
        }
    }

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
            /**
             * Добавление новых строк по нажатию на Enter
             */
            case 'Enter':
                for(const element of this.children) {
                    let text = this.textContent;
                    element.remove();
                    this.textContent = text;
                }
                Words.switch_to_next_mode();
                Lists.focus_on_next_row();
                break;
            /**
             * Удаление существующей строки по нажатию на Backspace
             */
            case 'Backspace':
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
            Lists.check_row_existence(_number + 1);
        }
    }

    /**
     * Первый раз запускается при загрузке страницы.
     * Далее используется при переключении на другой язык с помощью 
     * панели быстрого доступа и при выборе языка из списка в настройках.
     */
    static define_active_language(onstart = false, _language = false) {
        if(onstart === true){
            let active_language__button = Lists.studied_languages_for_switching__area.querySelector('button[data-selected="true"]');
            if(active_language__button !== null)
                Lists.active_language_mark = active_language__button.dataset.mark;
        }
        else 
            Lists.active_language_mark = _language.dataset.mark;
    }

    static unset_active_language_mark() {
        Lists.active_language_mark = false;
    }

    static set_active_language_on_server(_language_mark) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `/randomizer/setSelectedLanguage/${_language_mark}`);
        xhr.send();
        xhr.responseType = 'json';
        xhr.onloadend = () => {
            if(xhr.response === null) alert('Произошла ошибка в set_active_language_on_server!');
            else if(xhr.response.hasOwnProperty('updated'));
            else if(xhr.response.hasOwnProperty('redirect'))
                location.href = '/auth/view';
            // alert(xhr.response);
        };
    }

    static unset_active_language_on_server() {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/randomizer/unsetSelectedLanguage');
        xhr.send();
        xhr.responseType = 'json';
        xhr.onloadend = () => {
            if(xhr.response === null) alert('Произошла ошибка в unset_active_language_on_server!');
            else if(xhr.response.hasOwnProperty('updated'));
            else if(xhr.response.hasOwnProperty('redirect'))
                location.href = '/auth/view';
        };
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
            row.addEventListener('input', Lists.stash_by_change);
            if(Adaptive.getDevice() === 'desktop') 
                row.addEventListener('keyup', Lists.execute_by_keyup);
            else
                row.addEventListener('input', Lists.execute_by_input);
            let number_insertion_place = document.querySelector(`.${current_mode} .counter`);
            let row_insertion_place = document.querySelector(`.words_section[data-type="${current_mode}"]`);
            number_insertion_place.append(number);
            row_insertion_place.append(row);
            row.focus();
            Lists.select_text(row);
            if(Adaptive.getDevice() === 'mobile')
                Lists.deletion_access = false;
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
        row.focus();
        Lists.select_text(row);
        if(Adaptive.getDevice() === 'mobile')
            Lists.deletion_access = true;
    }

    /**
     * Редактирование строк всех списков кроме нового списка.
     * Мобильная версия(функции ниже до комментария относятся к редактированию)
     */
    static edit_row__mobile(event) {
        if(Lists.row_id_for_editing) {
            if(Lists.editing_access) {
                // Lists.write_deviation(event);
                if(Lists.deviation.x_access && Lists.deviation.y_access) {
                    Words.reverse_mode();
                    let current_mode = WordsTypes.getShownSectionType();
                    switch(current_mode) {
                        case 'source':
                            Lists.edited_row = Lists.source__area.querySelector(`pre[data-id="${Lists.row_id_for_editing}"]`);
                            break;
                        case 'translation':
                            Lists.edited_row = Lists.translation__area.querySelector(`pre[data-id="${Lists.row_id_for_editing}"]`);
                            break;
                        case 'transcription':
                            Lists.edited_row = Lists.transcription__area.querySelector(`pre[data-id="${Lists.row_id_for_editing}"]`);
                            break;
                    }
                    document.removeEventListener('keyup', Words.reverse_mode_by_keyup);
                    Words.words__area.removeEventListener('click', Words.reverse_mode_by_click);
                    Lists.edited_row.style.userSelect = 'text';
                    Lists.edited_row.setAttribute('contenteditable', '');
                    Lists.edited_row.addEventListener('input', Lists.close_row_editing__mobile);
                    Lists.edited_row.focus();
                    Lists.select_text(Lists.edited_row);
                }
            }
        }
    }
    
    static write_deviation(event) {
        Lists.deviation.currentX = event.touches[0].clientX;
        Lists.deviation.currentY = event.touches[0].clientY;
        Lists.deviation.deltaX = Lists.deviation.startX - Lists.deviation.currentX;
        Lists.deviation.deltaY = Lists.deviation.startY - Lists.deviation.currentY;
        Math.abs(Lists.deviation.deltaX);
        Math.abs(Lists.deviation.deltaY);
        if(Lists.deviation.deltaX > 40)
            Lists.deviation.x_access = false;
        if(Lists.deviation.deltaY > 40)
            Lists.deviation.y_access = false;
    }

    static start_keeping_timer(event) {
        if(Lists.row_id_for_editing) {
            Lists.deviation.startX = event.touches[0].clientX;
            Lists.deviation.startY = event.touches[0].clientY;
            Lists.deviation.x_access = true;
            Lists.deviation.y_access = true;
            Lists.editing_access__timeoutID = setTimeout(() => {
                Lists.#enable_editing_access();
            }, 1000);
        }
    }

    static #enable_editing_access() {
        Lists.editing_access = true;
    }

    static #disable_editing_access() {
        Lists.editing_access = false;
    }

    static set_row_id_for_editing() {
        if(Lists.selected_list_type && Lists.selected_list_type !== 'new') {
            Lists.row_id_for_editing = this.dataset.id;
            Lists.row_id__timeoutID = setTimeout(() => {
                Lists.#disable_editing_access();
                Lists.row_id_for_editing = false;
            }, 3000);
        }
    }

    static close_row_editing__mobile(event) {
        for(const element of Lists.edited_row.children) {
            let text = Lists.edited_row.textContent;
            element.remove();
            Lists.edited_row.textContent = text;
        }
        if(/\p{L}+/u.test(Lists.edited_row.textContent)) {
            switch(event.inputType) {
                case 'insertParagraph':
                    Lists.edited_row.removeAttribute('contenteditable');
                    Lists.edited_row.style.userSelect = '';
                    Lists.edited_row.removeEventListener('input', Lists.close_row_editing__mobile);
                    Lists.edited_row = false;
                    Lists.deviation = {};
                    Lists.#disable_editing_access();
                    document.addEventListener('keyup', Words.reverse_mode_by_keyup);
                    Words.words__area.addEventListener('click', Words.reverse_mode_by_click);
                    break;
            }
        }
        else {

        }
    }

    /**
     * Редактирование строк всех списков кроме нового списка.
     * Компьютерная версия
     */
    static edit_row__desktop() {

    }

    /**
     * Работает всегда.
     * Переключает языки.
     */
    static get_lists_from_another_language() {
        if(Lists.active_language_mark)
            Languages.unset_active_color_for_active_language(Lists.active_language_mark);
        Lists.define_active_language(false, this);
        Lists.set_active_language_on_server(Lists.active_language_mark);
        WordsTypes.defineSections(false, this);
        Words.switch_mode();
        Lists.check_mode_switcher_existence_for_language(this);
        Lists.close_main_action();
        QuickAccess.set_active_colors_for_modes(true);
        QuickAccess.unset_active_colors_for_modes();
        Languages.set_active_color_for_active_language(Lists.active_language_mark);
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/randomizer/getAllListsData/${this.dataset.id}/1`);
        xhr.send();
        xhr.responseType = 'json';
        xhr.onloadend = () => {
            if(xhr.response === null) alert('Произошла ошибка в get_lists_from_another_language!');
            else if(xhr.response.hasOwnProperty('updated')) {
                Lists.#clear_words_area();
                Lists.#delete_all_lists();
                localStorage.clear();
                if(xhr.response.main.length) {
                    Lists.hide_lists_absense_info();
                    Lists.show_main_lists_block();
                    Lists.#insert_main_lists(xhr.response.main);
                    Lists.#insert_sources(xhr.response.main[0].source);
                    Lists.#insert_translations(xhr.response.main[0].translation);
                    Lists.#insert_transcriptions(xhr.response.main[0].transcription);
                }
                else {
                    Lists.hide_main_lists_block();
                    Lists.show_list_absense_info();
                    Lists.#insert_empty_rows();
                }
                Lists.source_row = 0;
                Lists.translation_row = 0;
                Lists.transcription_row = 0;
            }
            else if(xhr.response.hasOwnProperty('redirect'))
                location.href = '/auth/view';
            // alert(xhr.response);
        };
    }

    static #insert_main_lists(lists) {
        for(let i = 0; i < lists.length; i++) {
            let name = (lists[i].name) ? lists[i].name : lists[i].date;
            Lists.create_button_of_main_list(name, lists[i].id);
        }
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

    static check_row_existence(number = false) {
        let current_mode = WordsTypes.getShownSectionType();
        let row = document.querySelector(`.words_section[data-type="${current_mode}"] pre[data-id="${Lists.row_number_for_deletion}"]`);
        if(row === null) 
            if(number)
                localStorage.removeItem(current_mode + '_' + number);
            else 
                localStorage.removeItem(current_mode + '_' + Lists.row_number_for_deletion);
    }

    static restore_list(onstart = false) {
        if(localStorage.length) {
            Lists.create_button_of_new_list(onstart);
        }
    }

    static show_list_data(onstart = false) {
        switch((onstart === true) ? 'new' : this.dataset.type) {
            case 'new':
                Lists.#clear_words_area();
                let types = ['source', 'translation', 'transcription'];
                for(let type of types) {
                    let rows_in_type = localStorage.getItem(type + '_rows_number');
                    if(rows_in_type !== null)
                        for(let i = 1; i <= rows_in_type; i++) {
                            let number_clone = Lists.row_number__template.content.cloneNode(true);
                            let row_clone = Lists.row__template.content.cloneNode(true);
                            let number = number_clone.querySelector('p');
                            let row = row_clone.querySelector('pre');
                            number.textContent = 
                            number.dataset.id = 
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
            default:
                let xhr = new XMLHttpRequest();
                xhr.open('GET', `/randomizer/getListData/${this.dataset.id}`);
                xhr.send();
                xhr.responseType = 'json';
                xhr.onloadend = () => {
                    if(xhr.response === null) alert('Произошла ошибка в show_list_data!');
                    else if(xhr.response.hasOwnProperty('updated')) {
                        Lists.#clear_words_area();
                        Lists.#insert_sources(xhr.response.source);
                        Lists.#insert_translations(xhr.response.translation);
                        Lists.#insert_transcriptions(xhr.response.transcription);
                    }
                    else if(xhr.response.hasOwnProperty('redirect'))
                        location.href = '/auth/view';
                    // alert(xhr.response);
                };
                Lists.close_main_action();
                break;
        }
    }

    static #insert_sources(data) {
        if(data !== null) {
            let words = data.split(';');
            for(let i = 0; i < words.length; i++)
                Lists.#insert_row(
                    i + 1,
                    words[i],
                    Lists.source_numbers__area,
                    Lists.source__area
                );
        }
    }

    static #insert_translations(data) {
        if(data !== null) {
            let words = data.split(';');
            for(let i = 0; i < words.length; i++)
                Lists.#insert_row(
                    i + 1,
                    words[i],
                    Lists.translation_numbers__area,
                    Lists.translation__area
                );
        }
    }

    static #insert_transcriptions(data) {
        if(data !== null) {
            let words = data.split(';');
            for(let i = 0; i < words.length; i++)
                Lists.#insert_row(
                    i + 1,
                    words[i],
                    Lists.transcription_numbers__area,
                    Lists.transcription__area
                );
        }
    }

    static #insert_row(id, text, place_for_number, place_for_row) {
        let number_clone = Lists.row_number__template.content.cloneNode(true);
        let row_clone = Lists.row__template.content.cloneNode(true);
        let number = number_clone.querySelector('p');
        let row = row_clone.querySelector('pre');
        number.dataset.id = 
        number.textContent = 
        row.dataset.id = id;
        row.textContent = text;
        if(Lists.editing_mode) 
            number.addEventListener('click', Lists.select_row_by_click_on_number);
        else 
            number.addEventListener('click', Lists.edit_row_by_click_on_number);
        place_for_number.append(number);
        place_for_row.append(row);
    }

    static delete_new_list(event) {
        event.stopPropagation();
        Lists.#clear_words_area();
        Lists.#insert_empty_rows();
        Lists.#delete_new_list_button();
        MainActions.close_main_action_hide_button();
        MainActions.create_new_list_deactivate();
        Lists.unset_editing_mode();
        localStorage.clear();
        if(Lists.main_lists__area.children.length === 1) {
            Lists.hide_main_lists_block();
            Lists.show_list_absense_info();
        }
    }

    static delete_list(event) {
        event.stopPropagation();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `/randomizer/deleteList/${this.dataset.id}`);
        xhr.send();
        xhr.responseType = 'json';
        xhr.onloadend = () => {
            if(xhr.response === null) alert('Произошла ошибка в delete_list!');
            else if(xhr.response.hasOwnProperty('updated')) {
                Lists.#clear_words_area();
                Lists.#insert_empty_rows();
                let list_for_deletion = Lists.main_lists__area.querySelector(`.lists_select-list[data-type="${this.dataset.type}"][data-id="${this.dataset.id}"]`);
                list_for_deletion.remove();
                let main_list__buttons = Lists.main_lists__area.querySelectorAll(Lists.selectors.get('Кнопки списков'));
                if(main_list__buttons.length === 0) {
                    Lists.hide_main_lists_block();
                    Lists.show_list_absense_info();
                }
            }
            else if(xhr.response.hasOwnProperty('redirect'))
                location.href = '/auth/view';
            // alert(xhr.response);
        };
        event.stopPropagation();
    }

    static #delete_all_lists() {
        let types = ['main', 'hard', 'split', 'combined'];
        for(const type of types) {
            switch(type) {
                case 'main':
                    let main_lists = Lists.main_lists__area.querySelectorAll(Lists.selectors.get('Кнопки списков'));
                    let max = main_lists.length;
                    for(let i = max; i > 0; i--) 
                        main_lists[i - 1].remove();
                    break;
            }
        }
    }

    static create_main() {
        Lists.#prepare_words();
        let list_name = Lists.list_name__input.value;
        let data = new FormData(Lists.words__form);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `/randomizer/createNewList/${Lists.active_language_mark}/main/${list_name}`);
        xhr.send(data);
        xhr.responseType = 'json';
        xhr.onloadend = () => {
            if(xhr.response === null) alert('Произошла ошибка в create_main!');
            else if(xhr.response.hasOwnProperty('updated')) {
                let listName = (list_name) ? list_name : xhr.response.date;
                Lists.create_button_of_main_list(listName, xhr.response.id);
                Lists.#delete_new_list_button();
                Lists.close_main_action();
                localStorage.clear();
                Lists.hide_lists_absense_info();
                Lists.show_main_lists_block();
            }
            else if(xhr.response.hasOwnProperty('fields')) {
                for(let error of xhr.response.fields) {
                    switch(error) {
                        case 'list_name':
                            Lists.list_name__error.textContent = xhr.response.list_name;
                            break;
                        case 'alert':
                            alert(xhr.response.alert);
                            break;
                    }
                }
            }
            else if(xhr.response.hasOwnProperty('redirect'))
                location.href = '/auth/view';
            // alert(xhr.response);
        };
    }

    static #prepare_words() {
        let type__words;
        let types = ['source', 'translation', 'transcription'];
        for(const type of types) {
            switch(type) {
                case 'source':
                    type__words = Lists.source__area.children;
                    break;
                case 'translation':
                    type__words = Lists.translation__area.children;
                    break;
                case 'transcription':
                    type__words = Lists.transcription__area.children;
                    break;
            }
            let words = '';
            for(const row of type__words)
                words += row.textContent + ';';
            let input = document.querySelector(`.words__input[name="${type}"]`);
            input.value = words;
        }
    }

    static #delete_new_list_button() {
        let new_list = Lists.main_lists__area.querySelector('div[data-type="new"]');
        if(new_list !== null)
            new_list.remove();
    }

    static #clear_words_area() {
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
            for(let i = type__area.length; i > 0; i--)
                type__area[i - 1].remove();
            for (let i = type_numbers__area.length; i > 0; i--)
                type_numbers__area[i - 1].remove();
        }
    }

    static #insert_empty_rows(text = '') {
        let number_clone = Lists.row_number__template.content.cloneNode(true);
        let row_clone = Lists.row__template.content.cloneNode(true);
        let number =  number_clone.querySelector('p');
        let row = row_clone.querySelector('pre');
        row.dataset.id = 
        number.textContent = 
        number.dataset.id = '1';
        row.textContent = text;
        if(Lists.editing_mode === true) 
            number.addEventListener('click', Lists.select_row_by_click_on_number);
        // else 
            // number.addEventListener('click', Lists.edit_row_by_click_on_number);
        Lists.source__area.append(row);
        Lists.source_numbers__area.append(number);
    }

    static close_main_action() {
        Lists.close_main_action__button.click();
        Lists.disable_editing_mode();
    }

    static enable_editing_mode() {
        Lists.editing_mode = true;
    }

    static disable_editing_mode() {
        Lists.editing_mode = false;
    }

    static set_selected_list_id(onstart = false, selected_list = false) {
        if(onstart === true) {
            if(Lists.main_list__buttons.length)
                Lists.selected_list_id = Lists.main_list__buttons[0].dataset.id;
        }
        else 
            Lists.selected_list_id = selected_list.dataset.id;
    }

    static set_selected_list_type(onstart = false, selected_list = false) {
        if(onstart === true) {
            if(Lists.main_list__buttons.length) 
                Lists.selected_list_type = Lists.main_list__buttons[0].dataset.type;
        }
        else 
            Lists.selected_list_type = selected_list.dataset.type;
    }

    static unset_selected_list_id() {
        Lists.selected_list_id = false;
    }

    static unset_selected_list_type() {
        Lists.selected_list_type = false;
    }

    static highlight_list_button(onstart = false) {
        if(onstart === true) {
            Lists.set_selected_list_type(true);
            Lists.set_selected_list_id(true);
            if(Lists.main_list__buttons.length) 
                Lists.set_active_color_for_list_button(Lists.main_list__buttons[0]);
        }
        else {
            Lists.reset_list_button_highlighting();
            Lists.set_selected_list_type(false, this);
            Lists.set_selected_list_id(false, this);
            Lists.set_active_color_for_list_button(this);
        }
    }

    static reset_list_button_highlighting() {
        let button = document.querySelector(`.lists .lists_select-list[data-type="${Lists.selected_list_type}"][data-id="${Lists.selected_list_id}"]`);
        if(button !== null)
            Lists.unset_active_color_for_list_button(button);
    }





    /**
     * методы для работы с внешним видом
     */

    static hide_lists_absense_info() {
        for(const block of Lists.lists_absense_info__blocks)
            block.style.display = 'none';
    }

    static show_list_absense_info() {
        for(const block of Lists.lists_absense_info__blocks)
            block.style.display = '';
    }

    static create_button_of_new_list(onstart) {
        let list_button = Lists.#create_list_button('Новый список', false);
        list_button.dataset.type = 'new';
        let list_button_delete = list_button.querySelector('button');
        list_button_delete.addEventListener('click', Lists.delete_new_list);
        list_button.addEventListener('click', Lists.show_list_data);
        list_button.addEventListener('click', Lists.highlight_list_button);
        Lists.main_lists__insertion_place.after(list_button);
        Lists.hide_lists_absense_info();
        Lists.show_main_lists_block();
        Lists.show_list_data(onstart);
    }

    static create_button_of_main_list(_list_name, _id) {
        let list_button = Lists.#create_list_button(_list_name);
        let list_button__delete = list_button.querySelector('button');
        list_button.dataset.type = 
        list_button__delete.dataset.type = 'main';
        list_button.dataset.id = 
        list_button__delete.dataset.id = _id;
        list_button.addEventListener('click', Lists.show_list_data);
        list_button.addEventListener('click', Lists.highlight_list_button);
        Lists.reset_list_button_highlighting();
        Lists.selected_list_type = 'main';
        Lists.selected_list_id = _id;
        Lists.set_active_color_for_list_button(list_button);
        Lists.main_lists__insertion_place.after(list_button);
    }

    static #create_list_button(list_name = '', default_deletion = true) {
        let clone = Lists.list_button__template.content.cloneNode(true);
        let list_button = clone.querySelector('div');
        let list_button_name = list_button.querySelector('p');
        list_button_name.textContent = list_name;
        if(default_deletion === true) {
            let list_button_delete = list_button.querySelector('button');
            list_button_delete.addEventListener('click', Lists.delete_list);
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

    static define_mode_switcher_visibility() {
        let active_language__button = Lists.studied_languages_for_switching__area.querySelector('button[data-selected="true"]');
        if(active_language__button !== null)
            if(active_language__button.dataset.selected)
                if(active_language__button.dataset.kanji)
                    Lists.show_mode_switcher();
    }

    static show_main_lists_block() {
        Lists.main_lists__area.style.display = '';
    }

    static hide_main_lists_block() {
        Lists.main_lists__area.style.display = 'none';
    }

    static set_active_color_for_list_button(button) {
        let text = button.querySelector('p');
        button.style.borderColor = 
        text.style.color = UserInterface.color_of_selected_list;
    }

    static unset_active_color_for_list_button(button) {
        let text = button.querySelector('p');
        button.style.borderColor = 
        text.style.color = '';
    }
}

export {Lists};

document.addEventListener('DOMContentLoaded', function() {
    Lists.define_active_language(true);
    Lists.define_mode_switcher_visibility();
    Lists.restore_list(true);
    Lists.main_list__buttons = document.querySelectorAll(Lists.selectors.get('Кнопки основных списков'));
    Lists.highlight_list_button(true);
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
    for(const button of Lists.list__buttons) {
        button.addEventListener('click', Lists.show_list_data);
        button.addEventListener('click', Lists.highlight_list_button);
        let button__delete = button.querySelector('button');
        button__delete.addEventListener('click', Lists.delete_list);
    }
    let rows = Lists.words__area.querySelectorAll('pre');
    for(const row of rows)
        row.addEventListener('click', Lists.set_row_id_for_editing);
    Lists.save_list__button.addEventListener('click', Lists.create_main);
});

document.addEventListener('touchstart', Lists.start_keeping_timer);
document.addEventListener('touchmove', Lists.write_deviation);
document.addEventListener('touchend', Lists.edit_row__mobile);