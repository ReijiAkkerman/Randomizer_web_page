import {CircularQueue} from './DataStructures/CircularQueue.js';
import {Stack} from './DataStructures/Stack.js';

class UserInterface {
    static text_color = '#000';
    static selected_mode_text_color ='#00f';
    static main_actions_text_color = '#00f';
    static setting_for_editing_text_color = '#090';

    static selectors = new Map([
        ['Панель настроек', '.settings'],
        ['Кнопка закрытия настроек', '.theme_close-settings'],
        ['Кнопка настроек', '.other-utilities__button_settings'],
        ['Кнопка раздела языковых настроек', '.setups-switcher__button_languages'],
        ['Кнопка раздела настроек Git', '.setups-switcher__button_git'],
        ['Раздел языковых настроек', '.languages'],
        ['Раздел дополнительных опций языковых настроек', '.languages-add'],
        ['Раздел настроек Git', '.git'],
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
        ['Кнопка синхронизации с Git', '.actions-main__button_sync-with-github'],
        ['Кнопка раздела разделения списка', '.actions-main__button_split-list'],
        ['Кнопка раздела обьединения списков', '.actions-main__button_combine-lists'],
        ['Кнопка раздела создания нового списка', '.actions-main__button_create-new-list'],
        ['Кнопка разделения списка', '.actions-additional__button_split-list'],
        ['Кнопка обьединения списков', '.actions-additional__button_combine-lists'],
        ['Кнопка сохранения списка', '.actions-additional__button_save-list'],
        ['Кнопка закрытия основного действия', '.actions-main__button_close-editing'],
        ['Блок параметров', '.parameters'],
        ['Параметр количества списков', '.parameters-block__input_lists-number'],
        ['Параметр количества слов', '.parameters-block__input_words-number'],
        ['Блок обьединения списков', '.lists-combining'],
        ['Используемые языки', '.languages-add-select_recent-languages'],
        ['Все языки', '.languages-add-select_all-languages'],
        ['Кнопка выбора основного языка', '.languages-main-language__button'],
        ['Кнопка добавления языка', '.languages-additional-languages-list__button_add-language'],
        ['Поле наименования языка', '.languages-add-create__input_language-name'],
        ['Поле папки языка', '.languages-add-create__input_language-folder'],
        ['Поле метки языка', '.languages-add-create__input_shorthand'],
        ['"Присутствие в языке иероглифов"', '#present-kanji'],
        ['Информация о языке', '.languages-add-create'],
        ['Кнопки используемых языков', '.languages-additional-languages-list__button_studied-language'],
        ['Кнопка редактирования языка', '.languages-additional-languages-actions__button_edit-language'],
    ]);

    static #settings_button_enabled = false;
    static #guide_button_enabled = false;

    static kanji_mode_enabled = true;

    static mode_switcher_queue = new CircularQueue(3, 'translation-mode_button', ['transcription-mode_button', 'source-mode_button']);
    static #reversed_mode_enabled = false;

    static main_actions_stack = new Stack(1);

    static #editing_setting = null;

