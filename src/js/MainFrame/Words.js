import {QuickAccess} from "../Dashboard/QuickAccess.js";

class Words {
    static selectors = new Map([
        ['Исходник', '.source'],
        ['Транскрипция', '.transcription'],
        ['Перевод', '.translation'],

        ['Область слов', '.words'],
    ]);



    static #reversed_mode_enabled = false;



    // Исходник

    static source = document.querySelector(Words.selectors.get('Исходник'));

    // Транскрипция

    static transcription = document.querySelector(Words.selectors.get('Транскрипция'));

    // Перевод

    static translation = document.querySelector(Words.selectors.get('Перевод'));





    static reverse_mode_by_keyup(event) {
        if(event.code === 'Space') {
            event.preventDefault();
            Words.#reverse_mode();
        }
    }

    static reverse_mode_by_click() {
        Words.#reverse_mode();
    }

    static #reverse_mode() {
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
}

export {Words};

document.addEventListener('DOMContentLoaded', function() {
    let element = document.querySelector(Words.selectors.get('Область слов'));
    element.addEventListener('click', Words.reverse_mode_by_click);
});

document.addEventListener('keyup', Words.reverse_mode_by_keyup);