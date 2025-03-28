import {UserInterface} from '/src/js/randomizer/UserInterface.js';
import {Stack} from '/src/js/randomizer/DataStructures/Stack.js';
import {Lists} from '/src/js/randomizer/async/MainFrame/Lists.js';

class MainActions {
    static selectors = new Map([
        ['Кнопки основных действий', '.actions-main__button'],
        // Разделение списка
        ['Разделение списка Кнопка включения раздела', '.actions-main__button_split-list'],
        ['Разделение списка Параметры', '.parameters'],
        ['Разделение списка Кнопка запуска действия', '.actions-additional__button_split-list'],
        // Обьединение списка
        ['Обьединение списков Кнопка включения раздела', '.actions-main__button_combine-lists'],
        ['Обьединение списков Блок списков для обьединения', '.lists-combining'],
        ['Обьединение списков Кнопка запуска действия', '.actions-additional__button_combine-lists'],
        // Создание нового списка
        ['Создание нового списка Кнопка включения раздела', '.actions-main__button_create-new-list'],
        ['Создание нового списка Кнопка запуска действия', '.actions-additional__button_save-list'],
        ['Поле для наименования списка', '.actions-additional__input[name="list_name"]'],
        ['Информация об ошибках для поля с наименованием списка', '.actions-additional_errors-info'],
        // Закрытие основного действия
        ['Закрытие основного действия Кнопка', '.actions-main__button_close-editing'],
    ]);
    static stack = new Stack(1);

    // Разделение списка

    static #split_list_section_button = document.querySelector(MainActions.selectors.get('Разделение списка Кнопка включения раздела'));
    static split_list_button = document.querySelector(MainActions.selectors.get('Разделение списка Кнопка запуска действия'));
    static #split_list_parameters = document.querySelector(MainActions.selectors.get('Разделение списка Параметры'));
    static #svg_of_split_list_section_button = MainActions.#split_list_section_button.firstElementChild;

    // Обьединение списка

    static #combine_lists_section_button = document.querySelector(MainActions.selectors.get('Обьединение списков Кнопка включения раздела'));
    static combine_lists_button = document.querySelector(MainActions.selectors.get('Обьединение списков Кнопка запуска действия'));
    static #combine_lists_block = document.querySelector(MainActions.selectors.get('Обьединение списков Блок списков для обьединения'));
    static #svg_of_combine_lists_section_button = MainActions.#combine_lists_section_button.firstElementChild;

    // Создание нового списка

    static #create_new_list_section_button = document.querySelector(MainActions.selectors.get('Создание нового списка Кнопка включения раздела'));
    static create_new_list_button = document.querySelector(MainActions.selectors.get('Создание нового списка Кнопка запуска действия'));
    static #svg_of_create_new_list_section_button = MainActions.#create_new_list_section_button.firstElementChild;
    static list_name__input = document.querySelector(MainActions.selectors.get('Поле для наименования списка'));
    static list_name_errors_info = document.querySelector(MainActions.selectors.get('Информация об ошибках для поля с наименованием списка'));

    // Закрытие основного действия

    static #close_main_action_button = document.querySelector(MainActions.selectors.get('Закрытие основного действия Кнопка'));





    // Основное действие 

    activate() {
        const activateCloseButton = () => {
            MainActions.stack.push(this.dataset.action_type);
            MainActions.close_main_action_show_button();
        };
        const deactivateCloseButton = () => {
            MainActions.#close_main_action();
            MainActions.close_main_action_hide_button();
        };
        if(MainActions.stack.peek() !== this.dataset.action_type)
            MainActions.#close_main_action();
        else return;
        switch(this.dataset.action_type) {
            case 'sync-with-github':
                deactivateCloseButton();
                break;
            case 'split-list':
                MainActions.#split_list_activate();
                activateCloseButton();
                break;
            case 'combine-lists':
                MainActions.#combine_lists_activate();
                activateCloseButton();
                break;
            case 'create-new-list':
                MainActions.create_new_list_activate();
                activateCloseButton();
                break;
            case 'close-editing':
                deactivateCloseButton();
                break;
        }
    }



    // Разделение списка

