import {QuickAccess} from "/src/js/randomizer/Dashboard/QuickAccess.js";
import {Adaptive} from "/src/js/randomizer/Adaptive.js";
import {WordsTypes} from '/src/js/randomizer/DataStructures/WordsTypes.js';

class Words {
    static selectors = new Map([
        ['Исходник', '.source'],
        ['Транскрипция', '.transcription'],
        ['Перевод', '.translation'],

        ['Область слов', '.words'],
    ]);



    static #reversed_mode_enabled = false;
    static words__area = document.querySelector(Words.selectors.get('Область слов'));



    // Исходник

    static source = document.querySelector(Words.selectors.get('Исходник'));

    // Транскрипция

    static transcription = document.querySelector(Words.selectors.get('Транскрипция'));

    // Перевод

    static translation = document.querySelector(Words.selectors.get('Перевод'));



    /** 
     * Отображение раздела 
     */

    static main_section = document.querySelector(Words.selectors.get('Область слов'));





    static reverse_mode_by_keyup(event) {
        if(event.code === 'Space') {
            event.preventDefault();
            Words.reverse_mode();
        }
    }

    static reverse_mode_by_click() {
        Words.reverse_mode();
    }

    static reverse_mode() {
        WordsTypes.switchActiveSectionIndex();
        Words.switch_mode();
    }

    static switch_to_next_mode() {
        WordsTypes.incrementActiveSectionIndex();
        Words.switch_mode();
        QuickAccess.set_active_colors_for_modes(true);
        QuickAccess.unset_active_colors_for_modes();
    }

    static switch_mode() {
        switch(WordsTypes.getShownSectionType()) {
            case 'source':
                Words.translation_disable();
                Words.transcription_disable();
                Words.source_enable();
                break;
            case 'translation':
                Words.source_disable();
                Words.transcription_disable();
                Words.translation_enable();
                break;
            case 'transcription':
                Words.source_disable();
                Words.translation_disable();
                Words.transcription_enable();
                break;
        }
    }

    // не используется
    static reverse_mode1() {
        if(Words.#reversed_mode_enabled) {
            switch(QuickAccess.learning_mode_queue.peek()) {
                case 'source':
                    Words.source_disable();
                    break;
                case 'transcription':
                    Words.transcription_disable();
                    break;
                case 'translation':
                    Words.translation_disable();
                    break;
            }
            switch(QuickAccess.learning_mode_queue.nowSelected) {
                case 'source':
                    Words.source_enable();
                    break;
                case 'transcription':
                    Words.transcription_enable();
                    break;
                case 'translation':
                    Words.translation_enable();
                    break;
            }
            Words.#reversed_mode_enabled = false;
        }
        else {
            switch(QuickAccess.learning_mode_queue.nowSelected) {
                case 'source':
                    Words.source_disable();
                    break;
                case 'transcription':
                    Words.transcription_disable();
                    break;
                case 'translation':
                    Words.translation_disable();
                    break;
            }
            switch(QuickAccess.learning_mode_queue.peek()) {
                case 'source':
                    Words.source_enable();
                    break;
                case 'transcription':
                    Words.transcription_enable();
                    break;
                case 'translation':
                    Words.translation_enable();
                    break;
            }
            Words.#reversed_mode_enabled = true;
        }
    }

    
    
    // Исходник

    static source_enable() {
        Words.source.style.display = '';
    }

    static source_disable() {
        Words.source.style.display = 'none';
    }



    // Транскрипция 

    static transcription_enable() {
        Words.transcription.style.display = '';
    }

    static transcription_disable() {
        Words.transcription.style.display = 'none';
    }



    // Перевод

    static translation_enable() {
        Words.translation.style.display = '';
    }

    static translation_disable() {
        Words.translation.style.display = 'none';
    }



    /**
     * Отображение раздела
     */

    static show_section() {
        Adaptive.remember_words_window();
        Words.main_section.style.display = '';
    }

    static hide_section() {
        Words.main_section.style.display = 'none';
    }
}

export {Words};

document.addEventListener('DOMContentLoaded', function() {
    Words.words__area.addEventListener('click', Words.reverse_mode_by_click);
});

document.addEventListener('keyup', Words.reverse_mode_by_keyup);