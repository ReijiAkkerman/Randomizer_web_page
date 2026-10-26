import {UserInterface} from '/src/js/randomizer/UserInterface.js';
import {Words} from '/src/js/randomizer/MainFrame/Words.js';
import {Settings} from '/src/js/randomizer/MainFrame/Settings.js';
import {Guide} from '/src/js/randomizer/MainFrame/Guide.js';
import {CircularQueue} from '/src/js/randomizer/DataStructures/CircularQueue.js';
import {WordsTypes} from '/src/js/randomizer/DataStructures/WordsTypes.js';

class QuickAccess {
    static selectors = new Map([
        /** Кнопки переключения режима изучения */
        ['Кнопки переключения режима изучения', '.other-modes__button'],
        // Исходник
        ['Исходник', '.other-modes__button_source'],
        // Транскрипция 
        ['Транскрипция', '.other-modes__button_transcription'],
        // Перевод
        ['Перевод', '.other-modes__button_translation'],

        /** Кнопки стороннего функционала */
        ['Кнопки стороннего функционала', '.other-utilities__button'],
        ['Кнопка настроек', '.other-utilities__button_settings'],
        ['Кнопка руководства', '.other-utilities__button_guide'],
    ]);



    /**
     * Переключение режима изучения
     */

    static learning_mode_queue = new CircularQueue(3, 'translation', ['transcription', 'source']);
    static functionality = 'words';

    // Исходник

    static #source_mode_button = document.querySelector(QuickAccess.selectors.get('Исходник'));
    static #svg_of_source_mode_button = QuickAccess.#source_mode_button.firstElementChild;

    // Транскрипция

    static #transcription_mode_button = document.querySelector(QuickAccess.selectors.get('Транскрипция'));
    static #svg_of_transcription_mode_button = QuickAccess.#transcription_mode_button.firstElementChild;

    // Перевод

    static #translation_mode_button = document.querySelector(QuickAccess.selectors.get('Перевод'));
    static #svg_of_translation_mode_button = QuickAccess.#translation_mode_button.firstElementChild;

    /**
     * Кнопки стороннего функционала
     */

    // Кнопка настроек 

    static #settings_button = document.querySelector(QuickAccess.selectors.get('Кнопка настроек'));
    static #svg_of_settings_button = QuickAccess.#settings_button.firstElementChild;

    // Кнопка руководства

    static #guide_button = document.querySelector(QuickAccess.selectors.get('Кнопка руководства'));
    static #svg_of_guide_button = QuickAccess.#guide_button.firstElementChild;





    /**
     * Переключение режима изучения
     */

    switch_learning_mode() {
        WordsTypes.setActiveSectionIndex(this);
        Words.switch_mode();
        QuickAccess.set_active_colors_for_modes();
        QuickAccess.unset_active_colors_for_modes();
    }

    static set_active_colors_for_modes(for_hidden_too = false) {
        switch(WordsTypes.getShownSectionType()) {
            case 'source':
                QuickAccess.#source_mode_button_set_active_color();
                break;
            case 'translation':
                QuickAccess.#translation_mode_button_set_active_color();
                break;
            case 'transcription':
                QuickAccess.#transcription_mode_button_set_active_color();
                break;
        }
        if(for_hidden_too === true) {
            switch(WordsTypes.getHiddenSectionType()) {
                case 'source':
                QuickAccess.#source_mode_button_set_active_color();
                break;
            case 'translation':
                QuickAccess.#translation_mode_button_set_active_color();
                break;
            case 'transcription':
                QuickAccess.#transcription_mode_button_set_active_color();
                break;
            }
        }
    }

    static unset_active_colors_for_modes() {
        switch(WordsTypes.getDisabledSectionType()) {
            case 'source':
                QuickAccess.#source_mode_button_unset_active_color();
                break;
            case 'translation':
                QuickAccess.#translation_mode_button_unset_active_color();
                break;
            case 'transcription':
                QuickAccess.#transcription_mode_button_unset_active_color();
                break;
        }
    }



    // Исходник

    static #source_mode_button_set_active_color() {
        QuickAccess.#svg_of_source_mode_button.style.fill = UserInterface.language_learning_mode_text_color;
    }

    static #source_mode_button_unset_active_color() {
        QuickAccess.#svg_of_source_mode_button.style.fill = '';
    }



    // Транскрипция

    static #transcription_mode_button_set_active_color() {
        QuickAccess.#svg_of_transcription_mode_button.style.stroke = UserInterface.language_learning_mode_text_color;
    }

    static #transcription_mode_button_unset_active_color() {
        QuickAccess.#svg_of_transcription_mode_button.style.stroke = '';
    }



    // Перевод

    static #translation_mode_button_set_active_color() {
        QuickAccess.#svg_of_translation_mode_button.style.fill = UserInterface.language_learning_mode_text_color;
    }

    static #translation_mode_button_unset_active_color() {
        QuickAccess.#svg_of_translation_mode_button.style.fill = '';
    }



    /**
     * Кнопки стороннего функционала
     */

    change_functionality() {
        switch(QuickAccess.functionality) {
            case 'words':
                Words.hide_section();
                break;
            case 'settings':
                Settings.hide_section();
                QuickAccess.settings_button_unset_active_color();
                break;
            case 'guide':
                Guide.hide_section();
                QuickAccess.#guide_button_unset_active_color();
                break;
        }
        if(QuickAccess.functionality !== this.id) {
            switch(this.id) {
                case 'settings':
                    Settings.show_section();
                    QuickAccess.#settings_button_set_active_color();
                    break;
                case 'guide':
                    Guide.show_section();
                    QuickAccess.#guide_button_set_active_color();
                    break;
            }
            QuickAccess.functionality = this.id;
        }
        else {
            QuickAccess.functionality = 'words';
            Words.show_section();
        }
    }



    // Кнопка настроек

    static #settings_button_set_active_color() {
        QuickAccess.#settings_button.style.borderColor = UserInterface.text_color;
        QuickAccess.#svg_of_settings_button.style.fill = UserInterface.text_color;
    }

    static settings_button_unset_active_color() {
        QuickAccess.#settings_button.style.borderColor = '';
        QuickAccess.#svg_of_settings_button.style.fill = '';
    }



    // Кнопка руководства

    static #guide_button_set_active_color() {
        QuickAccess.#guide_button.style.borderColor = UserInterface.text_color;
        QuickAccess.#svg_of_guide_button.style.fill = UserInterface.text_color;
    }

    static #guide_button_unset_active_color() {
        QuickAccess.#guide_button.style.borderColor = '';
        QuickAccess.#svg_of_guide_button.style.fill = '';
    }
}

var quick_access = new QuickAccess();

export {QuickAccess};

document.addEventListener('DOMContentLoaded', function() {
    let elements = document.querySelectorAll(QuickAccess.selectors.get('Кнопки переключения режима изучения'));
    for(const element of elements) {
        element.addEventListener('click', quick_access.switch_learning_mode);
    }
    elements = document.querySelectorAll(QuickAccess.selectors.get('Кнопки стороннего функционала'));
    for(const element of elements) {
        element.addEventListener('click', quick_access.change_functionality);
    }
});