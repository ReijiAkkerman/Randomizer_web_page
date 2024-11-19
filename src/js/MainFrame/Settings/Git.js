import {UserInterface} from "/src/js/UserInterface.js";
import {Languages} from "/src/js/MainFrame/Settings/Languages.js";

class Git {
    static selectors = new Map([
        ['Кнопка включения раздела', '.setups-switcher__button_git'],
        ['Основной раздел', '.git'],

        /** Папки и соответствующие им языки */
        ['Кнопки выбора языка', '.git-lang-folders-langnames__button'],
    ]);



    /** Включение основного раздела */

    static switcher = document.querySelector(Git.selectors.get('Кнопка включения раздела'));
    static #main_section = document.querySelector(Git.selectors.get('Основной раздел'));



    /** Папки и соответствующие им языки */
    // Работа
    static #selected_language = false;
    




    /**
     * Включение основного раздела
     */

    static switch_on() {
        Git.#enable_main_section();
        Git.#main_section_button_set_active_color();
    }

    static switch_off() {
        Git.#disable_main_section();
        Git.#main_section_button_unset_active_color();
        Git.#disable_language_selection();
        Git.#selected_language = false;
    }

    static #enable_main_section() {
        Git.#main_section.style.display = '';
    }

    static #disable_main_section() {
        Git.#main_section.style.display = 'none';
    }

    static #main_section_button_set_active_color() {
        Git.switcher.style.color = UserInterface.text_color;
    }

    static #main_section_button_unset_active_color() {
        Git.switcher.style.color = '';
    }



    /**
     * Папки и соответствующие им языки
     */

    static select_language() {
        if(Git.#selected_language === false) {
            Git.#enable_language_selection(this);
            Git.#selected_language = this.dataset.language;
        }
        else if(Git.#selected_language !== this.dataset.language) {
            Git.#select_language_button_unset_active_color();
            Git.#select_language_button_set_active_color(this);
            Git.#selected_language = this.dataset.language;
        }
        else {
            Git.#disable_language_selection();
            Git.#selected_language = false;
        }
    }

    static #enable_language_selection(obj) {
        Languages.additional_section.style.gridRow = '2/3';
        Languages.enable_all_languages_block();
        Languages.enable_adding_language_title();
        Languages.enable_additional_section();
        Git.#select_language_button_set_active_color(obj);
    }

    static #disable_language_selection() {
        Languages.disable_additional_section();
        Languages.disable_all_languages_block();
        Languages.disable_adding_language_title();
        Languages.additional_section.style.gridRow = '';
        Git.#select_language_button_unset_active_color();
    }

    static #select_language_button_set_active_color(obj) {
        obj.style.color = UserInterface.text_color;
        obj.style.borderColor = UserInterface.text_color;
    }

    static #select_language_button_unset_active_color() {
        let button = document.querySelector(Git.selectors.get('Кнопки выбора языка') + `[data-language="${Git.#selected_language}"]`);
        button.style.color = '';
        button.style.borderColor = '';
    }
}

export {Git};

document.addEventListener('DOMContentLoaded', function() {
    Git.switcher.addEventListener('click', Git.switch_on);
    Git.switcher.addEventListener('click', Languages.switch_off);
    let elements = document.querySelectorAll(Git.selectors.get('Кнопки выбора языка'));
    for(const element of elements) {
        element.addEventListener('click', Git.select_language);
    }
});