import {UserInterface} from '../UserInterface.js';
import {Words} from '../MainFrame/Words.js';
import {CircularQueue} from '../DataStructures/CircularQueue.js';

class QuickAccess {
    static selectors = new Map([
        /** Переключение режима изучения */
        // Исходник
        ['Исхоник', '.other-modes__button_source'],
        // Транскрипция 
        ['Транскрипция', '.other-modes__button_transcription'],
        // Перевод
        ['Перевод', '.other-modes__button_translation'],
    ]);



    /**
     * Переключение режима изучения
     */

    static learning_mode_queue = new CircularQueue(3, 'translation', ['transcription', 'source']);

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
     * Переключение режима изучения
     */

    switch_learning_mode() {
        if(this.id === QuickAccess.learning_mode_queue.lastDeQueuedElement) {
            switch(this.id) {
                case 'source':
                    break;
                case 'transcription':
                    break;
                case 'translation':
                    break;
            }
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
}