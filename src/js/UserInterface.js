import {CircularQueue} from './DataStructures/CircularQueue.js';

class UserInterface {
    static text_color = '#000';
    static selected_text_color ='#00f';

    static selectors = new Map([
        ['Панель настроек', '.settings'],
        ['Кнопка закрытия настроек', '.theme_close-settings'],
        ['Кнопка настроек', '.other-utilities__button_settings'],
        ['Кнопка раздела языковых настроек', '.setups-switcher__button_languages'],
        ['Кнопка раздела настроек Git', '.setups-switcher__button_git'],
        ['Раздел языковых настроек', '.languages'],
        ['Раздел дополнительных опций языковых настроек', '.languages-add'],
        ['Раздел настроек Git', '.git'],
        ['Кнопка открытия дополнительных опций языковых настроек', '.languages-additional-languages-list__button_add-language'],
        ['"Добавить новый язык"', '.languages-add-create__p_add-language'],
        ['"Изменить параметры языка"', '.languages-add-create__p_edit-language'],
        ['Метка существующего языка', '.existent-language'],
        ['Панель слов', '.words'],
        ['Исходные значения слов', '.source'],
        ['Перевод слов', '.translation'],
        ['Чтения слов', '.transcription'],
        ['Панель руководства', '.guide'],
        ['Кнопка руководства', '.other-utilities__button_guide'],
        ['Кнопка включения исходников', '.other-modes__button_source'],
        ['Кнопка включения переводов', '.other-modes__button_translation'],
        ['Кнопка включения чтений', '.other-modes__button_transcription'],
        ['Кнопки переключения режимов', '.other-modes__button'],
    ]);

    static settings_button_enabled = false;
    static guide_button_enabled = false;

    static kanji_mode_enabled = true;

    static source_mode_enabled = true;
    static translation_mode_enabled = false;
    static transcription_mode_enabled = true;
    static mode_switcher_clicks_after_reload = 0;
    static mode_switcher_queue;

    static close_settings() {
        let settings_panel = document.querySelector(UserInterface.selectors.get('Панель настроек'));
        settings_panel.style.display = 'none';
        UserInterface.#set_default_colors_to_settings_button();
        UserInterface.settings_button_enabled = false;
    }

