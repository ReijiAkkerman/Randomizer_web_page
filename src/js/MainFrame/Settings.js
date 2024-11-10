class Settings {
    static selectors = new Map([
        ['Раздел настроек', '.settings'],
    ]);



    /**
     * Отображение раздела
     */

    static main_section = document.querySelector(Settings.selectors.get('Раздел настроек'));





    /**
     * Отображение раздела
     */

    static show_section() {
        Settings.main_section.style.display = '';
    }

    static hide_section() {
        Settings.main_section.style.display = 'none';
    }
}

export {Settings};