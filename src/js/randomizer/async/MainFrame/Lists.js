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
    ]);





    static active_language_mark = false;
    static active_row;
    // define_row
    static source_completed = false;
    static translation_completed = false;
    static transcription_completed = false;





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
                element.removeEventListener('keyup', Lists.switch_next_mode_by_enter);
            }
        }
        else {
            document.removeEventListener('keyup', Words.reverse_mode_by_keyup);
            Words.words__area.removeEventListener('click', Words.reverse_mode_by_click);
            let elements = Words.words__area.querySelectorAll('pre');
            for(const element of elements) {
                element.setAttribute('contenteditable', '');
                element.addEventListener('keyup', Lists.switch_next_mode_by_enter);
            }
            WordsTypes.resetSections();
            Words.switch_mode();
            let current_mode = WordsTypes.getShownSectionType();
            let row = document.querySelector(`.words_section[data-type="${current_mode}"] pre[data-id="1"]`);
            row.focus();
            Lists.select_text(row);
        }
    }

    static switch_next_mode_by_enter(event) {
        if(event.code === 'Enter') {
            event.preventDefault();
            Lists.active_row = this.dataset.id;
            for(const element of this.children) {
                let text = this.textContent;
                element.remove();
                this.textContent = text;
            }
            switch(WordsTypes.getShownSectionType()) {
                case 'source':
                    Lists.source_completed = true;
                    break;
                case 'translation':
                    Lists.translation_completed = true;
                    break;
                case 'transcription':
                    Lists.transcription_completed = true;
                    break;
            }
            Words.switch_to_next_mode();
            Lists.focus_on_next_row();
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
        if(Lists.#all_modes_completed())
            Lists.active_row++;
        let current_mode = WordsTypes.getShownSectionType();
        let target_row = document.querySelector(`.words_section[data-type="${current_mode}"] pre[data-id="${Lists.active_row}"]`);
        if(target_row === null) {
            let number_clone = Lists.row_number__template.content.cloneNode(true);
            let row_clone = Lists.row__template.content.cloneNode(true);
            let number = number_clone.querySelector('p');
            let row = row_clone.querySelector('pre');
            number.textContent = Lists.active_row;
            row.dataset.id = Lists.active_row;
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
            row.addEventListener('keyup', Lists.switch_next_mode_by_enter);
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

    static #all_modes_completed() {
        if(
            Lists.source_completed &&
            Lists.translation_completed &&
            Lists.transcription_completed
        ) {
            Lists.source_completed = 
            Lists.translation_completed = 
            Lists.transcription_completed = false;
            return true;
        }
        else return false;
    }

    static select_text(row) {
        let range = document.createRange();
        let selection = window.getSelection();
        range.setStartBefore(row.childNodes[0]);
        range.setEndAfter(row.childNodes[0]);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

export {Lists};

document.addEventListener('DOMContentLoaded', function() {
    Lists.define_active_language(true);
    Lists.new_list_creation_access__button.addEventListener('click', Lists.new_list_creation_access);
    for(const button of Lists.quick_access_to_studied_languages__buttons)
        button.addEventListener('click', Lists.define_active_language);
});