    static #open_settings() {
        let settings_panel = document.querySelector(UserInterface.selectors.get('Панель настроек'));
        settings_panel.style.display = '';
        UserInterface.#set_active_colors_to_settings_button();
        UserInterface.settings_button_enabled = true;
    }

    static #set_default_colors_to_settings_button() {
        let settings_button = document.querySelector(UserInterface.selectors.get('Кнопка настроек'));
        let svg_of_settings_button = settings_button.firstElementChild;
        settings_button.style.borderColor = '';
        svg_of_settings_button.style.fill = '';
    }

    static #set_active_colors_to_settings_button() {
        let settings_button = document.querySelector(UserInterface.selectors.get('Кнопка настроек'));
        let svg_of_settings_button = settings_button.firstElementChild;
        settings_button.style.borderColor = UserInterface.text_color;
        svg_of_settings_button.style.fill = UserInterface.text_color;
    }

    static settings_button() {
        if(UserInterface.settings_button_enabled) {
            UserInterface.close_settings();
            UserInterface.open_words_panel();
        }
        else {
            if(UserInterface.guide_button_enabled)
                UserInterface.close_guide();
            else 
                UserInterface.#close_words_panel();
            UserInterface.#open_settings();
        }
    }

    static close_guide() {
        let guide_panel = document.querySelector(UserInterface.selectors.get('Панель руководства'));
        guide_panel.style.display = 'none';
        UserInterface.#set_default_colors_to_guide_button();
        UserInterface.guide_button_enabled = false;
    }

    static #open_guide() {
        let guide_panel = document.querySelector(UserInterface.selectors.get('Панель руководства'));
        guide_panel.style.display = '';

        UserInterface.#set_active_colors_to_guide_button();
        UserInterface.guide_button_enabled = true;
    }

    static #set_default_colors_to_guide_button() {
        let guide_button = document.querySelector(UserInterface.selectors.get('Кнопка руководства'));
        let svg_of_guide_button = guide_button.firstElementChild;
        guide_button.style.borderColor = '';
        svg_of_guide_button.style.fill = '';
    }

    static #set_active_colors_to_guide_button() {
        let guide_button = document.querySelector(UserInterface.selectors.get('Кнопка руководства'));
        let svg_of_guide_button = guide_button.firstElementChild;
        guide_button.style.borderColor = UserInterface.text_color;
        svg_of_guide_button.style.fill = UserInterface.text_color;
    }

    static guide_button() {
        if(UserInterface.guide_button_enabled) {
            UserInterface.close_guide();
            UserInterface.open_words_panel();
        }
        else {
            if(UserInterface.settings_button_enabled) 
                UserInterface.close_settings();
            else 
                UserInterface.#close_words_panel();
            UserInterface.#open_guide();
        }
    }

    static switch_settings_to_languages() {
        let languages_button = document.querySelector(UserInterface.selectors.get('Кнопка раздела языковых настроек'));
        let git_button = document.querySelector(UserInterface.selectors.get('Кнопка раздела настроек Git'));
        let languages_section = document.querySelector(UserInterface.selectors.get('Раздел языковых настроек'));
        let git_section = document.querySelector(UserInterface.selectors.get('Раздел настроек Git'));
        git_button.style.color = '';
        git_section.style.display = 'none';
        languages_button.style.color = UserInterface.text_color;
        languages_section.style.display = '';
    }

    static switch_settings_to_git() {
        let languages_button = document.querySelector(UserInterface.selectors.get('Кнопка раздела языковых настроек'));
        let git_button = document.querySelector(UserInterface.selectors.get('Кнопка раздела настроек Git'));
        let languages_section = document.querySelector(UserInterface.selectors.get('Раздел языковых настроек'));
        let git_section = document.querySelector(UserInterface.selectors.get('Раздел настроек Git'));
        languages_button.style.color = '';
        languages_section.style.display = 'none';
        git_button.style.color = UserInterface.text_color;
        git_section.style.display = '';
        UserInterface.close_languages_additional_options();
    }

    static open_languages_additional_options() {
        let additional_options_section = document.querySelector(UserInterface.selectors.get('Раздел дополнительных опций языковых настроек'));
        additional_options_section.style.display = '';
    }

    static close_languages_additional_options() {
        let additional_options_section = document.querySelector(UserInterface.selectors.get('Раздел дополнительных опций языковых настроек'));
        additional_options_section.style.display = 'none';
    }

    static set_editing_language_header() {
        let hiding_header = document.querySelector(UserInterface.selectors.get('"Добавить новый язык"'));
        let exposing_header = document.querySelector(UserInterface.selectors.get('"Изменить параметры языка"'));
        hiding_header.style.display = 'none';
        exposing_header.style.display = '';
    }

    static set_adding_language_header() {
        let hiding_header = document.querySelector(UserInterface.selectors.get('"Изменить параметры языка"'));
        let exposing_header = document.querySelector(UserInterface.selectors.get('"Добавить новый язык"'));
        hiding_header.style.display = 'none';
        exposing_header.style.display = '';
    }

    static #close_words_panel() {
        let words_panel = document.querySelector(UserInterface.selectors.get('Панель слов'));
        words_panel.style.display = 'none';
    }

    static open_words_panel() {
        let words_panel = document.querySelector(UserInterface.selectors.get('Панель слов'));
        words_panel.style.display = '';
    }

    static #enable_source_mode() {
        let source = document.querySelector(UserInterface.selectors.get('Исходные значения слов'));
        source.style.display = '';
        UserInterface.source_mode_enabled = true;
    }

    static #enable_translation_mode() {
        let translation = document.querySelector(UserInterface.selectors.get('Перевод слов'));
        translation.style.display = '';
        UserInterface.translation_mode_enabled = true;
    }

    static #enable_transcription_mode() {
        let transcription = document.querySelector(UserInterface.selectors.get('Чтения слов'));
        transcription.style.display = '';
        UserInterface.transcription_mode_enabled = true;
    }

    static #disable_source_mode() {
        let source = document.querySelector(UserInterface.selectors.get('Исходные значения слов'));
        source.style.display = 'none';
        UserInterface.source_mode_enabled = false;
    }

    static #disable_translation_mode() {
        let translation = document.querySelector(UserInterface.selectors.get('Перевод слов'));
        translation.style.display = 'none';
        UserInterface.translation_mode_enabled = false;
    }

    static #disable_transcription_mode() {
        let transcription = document.querySelector(UserInterface.selectors.get('Чтения слов'));
        transcription.style.display = 'none';
        UserInterface.transcription_mode_enabled = false;
    }

    static #set_default_colors_to_source_mode_button() {
        let source_button = document.querySelector(UserInterface.selectors.get('Кнопка включения исходников'));
        let svg_of_source_button = source_button.firstElementChild;
        svg_of_source_button.style.fill = '';
    }

    static #set_default_colors_to_translation_mode_button() {
        let translation_button = document.querySelector(UserInterface.selectors.get('Кнопка включения переводов'));
        let svg_of_translation_button = translation_button.firstElementChild;
        svg_of_translation_button.style.fill = '';
    }

    static #set_default_colors_to_transcription_mode_button() {
        let transcription_button = document.querySelector(UserInterface.selectors.get('Кнопка включения чтений'));
        let svg_of_transcription_button = transcription_button.firstElementChild;
        svg_of_transcription_button.style.stroke = '';
    }

    static #set_active_colors_to_source_mode_button() {
        let source_button = document.querySelector(UserInterface.selectors.get('Кнопка включения исходников'));
        let svg_of_source_button = source_button.firstElementChild;
        svg_of_source_button.style.fill = UserInterface.selected_text_color;
    }

    static #set_active_colors_to_translation_mode_button() {
        let translation_button = document.querySelector(UserInterface.selectors.get('Кнопка включения переводов'));
        let svg_of_translation_button = translation_button.firstElementChild;
        svg_of_translation_button.style.fill = UserInterface.selected_text_color;
    }

    static #set_active_colors_to_transcription_mode_button() {
        let transcription_button = document.querySelector(UserInterface.selectors.get('Кнопка включения чтений'));
        let svg_of_transcription_button = transcription_button.firstElementChild;
        svg_of_transcription_button.style.stroke = UserInterface.selected_text_color;
    }

    mode_switcher_buttons() {
        if(UserInterface.mode_switcher_clicks_after_reload === 0)
            UserInterface.mode_switcher_queue = new CircularQueue(3, 'translation-mode_button', ['source-mode_button', 'transcription-mode_button']);
        if(this.id === UserInterface.mode_switcher_queue.lastDeQueuedElement) {
            /**
             * включает соответствующую нажатию кнопку
             * и соответствующий ей раздел изучения слов
             */
            switch(this.id) {   
                case 'source-mode_button':
                    UserInterface.mode_switcher_queue.enQueue(this.id);
                    UserInterface.source_mode_enabled = true;
                    UserInterface.#set_active_colors_to_source_mode_button();
                    break;
                case 'translation-mode_button':
                    UserInterface.mode_switcher_queue.enQueue(this.id);
                    UserInterface.translation_mode_enabled = true;
                    UserInterface.#set_active_colors_to_translation_mode_button();
                    break;
                case 'transcription-mode_button':
                    UserInterface.mode_switcher_queue.enQueue(this.id);
                    UserInterface.transcription_mode_enabled = true;
                    UserInterface.#set_active_colors_to_transcription_mode_button();
                    break;
            }
            /**
             * выключает первую в очереди на выход кнопку
             * и соответствующий ей раздел
             * 
             * P.S. Очередь нужна только чтобы показывать 
             * какая кнопка является неактивной
             */
            switch(UserInterface.mode_switcher_queue.peek()) {
                case 'source-mode_button':
                    UserInterface.source_mode_enabled = false;
                    UserInterface.#set_default_colors_to_source_mode_button();
                    UserInterface.mode_switcher_queue.deQueue();
                    break;
                case 'translation-mode_button':
                    UserInterface.translation_mode_enabled = false;
                    UserInterface.#set_default_colors_to_translation_mode_button();
                    UserInterface.mode_switcher_queue.deQueue();
                    break;
                case 'transcription-mode_button':
                    UserInterface.transcription_mode_enabled = false;
                    UserInterface.#set_default_colors_to_transcription_mode_button();
                    UserInterface.mode_switcher_queue.deQueue();
                    break;
            }
            UserInterface.mode_switcher_clicks_after_reload++;
        }
        switch(this.id) {
            case 'source-mode_button':
                UserInterface.#enable_source_mode();
                UserInterface.#disable_transcription_mode();
                UserInterface.#disable_translation_mode();
                break;
            case 'translation-mode_button':
                UserInterface.#enable_translation_mode();
                UserInterface.#disable_source_mode();
                UserInterface.#disable_transcription_mode();
                break;
            case 'transcription-mode_button':
                UserInterface.#enable_transcription_mode();
                UserInterface.#disable_source_mode();
                UserInterface.#disable_translation_mode();
                break;
        }
    }
}