    static #settings_panel = document.querySelector(UserInterface.selectors.get('Панель настроек'));
    static #settings_button = document.querySelector(UserInterface.selectors.get('Кнопка настроек'));
    static #svg_of_settings_button = UserInterface.#settings_button.firstElementChild;
    static #guide_panel = document.querySelector(UserInterface.selectors.get('Панель руководства'));
    static #guide_button = document.querySelector(UserInterface.selectors.get('Кнопка руководства'));
    static #svg_of_guide_button = UserInterface.#guide_button.firstElementChild;
    static #languages_button = document.querySelector(UserInterface.selectors.get('Кнопка раздела языковых настроек'));
    static #git_button = document.querySelector(UserInterface.selectors.get('Кнопка раздела настроек Git'));
    static #languages_section = document.querySelector(UserInterface.selectors.get('Раздел языковых настроек'));
    static #git_section = document.querySelector(UserInterface.selectors.get('Раздел настроек Git'));
    static #additional_options_section = document.querySelector(UserInterface.selectors.get('Раздел дополнительных опций языковых настроек'));
    static #new_language_header = document.querySelector(UserInterface.selectors.get('"Добавить новый язык"'));
    static #existent_language_header = document.querySelector(UserInterface.selectors.get('"Изменить параметры языка"'));
    static #words_panel = document.querySelector(UserInterface.selectors.get('Панель слов'));
    static #source = document.querySelector(UserInterface.selectors.get('Исходные значения слов'));
    static #translation = document.querySelector(UserInterface.selectors.get('Перевод слов'));
    static #transcription = document.querySelector(UserInterface.selectors.get('Чтения слов'));
    static #source_button = document.querySelector(UserInterface.selectors.get('Кнопка включения исходников'));
    static #translation_button = document.querySelector(UserInterface.selectors.get('Кнопка включения переводов'));
    static #transcription_button = document.querySelector(UserInterface.selectors.get('Кнопка включения чтений'));
    static #svg_of_source_button = UserInterface.#source_button.firstElementChild;
    static #svg_of_translation_button = UserInterface.#translation_button.firstElementChild;
    static #svg_of_transcription_button = UserInterface.#transcription_button.firstElementChild;
    static #source_section = document.querySelector(UserInterface.selectors.get('Исходные значения слов'));
    static #translation_section = document.querySelector(UserInterface.selectors.get('Перевод слов'));
    static #transcription_section = document.querySelector(UserInterface.selectors.get('Чтения слов'));
    static #button_for_git_sync = document.querySelector(UserInterface.selectors.get('Кнопка синхронизации с Git'));
    static #button_for_split_list = document.querySelector(UserInterface.selectors.get('Кнопка раздела разделения списка'));
    static #button_for_combine_lists = document.querySelector(UserInterface.selectors.get('Кнопка раздела обьединения списков'));
    static #button_for_create_new_list = document.querySelector(UserInterface.selectors.get('Кнопка раздела создания нового списка'));
    static #svg_of_button_for_sync_git = UserInterface.#button_for_git_sync.firstElementChild;
    static #svg_of_button_for_split_list = UserInterface.#button_for_split_list.firstElementChild;
    static #svg_of_button_for_combine_lists = UserInterface.#button_for_combine_lists.firstElementChild;
    static #svg_of_button_for_create_new_list = UserInterface.#button_for_create_new_list.firstElementChild;
    static #split_list_button = document.querySelector(UserInterface.selectors.get('Кнопка разделения списка'));
    static #combine_lists_button = document.querySelector(UserInterface.selectors.get('Кнопка обьединения списков'));
    static #create_new_list_button = document.querySelector(UserInterface.selectors.get('Кнопка сохранения списка'));
    static #parameters_block = document.querySelector(UserInterface.selectors.get('Блок параметров'));
    static #combine_lists_block = document.querySelector(UserInterface.selectors.get('Блок обьединения списков'));
    static #close_main_action = document.querySelector(UserInterface.selectors.get('Кнопка закрытия основного действия'));
    static #used_languages = document.querySelector(UserInterface.selectors.get('Используемые языки'));
    static #all_languages = document.querySelector(UserInterface.selectors.get('Все языки'));
    static main_language_button = document.querySelector(UserInterface.selectors.get('Кнопка выбора основного языка'));
    static add_language_button = document.querySelector(UserInterface.selectors.get('Кнопка добавления языка'));
    static #language_name_field = document.querySelector(UserInterface.selectors.get('Поле наименования языка'));
    static #language_folder_field = document.querySelector(UserInterface.selectors.get('Поле папки языка'));
    static #language_mark_field = document.querySelector(UserInterface.selectors.get('Поле метки языка'));
    static #kanji_presence = document.querySelector(UserInterface.selectors.get('"Присутствие в языке иероглифов"'));
    static #language_info = document.querySelector(UserInterface.selectors.get('Информация о языке'));
    static editing_language_button = document.querySelector(UserInterface.selectors.get('Кнопка редактирования языка'));

    static close_settings() {
        UserInterface.#settings_panel.style.display = 'none';
        UserInterface.#set_default_colors_to_settings_button();
        UserInterface.#settings_button_enabled = false;
    }

