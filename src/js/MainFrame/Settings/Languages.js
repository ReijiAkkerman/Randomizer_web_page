import {UserInterface} from "/src/js/UserInterface.js";
import {Git} from "/src/js/MainFrame/Settings/Git.js";

class Languages {
    static selectors = new Map([
        ['Кнопка включения раздела', '.setups-switcher__button_languages'],
        ['Основной раздел', '.languages'],
    ]);



    /** Включение основного раздела */

    static switcher = document.querySelector(Languages.selectors.get('Кнопка включения раздела'));
    static #main_section = document.querySelector(Languages.selectors.get('Основной раздел'));

    static main_section_enabled = false;





    /**
     * Включение основного раздела
     */

    static switch_on() {
        Languages.#enable_main_section();
        Languages.#main_section_button_set_active_color();
    }

    static switch_off() {
        Languages.#disable_main_section();
        Languages.#main_section_button_unset_active_color();
    }

    static #enable_main_section() {
        Languages.#main_section.style.display = '';
        Languages.main_section_enabled = true;
    }

    static #disable_main_section() {
        Languages.#main_section.style.display = 'none';
        Languages.main_section_enabled = false;
    }

    static #main_section_button_set_active_color() {
        Languages.switcher.style.color = UserInterface.text_color;
    }

    static #main_section_button_unset_active_color() {
        Languages.switcher.style.color = '';
    }
}

export {Languages};

document.addEventListener('DOMContentLoaded', function() {
    Languages.switcher.addEventListener('click', Languages.switch_on);
    Languages.switcher.addEventListener('click', Git.switch_off);
});