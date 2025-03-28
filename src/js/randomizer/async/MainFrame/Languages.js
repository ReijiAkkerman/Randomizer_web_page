import {Languages as FrontendLanguages} from '/src/js/randomizer/MainFrame/Settings/Languages.js';
import {Lists} from '/src/js/randomizer/async/MainFrame/Lists.js';
import {UserInterface} from '/src/js/randomizer/UserInterface.js';
import {Adaptive} from '/src/js/randomizer/Adaptive.js';

class Languages {
    static selectors = new Map([
        // add_new()
        ['Форма с данными для нового языка', '.languages-add-create__form'],
        ['Кнопка создания нового языка', '.languages-add-create__button_add'],
        ['Шаблон для кнопки переключения изучаемого языка', '.languages-additional-languages-list__template'],
        ['Кнопка замены основного языка', '#main'],
        ['Кнопка добавления нового изучаемого языка', '#new'],
        ['Место для вывода ошибок при создании нового языка', '.languages-add-create_errors'],
        ['Имя нового языка', '.languages-add-create__input_language-name'],
        ['Папка нового языка', '.languages-add-create__input_language-folder'],
        ['Метка нового языка', '.languages-add-create__input_shorthand'],
        ['Наличие иероглифов в новом языке', '#present-kanji'],

        // #show_actions()
        // #hide_actions()
        ['Кнопка редактирования изучаемого языка', '.languages-additional-languages-actions__button_edit-language'],
        // delete_studied()
        ['Кнопка удаления изучаемого языка', '.languages-additional-languages-actions__button_delete-language'],

        // #add_studied_for_selection()
        ['Шаблон для кнопки выбора изучаемого языка', '.languages-add-select__template_recent-languages'],
        ['Область кнопок изучаемых языков для выбора', '.languages-add-select_recent-languages'],

        // #set_studied_language_for_exchanging()
        ['Кнопки изучаемых языков для переключения', '.languages-additional-languages-list__button_studied-language'],

        // #exchange_from_all()
        ['Кнопки всех языков', '.languages-add-select_all-languages .languages-add-select__button'],
        ['Область кнопок изучаемых языков для переключения', '.languages-additional-languages-list'],

        // remove_studied()
        ['Шаблон кнопки выбора языка из числа всех', '.languages-add-select__template_all-languages'],
        ['Область отображения всех языков', '.languages-add-select_all-languages'],

        // exchange_from_studied()
        ['Кнопки изучамых языков для выбора', '.languages-add-select_recent-languages .languages-add-select__button'],

        // change_for_user()
        ['Кнопка изменения языка', '.languages-add-create__button_change'],
        // set_active_color_for_active_language
        // unset_active_color_for_active_language
        ['Область кнопок для быстрого переключения между изучаемыми языками', '.other-languages'],
        // add_studied_in_quick_access
        ['Шаблон кнопки изучаемого языка для панели быстрого доступа', '.other-languages__template'],
    ]);





    // DOMContentLoaded
    static name_field = document.querySelector(Languages.selectors.get('Имя нового языка'));
    static foldername_field = document.querySelector(Languages.selectors.get('Папка нового языка'));
    static mark_field = document.querySelector(Languages.selectors.get('Метка нового языка'));

    // add_new()
    static new_language__form = document.querySelector(Languages.selectors.get('Форма с данными для нового языка'));
    static create_new_language__button = document.querySelector(Languages.selectors.get('Кнопка создания нового языка'));
    static studied_language_for_switching__template = document.querySelector(Languages.selectors.get('Шаблон для кнопки переключения изучаемого языка'));
    static substitute_main_language__button = document.querySelector(Languages.selectors.get('Кнопка замены основного языка'));
    static add_studied_language__button = document.querySelector(Languages.selectors.get('Кнопка добавления нового изучаемого языка'));
    static #errors = document.querySelector(Languages.selectors.get('Место для вывода ошибок при создании нового языка'));
    static #name = document.querySelector(Languages.selectors.get('Имя нового языка'));
    static #foldername = document.querySelector(Languages.selectors.get('Папка нового языка'));
    static #mark = document.querySelector(Languages.selectors.get('Метка нового языка'));
    static #kanji = document.querySelector(Languages.selectors.get('Наличие иероглифов в новом языке'));

