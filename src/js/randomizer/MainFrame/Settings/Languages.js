import {UserInterface} from "/src/js/randomizer/UserInterface.js";
import {Git} from "/src/js/randomizer/MainFrame/Settings/Git.js";

class Languages {
    static selectors = new Map([
        /** Включение основного раздела */
        ['Кнопка включения раздела', '.setups-switcher__button_languages'],
        ['Основной раздел', '.languages'],

        /** Включение дополнительного раздела */
        ['Дополнительный раздел', '.languages-add'],

        /** Содержимое основного раздела */
        ['Кнопка выбора основного языка', '.languages-main-language__button'],
        ['Кнопка добавления изучаемого языка', '.languages-additional-languages-list__button_add-language'],
        ['Кнопка редактирования изучаемого языка', '.languages-additional-languages-actions__button_edit-language'],
        ['Кнопки выбора изучаемого языка', '.languages-additional-languages-list__button_studied-language'],

        /** Содержимое дополнительного раздела */
        ['Блок изучаемых языков', '.languages-add-select_recent-languages'],
        ['Блок всех языков', '.languages-add-select_all-languages'],
        ['Заголовок добавления языка', '.languages-add-create__p_add-language'],
        ['Заголовок изменения языка', '.languages-add-create__p_edit-language'],
        ['Кнопка добавления языка', '.languages-add-create__button_add'],
        ['Кнопка изменения языка', '.languages-add-create__button_change'],

        /** Параметры языка */
        ['Поле наименования языка', '.languages-add-create__input_language-name'],
        ['Поле наименования папки языка', '.languages-add-create__input_language-folder'],
        ['Поле сокращенного наименования языка', '.languages-add-create__input_shorthand'],
        ['Метка наличия в языке иероглифов', '#present-kanji'],
    ]);



    /** Работа */

    static #active_language = false;



    /** Включение основного раздела */

    static switcher = document.querySelector(Languages.selectors.get('Кнопка включения раздела'));
    static #main_section = document.querySelector(Languages.selectors.get('Основной раздел'));



    /** Включение дополнительного раздела */

    static additional_section = document.querySelector(Languages.selectors.get('Дополнительный раздел'));



    /** Содержимое основного раздела */

    static main_language_button = document.querySelector(Languages.selectors.get('Кнопка выбора основного языка'));
    static add_learning_language_button = document.querySelector(Languages.selectors.get('Кнопка добавления изучаемого языка'));
    static #svg_of_add_learning_language_button = Languages.add_learning_language_button.firstElementChild;
    static edit_learning_language_button = document.querySelector(Languages.selectors.get('Кнопка редактирования изучаемого языка'));
    static #svg_of_changing_learning_language_button = Languages.edit_learning_language_button.firstElementChild;



    /** Содержимое дополнительного раздела */

    static #learning_languages_block = document.querySelector(Languages.selectors.get('Блок изучаемых языков'));
    static #all_languages_block = document.querySelector(Languages.selectors.get('Блок всех языков'));
    static #adding_language_title = document.querySelector(Languages.selectors.get('Заголовок добавления языка'));
    static #changing_language_title = document.querySelector(Languages.selectors.get('Заголовок изменения языка'));
    static #language_name_field = document.querySelector(Languages.selectors.get('Поле наименования языка'));
    static #language_foldername_field = document.querySelector(Languages.selectors.get('Поле наименования папки языка'));
    static #language_shorthand_mark = document.querySelector(Languages.selectors.get('Поле сокращенного наименования языка'));
    static #language_kanji_mark = document.querySelector(Languages.selectors.get('Метка наличия в языке иероглифов'));
    static #change_language_button = document.querySelector(Languages.selectors.get('Кнопка изменения языка'));;
    static #add_language_button = document.querySelector(Languages.selectors.get('Кнопка добавления языка'));





    /**
     * Включение основного раздела
     */

    static switch_on() {
        Languages.#enable_main_section();
        Languages.#main_section_button_set_active_color();
    }

    static switch_off() {
        Languages.#disable_main_section();
        Languages.disable_additional_section();
        Languages.#deactivate_active_language_button();
        Languages.#active_language = false;
        Languages.#main_section_button_unset_active_color();
    }

