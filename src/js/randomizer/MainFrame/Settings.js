import {QuickAccess} from "/src/js/randomizer/Dashboard/QuickAccess.js";
import {Words} from '/src/js/randomizer/MainFrame/Words.js';
import {Swipes} from '/src/js/randomizer/mobile/Swipes.js';
import {Adaptive} from '/src/js/randomizer/Adaptive.js';

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
        Adaptive.remember_settings_window();
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
    Settings.close_main_section_button.addEventListener('click', Swipes.set_default_panel_number);
    Settings.close_main_section_button.addEventListener('click', Swipes.reset_values);
});