    // #show_actions()
    // #hide_actions()
    static edit_studied_language__button = document.querySelector(Languages.selectors.get('Кнопка редактирования изучаемого языка'));
    // delete_studied()
    static remove_studied_language__button = document.querySelector(Languages.selectors.get('Кнопка удаления изучаемого языка'));

    // #add_studied_for_selection()
    static studied_language_for_selection__template = document.querySelector(Languages.selectors.get('Шаблон для кнопки выбора изучаемого языка'));
    static studied_languages_for_selection__area = document.querySelector(Languages.selectors.get('Область кнопок изучаемых языков для выбора'));

    // set_studied_language_for_exchanging()
    static studied_languages_for_switching__buttons = document.querySelectorAll(Languages.selectors.get('Кнопки изучаемых языков для переключения'));

    // exchange_form_all()
    static all_languages__buttons = document.querySelectorAll(Languages.selectors.get('Кнопки всех языков'));
    static studied_languages_for_switching__area = document.querySelector(Languages.selectors.get('Область кнопок изучаемых языков для переключения'));

    // remove_studied()
    static all_languages__area = document.querySelector(Languages.selectors.get('Область отображения всех языков'));
    static language_selected_from_all__template = document.querySelector(Languages.selectors.get('Шаблон кнопки выбора языка из числа всех'));

    // exchange_from_studied()
    static studied_languages_for_selection__buttons = document.querySelectorAll(Languages.selectors.get('Кнопки изучамых языков для выбора'));

    // change_for_user()
    static change_language__button = document.querySelector(Languages.selectors.get('Кнопка изменения языка'));
    // set_active_color_for_active_language
    // unset_active_color_for_active_language
    static quick_access_language_switcher__area = document.querySelector(Languages.selectors.get('Область кнопок для быстрого переключения между изучаемыми языками'));
    // add_studied_in_quick_access
    static quick_access_studied_language__template = document.querySelector(Languages.selectors.get('Шаблон кнопки изучаемого языка для панели быстрого доступа'));





    static language = {};
    static interact_with;
    static studied_language_for_exchanging = false;
    static uncorrected_errors_left = 0;

    // Наличие ошибок в поле: 1 - имеется, 2 - не имеется
    static #error_name = 0;
    static #error_foldername = 0;
    static #error_mark = 0;





    static set_interaction_to_studied() {
        Languages.interact_with = 'studied';
    }

    static set_interaction_to_main() {
        Languages.interact_with = 'main';
    }

    static set_studied_language_for_exchanging() {
        Languages.studied_language_for_exchanging = this.dataset.mark;
    }

    static reset_studied_language_for_exchanging() {
        Languages.studied_language_for_exchanging = false;
    }

