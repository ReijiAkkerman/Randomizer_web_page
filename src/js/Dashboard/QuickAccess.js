import {UserInterface} from '../UserInterface.js';
import {Words} from '../MainFrame/Words.js';
import {CircularQueue} from '../DataStructures/CircularQueue.js';

class QuickAccess {
    static selectors = new Map([
        /** Переключение режима изучения */
        // Исходник
        ['Исходник', '.other-modes__button_source'],
        // Транскрипция 
        ['Транскрипция', '.other-modes__button_transcription'],
        // Перевод
        ['Перевод', '.other-modes__button_translation'],

        /** Кнопки переключения режима изучения */
        ['Кнопки переключения режима изучения', '.other-modes__button'],
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
            QuickAccess.learning_mode_queue.enQueue(this.id);
            switch(this.id) {
                case 'source':
                    QuickAccess.#source_mode_button_set_active_color();
                    Words.source_enable();
                    break;
                case 'transcription':
                    QuickAccess.#transcription_mode_button_set_active_color();
                    Words.transcription_enable();
                    break;
                case 'translation':
                    QuickAccess.#translation_mode_button_set_active_color();
                    Words.translation_enable();
                    break;
            }
            switch(QuickAccess.learning_mode_queue.peek()) {
                case 'source':
                    QuickAccess.#source_mode_button_unset_active_color();
                    Words.source_disable();
                    break;
                case 'transcription':
                    QuickAccess.#transcription_mode_button_unset_active_color();
                    Words.transcription_disable();
                    break;
                case 'translation':
                    QuickAccess.#translation_mode_button_unset_active_color()
                    Words.translation_disable();
                    break;
            }
            QuickAccess.learning_mode_queue.deQueue();
        }
        switch(this.id) {
            case 'source':
                Words.source_enable();
                Words.transcription_disable();
                Words.translation_disable();
                break;
            case 'transcription':
                Words.transcription_enable();
                Words.source_disable();
                Words.translation_disable();
                break;
            case 'translation':
                Words.translation_enable();
                Words.source_disable();
                Words.transcription_disable();
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
}

var quick_access = new QuickAccess();

export {QuickAccess};

document.addEventListener('DOMContentLoaded', function() {
    let elements = document.querySelectorAll(QuickAccess.selectors.get('Кнопки переключения режима изучения'));
    for(const element of elements) {
        element.addEventListener('click', quick_access.switch_learning_mode);
    }
});