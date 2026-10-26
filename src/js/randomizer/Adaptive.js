class Adaptive {
    static #timeout = false;
    static #delay = 1;
    static mobile = false;
    static tablet = false;
    static desktop = false;





    static current_mode = 'words';





    static selectors = new Map([
        ['Навигационная панель', '.dashboard'],
        ['Слова', '.words'],
        ['Настройки', '.settings'],
        ['Руководство', '.guide'],

        ['Панель языков для быстрого доступа', '.other-languages'],
    ]);





    static dashboard = document.querySelector(Adaptive.selectors.get('Навигационная панель'));
    static words = document.querySelector(Adaptive.selectors.get('Слова'));
    static settings = document.querySelector(Adaptive.selectors.get('Настройки'));
    static guide = document.querySelector(Adaptive.selectors.get('Руководство'));

    static quick_access_languages__bar = document.querySelector(Adaptive.selectors.get('Панель языков для быстрого доступа'));
    static #device = false;





    static defineDevice() {
        if(window.innerWidth <= 1050) {
            Adaptive.resizeWindow(Adaptive.#mobile);
            Adaptive.set_quick_access_languages_for_mobile();
            Adaptive.#device = 'mobile';
        }
        else {
            if(Adaptive.current_mode === 'dashboard')
                Adaptive.current_mode = 'words';
            Adaptive.resizeWindow(Adaptive.#desktop);
            Adaptive.set_quick_access_languages_for_desktop();
            Adaptive.#device = 'desktop';
        }
    }

    static resizeWindow(method) {
        clearTimeout(Adaptive.#timeout);
        Adaptive.#timeout = setTimeout(method, Adaptive.#delay);
    }

    static getDevice() {
        return Adaptive.#device;
    }





    static #mobile() {
        switch(Adaptive.current_mode) {
            case 'words':
                Adaptive.#hideDashboard();
                Adaptive.#hideGuide();
                Adaptive.#hideSettings();
                Adaptive.#showWords();
                break;
            case 'settings':
                Adaptive.#hideWords();
                Adaptive.#hideGuide();
                Adaptive.#hideDashboard();
                Adaptive.#showSettings();
                break;
            case 'guide':
                Adaptive.#hideWords();
                Adaptive.#hideSettings();
                Adaptive.#hideDashboard();
                Adaptive.#showGuide();
                break;
            case 'dashboard':
                Adaptive.#hideWords();
                Adaptive.#hideSettings();
                Adaptive.#hideGuide();
                Adaptive.#showDashboard();
                break;
        }

        // Adaptive.#hideDashboard();
        // Adaptive.#hideSettings();
        // Adaptive.#hideGuide();
        // Adaptive.#showWords();
    }

    static #desktop() {
        Adaptive.#showDashboard();
        switch(Adaptive.current_mode) {
            case 'words':
                Adaptive.#hideGuide();
                Adaptive.#hideSettings();
                Adaptive.#showWords();
                break;
            case 'settings':
                Adaptive.#hideWords();
                Adaptive.#hideGuide();
                Adaptive.#showSettings();
                break;
            case 'guide':
                Adaptive.#hideWords();
                Adaptive.#hideSettings();
                Adaptive.#showGuide();
                break;
        }

        // Adaptive.#hideSettings();
        // Adaptive.#hideGuide();
        // Adaptive.#showDashboard();
        // Adaptive.#showWords();
    }

    static #tablet() {

    }





    static #showDashboard() {
        Adaptive.dashboard.style.display = '';
    }

    static #showWords() {
        Adaptive.words.style.display = '';
    }

    static #showSettings() {
        Adaptive.settings.style.display = '';
    }

    static #showGuide() {
        Adaptive.guide.style.display = '';
    }

    static #hideDashboard() {
        Adaptive.dashboard.style.display = 'none';
    }

    static #hideWords() {
        Adaptive.words.style.display = 'none';
    }

    static #hideSettings() {
        Adaptive.settings.style.display = 'none';
    }

    static #hideGuide() {
        Adaptive.guide.style.display = 'none';
    }





    /**
     * Методы для сохранения открытого режима неизменным после ресайза
     */    

    static remember_words_window() {
        Adaptive.current_mode = 'words';
    }

    static remember_settings_window() {
        Adaptive.current_mode = 'settings';
    }

    static remember_guide_window() {
        Adaptive.current_mode = 'guide';
    }

    static remember_dashboard_window() {
        Adaptive.current_mode = 'dashboard';
    }





    static set_quick_access_languages_for_mobile() {
        let first_button_index = 1;
        let buttons_amount = Adaptive.quick_access_languages__bar.children.length - first_button_index;
        if(buttons_amount < first_button_index);
        else {
            for(let i = first_button_index; i <= buttons_amount; i++) {
                // здесь указывается максимальный размер панели
                if(i < 3)
                    Adaptive.quick_access_languages__bar.children[i].style.display = '';
                else 
                    Adaptive.quick_access_languages__bar.children[i].style.display = 'none';
            }
        }
    }

    static set_quick_access_languages_for_desktop() {
        let first_button_index = 1;
        let buttons_amount = Adaptive.quick_access_languages__bar.children.length - first_button_index;
        if(buttons_amount < first_button_index);
        else {
            for(let i = first_button_index; i <= buttons_amount; i++) {
                // здесь указывается максимальный размер панели
                if(i < 4)
                    Adaptive.quick_access_languages__bar.children[i].style.display = '';
                else 
                    Adaptive.quick_access_languages__bar.children[i].style.display = 'none';
            }
        }
    }
}

export {Adaptive};

window.addEventListener('resize', Adaptive.defineDevice);

Adaptive.defineDevice();