    static add_new(event) {
        event.preventDefault();
        let data = new FormData(Languages.new_language__form);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/randomizer/createNewLanguage');
        xhr.send(data);
        xhr.responseType = 'json';
        xhr.onload = () => {
            Languages.reset_errors();
        };
        xhr.onloadend = () => {
            // alert(xhr.response);
            // return;
            if(xhr.response === null) alert('Произошла ошибка в add_new!');
            else if(xhr.response.hasOwnProperty('updated')) {
                Languages.language.name = Languages.#name.value;
                Languages.language.foldername = Languages.#foldername.value;
                Languages.language.mark = Languages.#mark.value;
                Languages.language.kanji = (Languages.#kanji.checked) ? 'true' : '';
                Languages.#clear_fields();
                switch(Languages.interact_with) {
                    case 'studied':
                        Languages.add_studied(Languages.language.mark);
                        break;
                    case 'main':
                        Languages.add_main(Languages.language.mark);
                        break;
                }
            }
            else if(xhr.response.hasOwnProperty('fields')) {
                let at_least_one_error_exists = false;
                for(const field of xhr.response.fields) {
                    switch(field) {
                        case 'alert':
                            alert(xhr.response.fields);
                            break;
                        case 'name':
                            if(at_least_one_error_exists)
                                Languages.#errors.append(document.createElement('br'));
                            Languages.#errors.append(xhr.response.name);
                            Languages.#name.style.color = '#f00';
                            Languages.#name.style.borderColor = '#f00';
                            Languages.#error_name = 1;
                            at_least_one_error_exists = true;
                            break;
                        case 'foldername':
                            if(at_least_one_error_exists)
                                Languages.#errors.append(document.createElement('br'));
                            Languages.#errors.append(xhr.response.foldername);
                            Languages.#foldername.style.color = '#f00';
                            Languages.#foldername.style.borderColor = '#f00';
                            Languages.#error_foldername = 1;
                            at_least_one_error_exists = true;
                            break;
                        case 'mark':
                            if(at_least_one_error_exists)
                                Languages.#errors.append(document.createElement('br'));
                            Languages.#errors.append(xhr.response.mark);
                            Languages.#mark.style.color = '#f00';
                            Languages.#mark.style.borderColor = '#f00';
                            Languages.#error_mark = 1;
                            at_least_one_error_exists = true;
                            break;
                    }
                }
            }
            else if(xhr.response.hasOwnProperty('redirect'))
                location.href = '/auth/view';
        };
    }

    static add_studied(_language_mark) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `/randomizer/addStudiedLanguage/${_language_mark}`);
        xhr.send();
        xhr.responseType = 'json';
        xhr.onloadend = () => {
            if(xhr.response === null) alert('Произошла ошибка в add_studied!');
            else if(xhr.response.hasOwnProperty('updated')) {
                Languages.#add_studied_for_switching(xhr.response.id);
                Languages.#add_studied_for_selection(xhr.response.id);
                Languages.add_studied_in_quick_access(xhr.response.id);
                Languages.#show_actions();
                FrontendLanguages.define_good_borders_for_all_languages();
                FrontendLanguages.define_good_borders_for_studied_languages();
            }
            else if(xhr.response.hasOwnProperty('redirect'))
                location.href = '/auth/view';
        }
    }

    static add_main(_language_mark) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `/randomizer/addMainLanguage/${_language_mark}`);
        xhr.send();
        xhr.responseType = 'json';
        xhr.onloadend = () => {
            if(xhr.response === null) alert('Произошла ошибка в add_main!');
            else if(xhr.response.hasOwnProperty('updated')) {
                Languages.language = Languages.#update_main(xhr.response.id);
                Languages.#add_all_for_selection(Languages.language);
                FrontendLanguages.define_good_borders_for_all_languages();
            }
            else if(xhr.response.hasOwnProperty('redirect'));
        };
    }

    static exchange_from_all() {
        Languages.#write_language_params(this);
        switch(Languages.interact_with) {
            case 'studied':
                if(Languages.studied_language_for_exchanging) {
                    Languages.exchange_studied_from_all(
                        Languages.studied_language_for_exchanging,
                        this.dataset.mark,
                        this
                    );
                }
                else {
                    Languages.add_studied(this.dataset.mark);
                    Languages.#remove_studied_for_selection(this);
                    FrontendLanguages.disable_all_languages_block(true);
                    FrontendLanguages.define_good_borders_for_studied_languages();
                    FrontendLanguages.define_good_borders_for_all_languages();
                }
                break;
            case 'main':
                let xhr = new XMLHttpRequest();
                xhr.open('POST', `/randomizer/exchangeMainLanguage/${this.dataset.mark}`);
                xhr.send();
                xhr.responseType = 'json';
                xhr.onloadend = () => {
                    if(xhr.response === null) alert('Произошла ошибка в exchange_main!');
                    else if(xhr.response.hasOwnProperty('updated')) {
                        Languages.#update_all_for_selection(this.dataset.mark, Languages.substitute_main_language__button);
                        Languages.#update_main();
                    }
                    else if(xhr.response.hasOwnProperty('redirect')) location.href = '/auth/view';
                };
                break;
        }
    }

    static exchange_from_studied() {
        Languages.#write_language_params(this);
        let xhr_for_exchanging_studied = new XMLHttpRequest();
        xhr_for_exchanging_studied.open('POST', `/randomizer/exchangeStudiedLanguage/${this.dataset.mark}/${Languages.substitute_main_language__button.dataset.mark}`)
        xhr_for_exchanging_studied.send();
        xhr_for_exchanging_studied.responseType = 'json';
        xhr_for_exchanging_studied.onloadend = () => {
            if(xhr_for_exchanging_studied.response === null) alert('Произошла ошибка в exchange_from_studied на первой отправке!');
            else if(xhr_for_exchanging_studied.response.hasOwnProperty('updated'));
            else if(xhr_for_exchanging_studied.response.hasOwnProperty('redirect'))
                location.href = '/auth/view';
        };

        let xhr = new XMLHttpRequest();
        xhr.open('POST', `/randomizer/exchangeMainLanguage/${this.dataset.mark}`);
        xhr.send();
        xhr.responseType = 'json';
        xhr.onloadend = () => {
            if(xhr.response === null) alert('Произошла ошибка в exchange_from_studied!');
            else if(xhr.response.hasOwnProperty('updated')) {
                let language = Languages.#update_main();
                Languages.#update_studied_for_switching(this.dataset.mark, language);
                Languages.#update_studied_for_selection(this.dataset.mark, language);
            }
            else if(xhr.response.hasOwnProperty('redirect')) location.href = '/auth/view';
        };
    }

    static exchange_studied_from_all(_what_exchange, _exchange_on, selected_language) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `/randomizer/exchangeStudiedLanguage/${_what_exchange}/${_exchange_on}`);
        xhr.send();
        xhr.responseType = 'json';
        xhr.onloadend = () => {
            if(xhr.response === null) alert('Произошла ошибка в exchange_studied!');
            else if(xhr.response.hasOwnProperty('updated')) {
                let language = Languages.#update_studied_for_switching(Languages.studied_language_for_exchanging, Languages.language);
                Languages.#update_studied_for_selection(Languages.studied_language_for_exchanging, Languages.language);
                Languages.update_studied_in_quick_access(Languages.studied_language_for_exchanging, Languages.language);
                Languages.#update_all_for_selection(selected_language.dataset.mark, language);
                FrontendLanguages.deactivate_active_language_button();
                FrontendLanguages.active_language = false;
            }
            else if(xhr.response.hasOwnProperty('redirect'))
                location.href = '/auth/view';
        };
    }

    static remove_studied() {
        if(Languages.studied_language_for_exchanging) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', `/randomizer/removeStudiedLanguage/${Languages.studied_language_for_exchanging}`);
            xhr.send();
            xhr.responseType = 'json';
            xhr.onloadend = () => {
                if(xhr.response === null) alert('Произошла ошибка в delete_studied!');
                else if(xhr.response.hasOwnProperty('updated')) {
                    let removing_studied_language_for_switching = Languages.studied_languages_for_switching__area.querySelector(`button[data-mark="${Languages.studied_language_for_exchanging}"]`);
                    let removing_studied_language_for_selection = Languages.studied_languages_for_selection__area.querySelector(`button[data-mark="${Languages.studied_language_for_exchanging}"]`);
                    let removing_studied_language_from_quick_access = Languages.quick_access_language_switcher__area.querySelector(`button[data-mark="${Languages.studied_language_for_exchanging}"]`);
                    Languages.#add_all_for_selection(removing_studied_language_for_switching);
                    removing_studied_language_for_switching.remove();
                    removing_studied_language_for_selection.remove();
                    removing_studied_language_from_quick_access.remove();
                    Lists.unset_active_language_on_server();
                    Lists.unset_active_language_mark();
                    Lists.reset_selected_list_id();
                    Lists.hide_mode_switcher();
                    Lists.clear_words_area();
                    Lists.insert_empty_rows('Выберите изучаемый язык');
                    if(Languages.quick_access_language_switcher__area.children.length === 1) {
                        Languages.quick_access_language_switcher__area.style.display = 'none';
                        Lists.mode_switcher__area.style.display = 'none';
                    }
                    FrontendLanguages.define_good_borders_for_studied_languages();
                    FrontendLanguages.define_good_borders_for_all_languages();
                    FrontendLanguages.active_language = false;
                    FrontendLanguages.disable_additional_section();
                    FrontendLanguages.editing_learning_language_button_unset_active_color();
                    Languages.studied_language_for_exchanging = false;
                    let studied_languages = document.querySelectorAll(Languages.selectors.get('Кнопки изучаемых языков для переключения'));
                    if(studied_languages.length === 0)
                        Languages.#hide_actions();
                    Adaptive.defineDevice();
                }
                else if(xhr.response.hasOwnProperty('redirect'))
                    location.href = '/auth/view';
            };
        }
    }

    static change_for_user(event) {
        let language = {};
        language.name = Languages.#name.value;
        language.foldername = Languages.#foldername.value;
        language.mark = Languages.#mark.value;
        language.kanji = (Languages.#kanji.checked) ? 'true' : '';
        event.preventDefault();
        let data = new FormData(Languages.new_language__form);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `/randomizer/changeLanguageParams/${Languages.studied_language_for_exchanging}`);
        xhr.send(data);
        xhr.responseType = 'json';
        xhr.onloadend = () => {
            if(xhr.response === null) alert('Произошла ошибка в change_for_user!');
            else if(xhr.response.hasOwnProperty('updated')) {
                language.id = xhr.response.id;
                Languages.#update_studied_for_selection(Languages.studied_language_for_exchanging, language);
                Languages.update_studied_in_quick_access(Languages.studied_language_for_exchanging, language)
                Languages.#update_studied_for_switching(Languages.studied_language_for_exchanging, language);
                Languages.#clear_fields();
            }
            else if(xhr.response.hasOwnProperty('redirect'))
                location.href = '/auth/view';
            // alert(xhr.response);
        };
    }





    static update_studied_in_quick_access(_language_mark, _language_data) {
        let language_button = Languages.quick_access_language_switcher__area.querySelector(`button[data-mark="${_language_mark}"]`);
        Lists.active_language_mark =
        language_button.textContent = 
        language_button.dataset.mark = _language_data.mark;
        language_button.dataset.kanji = _language_data.kanji;
        language_button.dataset.id = _language_data.id;
    }

    static #update_studied_for_switching(_language_mark, _language_data) {
        let language_button = Languages.studied_languages_for_switching__area.querySelector(`button[data-mark="${_language_mark}"]`);
        let language = Languages.#write_language_params(language_button, false);
        Languages.#update(language_button, _language_data);
        return language;
    }

    static #update_studied_for_selection(_language_mark, _language_data) {
        let language_button = Languages.studied_languages_for_selection__area.querySelector(`button[data-mark="${_language_mark}"]`);
        let language = Languages.#write_language_params(language_button, false);
        Languages.#update(language_button, _language_data);
        return language;
    }

    static #update_all_for_selection(_language_mark, _language_data) {
        let language_button = Languages.all_languages__area.querySelector(`button[data-mark="${_language_mark}"]`);
        let language = Languages.#write_language_params(language_button, false);
        Languages.#update(language_button, _language_data);
        return language;
    }

    static #update(_language_button, _language_data) {
        if(_language_data.dataset) {
            _language_button.textContent = 
            _language_button.dataset.language = _language_data.dataset.language;
            _language_button.dataset.folder = _language_data.dataset.folder;
            _language_button.dataset.mark = _language_data.dataset.mark;
            _language_button.dataset.kanji = _language_data.dataset.kanji;
            _language_button.dataset.id = _language_data.dataset.id;
        }
        else {
            _language_button.textContent = 
            _language_button.dataset.language = _language_data.name;
            _language_button.dataset.folder = _language_data.foldername;
            _language_button.dataset.mark = _language_data.mark;
            _language_button.dataset.kanji = _language_data.kanji;
            _language_button.dataset.id = _language_data.id;
        }
    }

    /**
     * Возвращает исходные параметры основного языка в виде обьекта
     * и после обновляет их
     */

    static #update_main(_lang_id = false) {
        let language = {};
        language.name = Languages.substitute_main_language__button.dataset.language;
        language.foldername = Languages.substitute_main_language__button.dataset.folder;
        language.mark = Languages.substitute_main_language__button.dataset.mark;
        language.kanji = Languages.substitute_main_language__button.dataset.kanji;
        language.id = Languages.substitute_main_language__button.dataset.id;
        Languages.substitute_main_language__button.textContent = Languages.language.name + ' язык';
        Languages.substitute_main_language__button.dataset.language = Languages.language.name;
        Languages.substitute_main_language__button.dataset.folder = Languages.language.foldername;
        Languages.substitute_main_language__button.dataset.mark = Languages.language.mark;
        Languages.substitute_main_language__button.dataset.kanji = Languages.language.kanji;
        Languages.substitute_main_language__button.dataset.id = _lang_id;
        Lists.define_native_language();
        return language;
    }

    static #clear_fields() {
        Languages.#name.value = '';
        Languages.#foldername.value = '';
        Languages.#mark.value = '';
        Languages.#kanji.checked = false;
    }

    static add_studied_in_quick_access(_lang_id) {
        let clone = Languages.quick_access_studied_language__template.content.cloneNode(true);
        let studied_language_from_switching_area_in_settings = Languages.studied_languages_for_switching__area.querySelector(`button[data-mark="${Languages.language.mark}"]`);
        studied_language_from_switching_area_in_settings.addEventListener('click', Lists.get_lists_from_another_language);
        let language_button = clone.querySelector('button');
        language_button.textContent = 
        language_button.dataset.mark = Languages.language.mark;
        language_button.dataset.kanji = Languages.language.kanji;
        language_button.dataset.id = _lang_id;
        language_button.addEventListener('click', Lists.get_lists_from_another_language);
        Languages.quick_access_language_switcher__area.append(language_button);
        Languages.quick_access_language_switcher__area.style.display = '';
        Adaptive.defineDevice();
        language_button.click();
    }

    static #add_studied_for_switching(_lang_id) {
        let clone = Languages.studied_language_for_switching__template.content.cloneNode(true);
        let button = clone.querySelector('button');
        button.addEventListener('click', FrontendLanguages.select_learning_language);
        button.addEventListener('click', Languages.set_studied_language_for_exchanging);
        button.addEventListener('click', Languages.set_interaction_to_studied);
        button.id = 
        button.textContent = 
        button.dataset.language = Languages.language.name;
        button.dataset.folder = Languages.language.foldername;
        button.dataset.mark = Languages.language.mark;
        button.dataset.kanji = Languages.language.kanji;
        button.dataset.id = _lang_id;
        Languages.add_studied_language__button.before(button);
    }

    static #add_studied_for_selection(_lang_id) {
        let clone = Languages.studied_language_for_selection__template.content.cloneNode(true);
        let button = clone.querySelector('button');
        button.textContent = 
        button.dataset.language = Languages.language.name;
        button.dataset.folder = Languages.language.foldername;
        button.dataset.mark = Languages.language.mark;
        button.dataset.kanji = Languages.language.kanji;
        button.dataset.id = _lang_id;
        Languages.studied_languages_for_selection__area.append(button);
    }

    static #add_all_for_selection(language) {
        let clone = Languages.language_selected_from_all__template.content.cloneNode(true);
        let language_button_for_adding = clone.querySelector('button');
        language_button_for_adding.addEventListener('click', Languages.exchange_from_all);
        if(language.dataset) {
            language_button_for_adding.textContent = 
            language_button_for_adding.dataset.language = language.dataset.language;
            language_button_for_adding.dataset.folder = language.dataset.folder;
            language_button_for_adding.dataset.mark = language.dataset.mark;
            language_button_for_adding.dataset.kanji = language.dataset.kanji;
            language_button_for_adding.dataset.id = language.dataset.id;
        }
        else {
            language_button_for_adding.textContent = 
            language_button_for_adding.dataset.language = language.name;
            language_button_for_adding.dataset.folder = language.foldername;
            language_button_for_adding.dataset.mark = language.mark;
            language_button_for_adding.dataset.kanji = language.kanji;
            language_button_for_adding.dataset.id = language.id;
        }
        Languages.all_languages__area.append(language_button_for_adding);
    }

    static #remove_studied_for_selection(button) {
        button.remove();
    }

    static #write_language_params(_language_data, _default_location = true) {
        if(_default_location) {
            Languages.language.name = _language_data.dataset.language;
            Languages.language.foldername = _language_data.dataset.folder;
            Languages.language.mark = _language_data.dataset.mark;
            Languages.language.kanji = _language_data.dataset.kanji;
            Languages.language.id = _language_data.dataset.id;
        }
        else {
            let language = {};
            language.name = _language_data.dataset.language;
            language.foldername = _language_data.dataset.folder;
            language.mark = _language_data.dataset.mark;
            language.kanji = _language_data.dataset.kanji;
            language.id = _language_data.dataset.id;
            return language;
        }
    }

    static #show_actions() {
        Languages.edit_studied_language__button.style.display = '';
        Languages.remove_studied_language__button.style.display = '';
    }

    static #hide_actions() {
        Languages.edit_studied_language__button.style.display = 'none';
        Languages.remove_studied_language__button.style.display = 'none';
    }





    static default_colors_for_name() {
        Languages.#name.style.color = '';
        Languages.#name.style.borderColor = '';
        Languages.#error_name = 0;
        Languages.#summarize_all_errors();
        Languages.#clear_error_messages();
    }

    static default_colors_for_foldername() {
        Languages.#foldername.style.color = '';
        Languages.#foldername.style.borderColor = '';
        Languages.#error_foldername = 0;
        Languages.#summarize_all_errors();
        Languages.#clear_error_messages();
    }

    static default_colors_for_mark() {
        Languages.#mark.style.color = '';
        Languages.#mark.style.borderColor = '';
        Languages.#error_mark = 0;
        Languages.#summarize_all_errors();
        Languages.#clear_error_messages();
    }

    static #clear_error_messages() {
        if(Languages.uncorrected_errors_left === 0)
            Languages.#errors.textContent = '';
    }

    static #summarize_all_errors() {
        Languages.uncorrected_errors_left = 
        Languages.#error_name + 
        Languages.#error_foldername + 
        Languages.#error_mark;
    }

    static reset_errors() {
        Languages.default_colors_for_name();
        Languages.default_colors_for_foldername();
        Languages.default_colors_for_mark();
        Languages.#errors.textContent = '';
    }





    /**
     * Функции внешнего вида
     */

    static set_active_color_for_active_language(_language_mark) {
        let language_button_from_settings = Languages.studied_languages_for_switching__area.querySelector(`button[data-mark="${_language_mark}"]`);
        let language_button_from_quick_access = Languages.quick_access_language_switcher__area.querySelector(`button[data-mark="${_language_mark}"]`);
        language_button_from_settings.style.color = UserInterface.language_selection_color;
        language_button_from_quick_access.style.color = UserInterface.language_selection_color;
    }

    static unset_active_color_for_active_language(_language_mark) {
        let language_button_from_settings = Languages.studied_languages_for_switching__area.querySelector(`button[data-mark="${_language_mark}"]`);
        let language_button_from_quick_access = Languages.quick_access_language_switcher__area.querySelector(`button[data-mark="${_language_mark}"]`);
        language_button_from_settings.style.color = '';
        language_button_from_quick_access.style.color = '';
    }
}

