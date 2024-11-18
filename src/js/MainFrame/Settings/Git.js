import {UserInterface} from "/src/js/UserInterface.js";
import {Languages} from "/src/js/MainFrame/Settings/Languages.js";

class Git {
    static selectors = new Map([
        ['Кнопка включения раздела', '.setups-switcher__button_git'],
        ['Основной раздел', '.git'],
    ]);



    /** Включение основного раздела */

    static switcher = document.querySelector(Git.selectors.get('Кнопка включения раздела'));
    static #main_section = document.querySelector(Git.selectors.get('Основной раздел'));
    




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
}

export {Git};

document.addEventListener('DOMContentLoaded', function() {
    Git.switcher.addEventListener('click', Git.switch_on);
    Git.switcher.addEventListener('click', Languages.switch_off);
});