    static #enable_main_section() {
        Languages.#main_section.style.display = '';
    }

    static #disable_main_section() {
        Languages.#main_section.style.display = 'none';
    }

    static #main_section_button_set_active_color() {
        Languages.switcher.style.color = UserInterface.text_color;
    }

    static #main_section_button_unset_active_color() {
        Languages.switcher.style.color = '';
    }



    /**
     * Включение дополнительного раздела
     */

    static enable_additional_section() {
        Languages.additional_section.style.display = '';
    }

    static disable_additional_section() {
        Languages.additional_section.style.display = 'none';
    }



    /**
     * Содержимое основного раздела
     */

    static choose_main_language() {
        const enable_set = () => {
            Languages.#main_language_button_set_active_color();
            Languages.#enable_learning_languages_block();
            Languages.enable_all_languages_block();
            Languages.enable_adding_language_title();
            // Languages.complete_fields(this);
            Languages.enable_additional_section();
            Languages.write_language_data(this);
            Languages.#show_add_button();
        };
        if(Languages.#active_language === false) {
            enable_set();
        }
        else if(Languages.#active_language.id !== this.id) {
            Languages.#deactivate_active_language_button();
            enable_set();
        }
        else {
            Languages.#deactivate_active_language_button();
            Languages.#active_language = false;
        }
    }

    static #main_language_button_set_active_color() {
        Languages.main_language_button.style.color = UserInterface.text_color;
        Languages.main_language_button.style.borderColor = UserInterface.text_color;
    }

    static #main_language_button_unset_active_color() {
        Languages.main_language_button.style.color = '';
        Languages.main_language_button.style.borderColor = '';
    }

    static select_learning_language() {
        const enable_set = () => {
            Languages.#change_learning_language_button_set_active_color(this);
            Languages.write_language_data(this);
        };
        if(Languages.#active_language === false) {
            enable_set();
        }
        else if(Languages.#active_language.id !== this.id) {
            Languages.#deactivate_active_language_button();
            enable_set();
        }
        else {
            Languages.#deactivate_active_language_button();
            Languages.#active_language = false;
        }
    }

    static #change_learning_language_button_set_active_color(obj) {
        obj.style.color = UserInterface.text_color;
    }

    static #change_learning_language_button_unset_active_color(obj) {
        obj.style.color = '';
    }

    static add_learning_language() {
        const enable_set = () => {
            Languages.#add_learning_language_button_set_active_color();
            Languages.enable_all_languages_block();
            Languages.enable_adding_language_title();
            Languages.complete_fields(this);
            Languages.enable_additional_section();
            Languages.write_language_data(this);
            Languages.#show_add_button();
        };
        if(Languages.#active_language === false) {
            enable_set();
        }
        else if(Languages.#active_language.id !== this.id) {
            Languages.#deactivate_active_language_button();
            enable_set();
        }
        else {
            Languages.#deactivate_active_language_button();
            Languages.#active_language = false;
        }
    }

    static #add_learning_language_button_set_active_color() {
        Languages.#svg_of_add_learning_language_button.style.fill = UserInterface.text_color;
    }

    static #add_learning_language_button_unset_active_color() {
        Languages.#svg_of_add_learning_language_button.style.fill = '';
    }

    static edit_learning_language() {
        if(Languages.#active_language && Languages.#active_language.type === 'learning') {
            Languages.#editing_learning_language_button_set_active_color();
            Languages.enable_all_languages_block();
            Languages.#enable_changing_language_title();
            Languages.complete_fields(Languages.#active_language);
            Languages.enable_additional_section();
            Languages.#show_change_button();
        }
    }

    static #editing_learning_language_button_set_active_color() {
        Languages.edit_learning_language_button.style.borderColor = UserInterface.text_color;
        Languages.#svg_of_changing_learning_language_button.style.fill = UserInterface.text_color;
    }

    static #editing_learning_language_button_unset_active_color() {
        Languages.edit_learning_language_button.style.borderColor = '';
        Languages.#svg_of_changing_learning_language_button.style.fill = '';
    }

    static #deactivate_active_language_button() {
        if(Languages.#active_language) {
            let button = document.querySelector(`#${Languages.#active_language.id}`);
            switch(button.dataset.language_type) {
                case 'main':
                    Languages.#main_language_button_unset_active_color();
                    break;
                case 'learning':
                    Languages.#change_learning_language_button_unset_active_color(button);
                    break;
                case 'new':
                    Languages.#add_learning_language_button_unset_active_color();
                    break;
            }
            Languages.#clear_fields();
            Languages.#disable_learning_languages_block();
            Languages.disable_all_languages_block();
            Languages.disable_adding_language_title();
            Languages.#disable_changing_language_title();
            Languages.disable_additional_section();
            Languages.#editing_learning_language_button_unset_active_color();
        }
    }



    /**
     * Содержимое дополнительного раздела
     */

    static #enable_learning_languages_block() {
        Languages.#learning_languages_block.style.display = '';
    }

    static #disable_learning_languages_block() {
        Languages.#learning_languages_block.style.display = 'none';
    }

    static enable_all_languages_block() {
        Languages.#all_languages_block.style.display = '';
    }

    static disable_all_languages_block() {
        Languages.#all_languages_block.style.display = 'none';
    }

    static enable_adding_language_title() {
        Languages.#adding_language_title.style.display = '';
    }

    static disable_adding_language_title() {
        Languages.#adding_language_title.style.display = 'none';
    }

    static #enable_changing_language_title() {
        Languages.#changing_language_title.style.display = '';
    }

    static #disable_changing_language_title() {
        Languages.#changing_language_title.style.display = 'none';
    }

    static #show_add_button() {
        Languages.#change_language_button.style.display = 'none';
        Languages.#add_language_button.style.display = '';
    }

    static #show_change_button() {
        Languages.#add_language_button.style.display = 'none';
        Languages.#change_language_button.style.display = '';
    }

    // Методы заполнения полей

    static complete_fields(obj) {
        Languages.#complete_language_name(obj);
        Languages.#complete_language_foldername(obj);
        Languages.#complete_language_shorthand_mark(obj);
        Languages.#complete_language_kanji_mark(obj);
    }

    static #complete_language_name(obj) {
        if(Languages.#active_language === obj)
            Languages.#language_name_field.value = obj.name;
        else
            Languages.#language_name_field.value = obj.dataset.language;
    }

    static #complete_language_foldername(obj) {
        if(Languages.#active_language === obj)
            Languages.#language_foldername_field.value = obj.foldername;
        else
            Languages.#language_foldername_field.value = obj.dataset.folder;
    }

    static #complete_language_shorthand_mark(obj) {
        if(Languages.#active_language === obj)
            Languages.#language_shorthand_mark.value = obj.shortnand;
        else
            Languages.#language_shorthand_mark.value = obj.dataset.mark;
    }

    static #complete_language_kanji_mark(obj) {
        if(Languages.#active_language === obj)
            Languages.#language_kanji_mark.checked = !!obj.kanji;
        else
            Languages.#language_kanji_mark.checked = !!obj.dataset.kanji;
    }

    // Методы очистки полей

    static #clear_fields() {
        Languages.#clear_language_name();
        Languages.#clear_language_foldername();
        Languages.#clear_language_shorthand_mark();
        Languages.#clear_language_kanji_mark();
    }

    static #clear_language_name() {
        Languages.#language_name_field.value = '';
    }

    static #clear_language_foldername() {
        Languages.#language_foldername_field.value = '';
    }

    static #clear_language_shorthand_mark() {
        Languages.#language_shorthand_mark.value = '';
    }

    static #clear_language_kanji_mark() {
        Languages.#language_kanji_mark.checked = false;
    }



    /** 
     * Вспомогательные функции
     */

    static write_language_data(obj) {
        Languages.#active_language = {};
        Languages.#active_language.name = obj.dataset.language;
        Languages.#active_language.foldername = obj.dataset.folder;
        Languages.#active_language.shortnand = obj.dataset.mark;
        Languages.#active_language.kanji = obj.dataset.kanji;
        Languages.#active_language.type = obj.dataset.language_type;
        Languages.#active_language.id = obj.id;
    }
}

export {Languages};

document.addEventListener('DOMContentLoaded', function() {
    Languages.switcher.addEventListener('click', Languages.switch_on);
    Languages.switcher.addEventListener('click', Git.switch_off);
    Languages.main_language_button.addEventListener('click', Languages.choose_main_language);
    let elements = document.querySelectorAll(Languages.selectors.get('Кнопки выбора изучаемого языка'));
    for(const element of elements) {
        element.addEventListener('click', Languages.select_learning_language);
    }
    Languages.add_learning_language_button.addEventListener('click', Languages.add_learning_language);
    Languages.edit_learning_language_button.addEventListener('click', Languages.edit_learning_language);
});