export {Languages};

document.addEventListener('DOMContentLoaded', function() {
    Languages.create_new_language__button.addEventListener('click', Languages.add_new);
    Languages.add_studied_language__button.addEventListener('click', Languages.set_interaction_to_studied);
    Languages.add_studied_language__button.addEventListener('click', Languages.reset_studied_language_for_exchanging);
    Languages.substitute_main_language__button.addEventListener('click', Languages.reset_studied_language_for_exchanging);
    Languages.remove_studied_language__button.addEventListener('click', Languages.remove_studied);
    Languages.name_field.addEventListener('input', Languages.default_colors_for_name);
    Languages.foldername_field.addEventListener('input', Languages.default_colors_for_foldername);
    Languages.mark_field.addEventListener('input', Languages.default_colors_for_mark);
    FrontendLanguages.clear_errors_function = Languages.reset_errors;
    for(const button of Languages.studied_languages_for_switching__buttons) {
        button.addEventListener('click', Languages.set_studied_language_for_exchanging);
        button.addEventListener('click', Languages.set_interaction_to_studied);
    }
    for(const button of Languages.all_languages__buttons) {
        button.addEventListener('click', Languages.exchange_from_all);
    }
    Languages.substitute_main_language__button.addEventListener('click', Languages.set_interaction_to_main);
    for(const button of Languages.studied_languages_for_selection__buttons) {
        button.addEventListener('click', Languages.exchange_from_studied);
    }
    Languages.change_language__button.addEventListener('click', Languages.change_for_user);
});