    static #open_settings() {
        UserInterface.#settings_panel.style.display = '';
        UserInterface.#set_active_colors_to_settings_button();
        UserInterface.#settings_button_enabled = true;
    }

    static #set_default_colors_to_settings_button() {
        UserInterface.#settings_button.style.borderColor = '';
        UserInterface.#svg_of_settings_button.style.fill = '';
    }

    static #set_active_colors_to_settings_button() {
        UserInterface.#settings_button.style.borderColor = UserInterface.text_color;
        UserInterface.#svg_of_settings_button.style.fill = UserInterface.text_color;
    }

    static settings_button() {
        if(UserInterface.#settings_button_enabled) {
            UserInterface.close_settings();
            UserInterface.open_words_panel();
        }
        else {
            if(UserInterface.#guide_button_enabled)
                UserInterface.close_guide();
            else 
                UserInterface.#close_words_panel();
            UserInterface.#open_settings();
        }
    }

    static close_guide() {
        UserInterface.#guide_panel.style.display = 'none';
        UserInterface.#set_default_colors_to_guide_button();
        UserInterface.#guide_button_enabled = false;
    }

    static #open_guide() {
        UserInterface.#guide_panel.style.display = '';
        UserInterface.#set_active_colors_to_guide_button();
        UserInterface.#guide_button_enabled = true;
    }

    static #set_default_colors_to_guide_button() {
        UserInterface.#guide_button.style.borderColor = '';
        UserInterface.#svg_of_guide_button.style.fill = '';
    }

    static #set_active_colors_to_guide_button() {
        UserInterface.#guide_button.style.borderColor = UserInterface.text_color;
        UserInterface.#svg_of_guide_button.style.fill = UserInterface.text_color;
    }

    static guide_button() {
        if(UserInterface.#guide_button_enabled) {
            UserInterface.close_guide();
            UserInterface.open_words_panel();
        }
        else {
            if(UserInterface.#settings_button_enabled) 
                UserInterface.close_settings();
            else 
                UserInterface.#close_words_panel();
            UserInterface.#open_guide();
        }
    }

    static switch_settings_to_languages() {
        UserInterface.#git_button.style.color = '';
        UserInterface.#git_section.style.display = 'none';
        UserInterface.#languages_button.style.color = UserInterface.text_color;
        UserInterface.#languages_section.style.display = '';
    }

    static switch_settings_to_git() {
        UserInterface.#languages_button.style.color = '';
        UserInterface.#languages_section.style.display = 'none';
        UserInterface.#git_button.style.color = UserInterface.text_color;
        UserInterface.#git_section.style.display = '';
        UserInterface.close_languages_additional_options();
    }

    static #open_languages_additional_options() {
        UserInterface.#additional_options_section.style.display = '';
    }

    static close_languages_additional_options() {
        UserInterface.#additional_options_section.style.display = 'none';
    }

    static select_main_language() {
        if(UserInterface.#editing_setting) 
            UserInterface.#set_default_colors_to_language_setting();
        UserInterface.#editing_setting = UserInterface.main_language_button;
        UserInterface.#editing_setting.language_type = 'main-language';
        UserInterface.#set_active_colors_to_language_setting();
        UserInterface.#open_languages_additional_options();
        UserInterface.#show_used_languages();
        UserInterface.#open_language_info();
        UserInterface.#show_changing_language_header();
        UserInterface.#fill_language_fields();
        UserInterface.#set_default_colors_to_editing_language_button();
    }

    static add_language() {
        if(UserInterface.#editing_setting)
            UserInterface.#set_default_colors_to_language_setting();
        UserInterface.#editing_setting = UserInterface.add_language_button;
        UserInterface.#editing_setting.language_type = 'add-language';
        UserInterface.#set_active_colors_to_language_setting();
        UserInterface.#open_languages_additional_options();
        UserInterface.#hide_used_languages();
        UserInterface.#open_language_info();
        UserInterface.#show_adding_language_header();
        UserInterface.#clear_language_fields();
        UserInterface.#set_default_colors_to_editing_language_button();
    }

    static change_language() {
        if(UserInterface.#editing_setting) {
            if(UserInterface.#editing_setting.language_type === 'studied-language') {
                UserInterface.#open_languages_additional_options();
                UserInterface.#fill_language_fields();
                UserInterface.#show_changing_language_header();
                UserInterface.#open_language_info();
                UserInterface.#set_active_colors_to_editing_language_button();
            }
        }
    }

    static #clear_language_fields() {
        UserInterface.#language_name_field.value = '';
        UserInterface.#language_folder_field.value = '';
        UserInterface.#language_mark_field.value = '';
        UserInterface.#kanji_presence.checked = false;
    }

    static #fill_language_fields() {
        UserInterface.#language_name_field.value = UserInterface.#editing_setting.dataset.language;
        UserInterface.#language_folder_field.value = UserInterface.#editing_setting.dataset.folder;
        UserInterface.#language_mark_field.value = UserInterface.#editing_setting.dataset.mark;
        UserInterface.#kanji_presence.checked = !!UserInterface.#editing_setting.dataset.kanji;
    }

    static #set_active_colors_to_editing_language_button() {
        UserInterface.editing_language_button.firstElementChild.style.fill = UserInterface.text_color;
        UserInterface.editing_language_button.style.borderColor = UserInterface.text_color;
    }

    static #set_default_colors_to_editing_language_button() {
        UserInterface.editing_language_button.firstElementChild.style.fill = '';
        UserInterface.editing_language_button.style.borderColor = '';
    }

    static #set_active_colors_to_language_setting() {
        switch(UserInterface.#editing_setting.language_type) {
            case 'main-language':
                UserInterface.#editing_setting.style.color = UserInterface.setting_for_editing_text_color;
                UserInterface.#editing_setting.style.borderColor = UserInterface.setting_for_editing_text_color;
                break;
            case 'studied-language':
                UserInterface.#editing_setting.style.color = UserInterface.text_color;
                break;
            case 'add-language':
                UserInterface.#editing_setting.firstElementChild.style.fill = UserInterface.setting_for_editing_text_color;
                break;
        }
    }

    static #set_default_colors_to_language_setting() {
        switch(UserInterface.#editing_setting.language_type) {
            case 'main-language':
                UserInterface.#editing_setting.style.color = '';
                UserInterface.#editing_setting.style.borderColor = '';
                break;
            case 'studied-language':
                UserInterface.#editing_setting.style.color = '';
                break;
            case 'add-language':
                UserInterface.#editing_setting.firstElementChild.style.fill = '';
                break;
        }
    }

    static #show_used_languages() {
        UserInterface.#used_languages.style.display = '';
    }

    static #hide_used_languages() {
        UserInterface.#used_languages.style.display = 'none';
    } 

    static #show_all_languages() {
        UserInterface.#all_languages.style.display = '';
    }

    static #hide_all_languages() {
        UserInterface.#all_languages.style.display = 'none';
    }

    static #open_language_info() {
        UserInterface.#language_info.style.display = '';
    }

    static #close_language_info() {
        UserInterface.#language_info.style.display = 'none';
    }

    static #show_changing_language_header() {
        UserInterface.#new_language_header.style.display = 'none';
        UserInterface.#existent_language_header.style.display = '';
    }

    static #show_adding_language_header() {
        UserInterface.#new_language_header.style.display = '';
        UserInterface.#existent_language_header.style.display = 'none';
    }

    static #close_words_panel() {
        UserInterface.#words_panel.style.display = 'none';
    }

    static open_words_panel() {
        UserInterface.#words_panel.style.display = '';
    }

    static #enable_source_mode() {
        UserInterface.#source.style.display = '';
    }

    static #enable_translation_mode() {
        UserInterface.#translation.style.display = '';
    }

    static #enable_transcription_mode() {
        UserInterface.#transcription.style.display = '';
    }

    static #disable_source_mode() {
        UserInterface.#source.style.display = 'none';
    }

    static #disable_translation_mode() {
        UserInterface.#translation.style.display = 'none';
    }

    static #disable_transcription_mode() {
        UserInterface.#transcription.style.display = 'none';
    }

    static #set_default_colors_to_source_mode_button() {
        UserInterface.#svg_of_source_button.style.fill = '';
    }

    static #set_default_colors_to_translation_mode_button() {
        UserInterface.#svg_of_translation_button.style.fill = '';
    }

    static #set_default_colors_to_transcription_mode_button() {
        UserInterface.#svg_of_transcription_button.style.stroke = '';
    }

    static #set_active_colors_to_source_mode_button() {
        UserInterface.#svg_of_source_button.style.fill = UserInterface.selected_mode_text_color;
    }

    static #set_active_colors_to_translation_mode_button() {
        UserInterface.#svg_of_translation_button.style.fill = UserInterface.selected_mode_text_color;
    }

    static #set_active_colors_to_transcription_mode_button() {
        UserInterface.#svg_of_transcription_button.style.stroke = UserInterface.selected_mode_text_color;
    }

    mode_switcher_buttons() {
        if(this.id === UserInterface.mode_switcher_queue.lastDeQueuedElement) {
            /**
             * включает соответствующую нажатию кнопку
             * и соответствующий ей раздел изучения слов
             */
            switch(this.id) {   
                case 'source-mode_button':
                    UserInterface.mode_switcher_queue.enQueue(this.id);
                    UserInterface.#set_active_colors_to_source_mode_button();
                    break;
                case 'translation-mode_button':
                    UserInterface.mode_switcher_queue.enQueue(this.id);
                    UserInterface.#set_active_colors_to_translation_mode_button();
                    break;
                case 'transcription-mode_button':
                    UserInterface.mode_switcher_queue.enQueue(this.id);
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
                    UserInterface.#set_default_colors_to_source_mode_button();
                    UserInterface.mode_switcher_queue.deQueue();
                    break;
                case 'translation-mode_button':
                    UserInterface.#set_default_colors_to_translation_mode_button();
                    UserInterface.mode_switcher_queue.deQueue();
                    break;
                case 'transcription-mode_button':
                    UserInterface.#set_default_colors_to_transcription_mode_button();
                    UserInterface.mode_switcher_queue.deQueue();
                    break;
            }
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
        UserInterface.#reversed_mode_enabled = false;
    }

    static reverse_mode_by_keyup(event) {
        if(event.code === 'Space') {
            event.preventDefault();
            UserInterface.#reverse_mode();
        }
    }

    static reverse_mode_by_click() {
        UserInterface.#reverse_mode();
    }

    static #reverse_mode() {
        if(UserInterface.#reversed_mode_enabled) {
            switch(UserInterface.mode_switcher_queue.nowSelected) {
                case 'source-mode_button':
                    UserInterface.#source_section.style.display = '';
                    break;
                case 'translation-mode_button':
                    UserInterface.#translation_section.style.display = '';
                    break;
                case 'transcription-mode_button':
                    UserInterface.#transcription_section.style.display = '';
                    break;
            }
            switch(UserInterface.mode_switcher_queue.peek()) {
                case 'source-mode_button':
                    UserInterface.#source_section.style.display = 'none';
                    break;
                case 'translation-mode_button':
                    UserInterface.#translation_section.style.display = 'none';
                    break;
                case 'transcription-mode_button':
                    UserInterface.#transcription_section.style.display = 'none';
                    break;
            }
            UserInterface.#reversed_mode_enabled = false;
        }
        else {
            switch(UserInterface.mode_switcher_queue.nowSelected) {
                case 'source-mode_button':
                    UserInterface.#source_section.style.display = 'none';
                    break;
                case 'translation-mode_button':
                    UserInterface.#translation_section.style.display = 'none';
                    break;
                case 'transcription-mode_button':
                    UserInterface.#transcription_section.style.display = 'none';
                    break;
            }
            switch(UserInterface.mode_switcher_queue.peek()) {
                case 'source-mode_button':
                    UserInterface.#source_section.style.display = '';
                    break;
                case 'translation-mode_button':
                    UserInterface.#translation_section.style.display = '';
                    break;
                case 'transcription-mode_button':
                    UserInterface.#transcription_section.style.display = '';
                    break;
            }
            UserInterface.#reversed_mode_enabled = true;
        }
    }

    static open_split_list_section() {
        if(UserInterface.main_actions_stack.isFull()) {
            UserInterface.close_main_action();
        }
        if(UserInterface.main_actions_stack.push('split-list')) {
            UserInterface.#svg_of_button_for_split_list.style.fill = UserInterface.main_actions_text_color;
            UserInterface.#split_list_button.style.display = '';
            UserInterface.#parameters_block.style.display = '';
            UserInterface.#close_main_action.style.display = '';
        }
    }

    static open_combine_lists_section() {
        if(UserInterface.main_actions_stack.isFull()) {
            UserInterface.close_main_action();
        }
        if(UserInterface.main_actions_stack.push('combine-lists')) {
            UserInterface.#svg_of_button_for_combine_lists.style.fill = UserInterface.main_actions_text_color;
            UserInterface.#combine_lists_button.style.display = '';
            UserInterface.#combine_lists_block.style.display = '';
            UserInterface.#close_main_action.style.display = '';
        }
    }

    static open_create_new_list_section() {
        if(UserInterface.main_actions_stack.isFull()) {
            UserInterface.close_main_action();
        }
        if(UserInterface.main_actions_stack.push('create-new-list')) {
            UserInterface.#svg_of_button_for_create_new_list.style.fill = UserInterface.main_actions_text_color;
            UserInterface.#create_new_list_button.style.display = '';
            UserInterface.#close_main_action.style.display = '';
        }
    }

    static #close_split_list_section() {
        UserInterface.#svg_of_button_for_split_list.style.fill = '';
        UserInterface.#split_list_button.style.display = 'none';
        UserInterface.#parameters_block.style.display = 'none';
    }

    static #close_combine_lists_section() {
        UserInterface.#svg_of_button_for_combine_lists.style.fill = '';
        UserInterface.#combine_lists_button.style.display = 'none';
        UserInterface.#combine_lists_block.style.display = 'none';
    }

    static #close_create_new_list_section() {
        UserInterface.#svg_of_button_for_create_new_list.style.fill = '';
        UserInterface.#create_new_list_button.style.display = 'none';
    }

    static close_main_action(disable_close_button = true) {
        switch(UserInterface.main_actions_stack.peek()) {
            case 'split-list':
                UserInterface.#close_split_list_section();
                break;
            case 'combine-lists':
                UserInterface.#close_combine_lists_section();
                break;
            case 'create-new-list':
                UserInterface.#close_create_new_list_section();
                break;
        }
        UserInterface.main_actions_stack.pop();
        if(disable_close_button)
            UserInterface.#close_main_action.style.display = 'none';
    }

    select_studied_language() {
        if(UserInterface.#editing_setting)
            UserInterface.#set_default_colors_to_language_setting();
        UserInterface.#editing_setting = this;
        UserInterface.#editing_setting.language_type = 'studied-language';
        UserInterface.#set_active_colors_to_language_setting();
        UserInterface.#hide_used_languages();
        UserInterface.#close_language_info();
        UserInterface.#set_default_colors_to_editing_language_button();
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
    element = document.querySelector(UserInterface.selectors.get('Кнопка руководства'));
    element.addEventListener('click', UserInterface.guide_button);
    let elements = document.querySelectorAll(UserInterface.selectors.get('Кнопки переключения режимов'));
    for(const element of elements) {
        element.addEventListener('click', UI.mode_switcher_buttons);
    }
    element = document.querySelector(UserInterface.selectors.get('Кнопка закрытия основного действия'));
    element.addEventListener('click', UserInterface.close_main_action);
    element = document.querySelector(UserInterface.selectors.get('Кнопка раздела разделения списка'));
    element.addEventListener('click', UserInterface.open_split_list_section);
    element = document.querySelector(UserInterface.selectors.get('Кнопка раздела обьединения списков'));
    element.addEventListener('click', UserInterface.open_combine_lists_section);
    element = document.querySelector(UserInterface.selectors.get('Кнопка раздела создания нового списка'));
    element.addEventListener('click', UserInterface.open_create_new_list_section);
    element = document.querySelector(UserInterface.selectors.get('Панель слов'));
    element.addEventListener('click', UserInterface.reverse_mode_by_click);
    UserInterface.main_language_button.addEventListener('click', UserInterface.select_main_language);
    UserInterface.add_language_button.addEventListener('click', UserInterface.add_language);
    elements = document.querySelectorAll(UserInterface.selectors.get('Кнопки используемых языков'));
    for(const element of elements) {
        element.addEventListener('click', UI.select_studied_language);
    }
    UserInterface.editing_language_button.addEventListener('click', UserInterface.change_language);
});

document.addEventListener('keyup', UserInterface.reverse_mode_by_keyup);