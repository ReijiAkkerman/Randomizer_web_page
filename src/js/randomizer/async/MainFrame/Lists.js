import {Words} from "/src/js/randomizer/MainFrame/Words.js";
import {MainActions} from "/src/js/randomizer/Dashboard/MainActions.js";
import {WordsTypes} from "/src/js/randomizer/DataStructures/WordsTypes.js";

class Lists {
    static selectors = new Map([
        ['Кнопка разрешающая создание нового списка', '.actions-main__button_create-new-list'],
        ['Кнопки быстрого переключения между изучаемыми языками', '.other-languages__button'],
        // define_active_language
        ['Активный язык', '.languages-additional-languages-list__button_studied-language'],
        // focus_on_next_row
        ['Шаблон нумерации строки', '.words__template_number'],
        ['Шаблон строки', '.words__template_word'],
        // select_row_by_click_on_number
        ['Числа нумерующие слова', '.words .counter p'],
    ]);





    static active_language_mark = false;
    static source_row = 1;
    static translation_row = 0;
    static transcription_row = 0;





    // DOMContentLoaded
    static new_list_creation_access__button = document.querySelector(Lists.selectors.get('Кнопка разрешающая создание нового списка'));
    static quick_access_to_studied_languages__buttons = document.querySelectorAll(Lists.selectors.get('Кнопки быстрого переключения между изучаемыми языками'));
    // define_active_language
    static active_language__button = document.querySelector(Lists.selectors.get('Активный язык'));
    // focus_on_next_row
    static row_number__template = document.querySelector(Lists.selectors.get('Шаблон нумерации строки'));
    static row__template = document.querySelector(Lists.selectors.get('Шаблон строки'));





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

    static define_active_language(onstart = false) {
        if(onstart === true)
            Lists.active_language_mark = Lists.active_language__button.dataset.mark;
        else 
            Lists.active_language_mark = this.dataset.mark;
        // console.log(Lists.active_language_mark);
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
}

export {Lists};

document.addEventListener('DOMContentLoaded', function() {
    Lists.define_active_language(true);
    Lists.new_list_creation_access__button.addEventListener('click', Lists.new_list_creation_access);
    for(const button of Lists.quick_access_to_studied_languages__buttons)
        button.addEventListener('click', Lists.define_active_language);
});