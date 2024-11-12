import {QuickAccess} from "/src/js/Dashboard/QuickAccess.js";
import {Words} from '/src/js/MainFrame/Words.js';

class Settings {
    static selectors = new Map([
        ['Раздел настроек', '.settings'],
        ['Кнопка закрытия настроек', '.theme_close-settings'],
    ]);



    /**
     * Отображение раздела
     */

    static main_section = document.querySelector(Settings.selectors.get('Раздел настроек'));
    static close_main_section_button = document.querySelector(Settings.selectors.get('Кнопка закрытия настроек'));





    /**
     * Отображение раздела
     */

    static show_section() {
        Settings.main_section.style.display = '';
    }

    static hide_section() {
        Settings.main_section.style.display = 'none';
    }

    static close() {
        Settings.hide_section();
        QuickAccess.settings_button_unset_active_color();
        QuickAccess.functionality = 'words';
        Words.show_section();
    }
}

export {Settings};

document.addEventListener('DOMContentLoaded', function() {
    Settings.close_main_section_button.addEventListener('click', Settings.close);
});