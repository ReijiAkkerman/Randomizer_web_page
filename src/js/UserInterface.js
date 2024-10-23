class UserInterface {
    static text_color = '#000';

    static selectors = new Map([
        ['settings_panel', '.settings'],
        ['close-settings_button', '.theme_close-settings'],
        ['settings_button', '.other-utilities__button_settings'],
        ['switch-settings-to-languages_button', '.setups-switcher__button_languages'],
        ['switch-settings-to-git_button', '.setups-switcher__button_git'],
        ['languages_section', '.languages'],
        ['languages-additional-options_section', '.languages-add'],
        ['git_section', '.git'],
        ['open-languages-additional-options_button', '.languages-additional-languages-list__button_add-language'],
        ['add-language_header', '.languages-add-create__p_add-language'],
        ['edit-language_header', '.languages-add-create__p_edit-language'],
        ['existent-language_label', '.existent-language']
    ]);

    static settings_button_enabled = false;

    static close_settings() {
        let settings_panel = document.querySelector(UserInterface.selectors.get('settings_panel'));
        let settings_button = document.querySelector(UserInterface.selectors.get('settings_button'));
        let svg_of_settings_button = settings_button.firstElementChild;
        settings_panel.style.display = 'none';
        settings_button.style.borderColor = '';
        svg_of_settings_button.style.fill = '';
        UserInterface.settings_button_enabled = false;
    }

    static #open_settings() {
        let settings_panel = document.querySelector(UserInterface.selectors.get('settings_panel'));
        let settings_button = document.querySelector(UserInterface.selectors.get('settings_button'));
        let svg_of_settings_button = settings_button.firstElementChild;
        settings_panel.style.display = '';
        settings_button.style.borderColor = UserInterface.text_color;
        svg_of_settings_button.style.fill = UserInterface.text_color;
        UserInterface.settings_button_enabled = true;
    }

    static settings_button() {
        if(UserInterface.settings_button_enabled) UserInterface.close_settings();
        else UserInterface.#open_settings();
    }

    static switch_settings_to_languages() {
        let languages_button = document.querySelector(UserInterface.selectors.get('switch-settings-to-languages_button'));
        let git_button = document.querySelector(UserInterface.selectors.get('switch-settings-to-git_button'));
        let languages_section = document.querySelector(UserInterface.selectors.get('languages_section'));
        let git_section = document.querySelector(UserInterface.selectors.get('git_section'));
        git_button.style.color = '';
        git_section.style.display = 'none';
        languages_button.style.color = UserInterface.text_color;
        languages_section.style.display = '';
    }

    static switch_settings_to_git() {
        let languages_button = document.querySelector(UserInterface.selectors.get('switch-settings-to-languages_button'));
        let git_button = document.querySelector(UserInterface.selectors.get('switch-settings-to-git_button'));
        let languages_section = document.querySelector(UserInterface.selectors.get('languages_section'));
        let git_section = document.querySelector(UserInterface.selectors.get('git_section'));
        languages_button.style.color = '';
        languages_section.style.display = 'none';
        git_button.style.color = UserInterface.text_color;
        git_section.style.display = '';
        UserInterface.close_languages_additional_options();
    }

    static open_languages_additional_options(opened_language_type) {
        let additional_options_section = document.querySelector(UserInterface.selectors.get('languages-additional-options_section'));
        additional_options_section.style.display = '';
    }

    static close_languages_additional_options() {
        let additional_options_section = document.querySelector(UserInterface.selectors.get('languages-additional-options_section'));
        additional_options_section.style.display = 'none';
    }

    static set_editing_language_header() {
        let hiding_header = document.querySelector(UserInterface.selectors.get('add-language_header'));
        let exposing_header = document.querySelector(UserInterface.selectors.get('edit-language_header'));
        hiding_header.style.display = 'none';
        exposing_header.style.display = '';
    }

    static set_adding_language_header() {
        let hiding_header = document.querySelector(UserInterface.selectors.get('edit-language_header'));
        let exposing_header = document.querySelector(UserInterface.selectors.get('add-language_header'));
        hiding_header.style.display = 'none';
        exposing_header.style.display = '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let element = document.querySelector(UserInterface.selectors.get('close-settings_button'));
    element.addEventListener('click', UserInterface.close_settings);
    element = document.querySelector(UserInterface.selectors.get('settings_button'));
    element.addEventListener('click', UserInterface.settings_button);
    element = document.querySelector(UserInterface.selectors.get('switch-settings-to-languages_button'));
    element.addEventListener('click', UserInterface.switch_settings_to_languages);
    element = document.querySelector(UserInterface.selectors.get('switch-settings-to-git_button'));
    element.addEventListener('click', UserInterface.switch_settings_to_git);
    element = document.querySelector(UserInterface.selectors.get('open-languages-additional-options_button'));
    element.addEventListener('click', UserInterface.open_languages_additional_options);
    element.addEventListener('click', UserInterface.set_adding_language_header);
    let elements = document.querySelectorAll(UserInterface.selectors.get('existent-language_label'));
    for(const element of elements) {
        element.addEventListener('click', UserInterface.open_languages_additional_options);
        element.addEventListener('click', UserInterface.set_editing_language_header);
    }
});