var UI = new UserInterface();

document.addEventListener('DOMContentLoaded', function() {
    let element = document.querySelector(UserInterface.selectors.get('Кнопка закрытия настроек'));
    element.addEventListener('click', UserInterface.close_settings);
    element.addEventListener('click', UserInterface.open_words_panel);
    element = document.querySelector(UserInterface.selectors.get('Кнопка настроек'));
    element.addEventListener('click', UserInterface.settings_button);
    element = document.querySelector(UserInterface.selectors.get('Кнопка раздела языковых настроек'));
    element.addEventListener('click', UserInterface.switch_settings_to_languages);
    element = document.querySelector(UserInterface.selectors.get('Кнопка раздела настроек Git'));
    element.addEventListener('click', UserInterface.switch_settings_to_git);
    element = document.querySelector(UserInterface.selectors.get('Кнопка открытия дополнительных опций языковых настроек'));
    element.addEventListener('click', UserInterface.open_languages_additional_options);
    element.addEventListener('click', UserInterface.set_adding_language_header);
    let elements = document.querySelectorAll(UserInterface.selectors.get('Метка существующего языка'));
    for(const element of elements) {
        element.addEventListener('click', UserInterface.open_languages_additional_options);
        element.addEventListener('click', UserInterface.set_editing_language_header);
    }
    element = document.querySelector(UserInterface.selectors.get('Кнопка руководства'));
    element.addEventListener('click', UserInterface.guide_button);
    elements = document.querySelectorAll(UserInterface.selectors.get('Кнопки переключения режимов'));
    for(const element of elements) {
        element.addEventListener('click', UI.mode_switcher_buttons);
    }
});