    static #split_list_activate() {            
        MainActions.#split_list_set_active_color_on_section_button();
        MainActions.#split_list_show_run_button();
        MainActions.#split_list_show_parameters();
    }

    static #split_list_deactivate() {
        MainActions.#split_list_unset_active_color_on_section_button();
        MainActions.#split_list_hide_run_button();
        MainActions.#split_list_hide_parameters();
    }
    
    static #split_list_set_active_color_on_section_button() {
        MainActions.#svg_of_split_list_section_button.style.fill = UserInterface.main_actions_text_color;
    }

    static #split_list_unset_active_color_on_section_button() {
        MainActions.#svg_of_split_list_section_button.style.fill = '';
    }

    static #split_list_show_run_button() {
        MainActions.split_list_button.style.display = '';
    }

    static #split_list_hide_run_button() {
        MainActions.split_list_button.style.display = 'none';
    }

    static #split_list_show_parameters() {
        MainActions.#split_list_parameters.style.display = '';
    }

    static #split_list_hide_parameters() {
        MainActions.#split_list_parameters.style.display = 'none';
    }

    

    // Обьединение списков

    static #combine_lists_activate() {
        MainActions.#combine_lists_set_active_color_on_section_button();
        MainActions.#combine_lists_show_run_button();
        MainActions.#combine_lists_show_combining_lists_block();
    }

    static #combine_lists_deactivate() {
        MainActions.#combine_lists_unset_active_color_on_section_button();
        MainActions.#combine_lists_hide_run_button();
        MainActions.#combine_lists_hide_combining_lists_block();
    }

    static #combine_lists_set_active_color_on_section_button() {
        MainActions.#svg_of_combine_lists_section_button.style.fill = UserInterface.main_actions_text_color;
    }

    static #combine_lists_unset_active_color_on_section_button() {
        MainActions.#svg_of_combine_lists_section_button.style.fill = '';
    }

    static #combine_lists_show_run_button() {
        MainActions.combine_lists_button.style.display = '';
    }

    static #combine_lists_hide_run_button() {
        MainActions.combine_lists_button.style.display = 'none';
    }

    static #combine_lists_show_combining_lists_block() {
        MainActions.#combine_lists_block.style.display = '';
    }

    static #combine_lists_hide_combining_lists_block() {
        MainActions.#combine_lists_block.style.display = 'none';
    }



    // Создание нового списка 

    static create_new_list_activate() {
        MainActions.#create_new_list_set_active_color_on_section_button();
        MainActions.#show_errors_info_for_list_name_field();
        MainActions.#show_input_for_list_name();
        MainActions.#create_new_list_show_run_button();
    }

    static create_new_list_deactivate() {
        MainActions.#create_new_list_unset_active_color_on_section_button();
        MainActions.#hide_errors_info_for_list_name_field();
        MainActions.#hide_input_for_list_name();
        MainActions.#create_new_list_hide_run_button();
    }

    static #create_new_list_set_active_color_on_section_button() {
        MainActions.#svg_of_create_new_list_section_button.style.fill = UserInterface.main_actions_text_color;
    }

    static #create_new_list_unset_active_color_on_section_button() {
        MainActions.#svg_of_create_new_list_section_button.style.fill = '';
    }

    static #create_new_list_show_run_button() {
        MainActions.create_new_list_button.style.display = '';
    }

    static #create_new_list_hide_run_button() {
        MainActions.create_new_list_button.style.display = 'none';
    }

    static #hide_input_for_list_name() {
        MainActions.list_name__input.style.display = 'none';
    }

    static #show_input_for_list_name() {
        MainActions.list_name__input.style.display = '';
    }

    static #hide_errors_info_for_list_name_field() {
        MainActions.list_name_errors_info.style.display = 'none';
    }

    static #show_errors_info_for_list_name_field() {
        MainActions.list_name_errors_info.style.display = '';
    }



    // Закрытие основного действия 

    static #close_main_action() {
        switch(MainActions.stack.peek()) {
            case 'split-list':
                MainActions.#split_list_deactivate();
                break;
            case 'combine-lists':
                MainActions.#combine_lists_deactivate();
                break;
            case 'create-new-list':
                MainActions.create_new_list_deactivate();
                // Lists.new_list_creation_access();
                Lists.unset_editing_mode();
                break;
        }
        MainActions.stack.pop();
    }

    static close_main_action_show_button() {
        MainActions.#close_main_action_button.style.display = '';
    }

    static close_main_action_hide_button() {
        MainActions.#close_main_action_button.style.display = 'none';
    }
}

export {MainActions};

var main_actions = new MainActions();

document.addEventListener('DOMContentLoaded', function() {
    let elements = document.querySelectorAll(MainActions.selectors.get('Кнопки основных действий'));
    for(const element of elements) {
        element.addEventListener('click', main_actions.activate);
    }
});