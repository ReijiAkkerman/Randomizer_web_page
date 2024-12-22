class Adaptive {
    static #timeout = false;
    static #delay = 1;
    static mobile = false;
    static tablet = false;
    static desktop = false;





    static selectors = new Map([
        ['Навигационная панель', '.dashboard'],
        ['Слова', '.words'],
        ['Настройки', '.settings'],
        ['Руководство', '.guide'],
    ]);





    static dashboard = document.querySelector(Adaptive.selectors.get('Навигационная панель'));
    static words = document.querySelector(Adaptive.selectors.get('Слова'));
    static settings = document.querySelector(Adaptive.selectors.get('Настройки'));
    static guide = document.querySelector(Adaptive.selectors.get('Руководство'));





    static defineDevice() {
        if(window.innerWidth <= 1050) {
            Adaptive.resizeWindow(Adaptive.#mobile);
        }
        else {
            Adaptive.resizeWindow(Adaptive.#desktop);
        }
        Adaptive.#delay = 250;
    }

    static resizeWindow(method) {
        clearTimeout(Adaptive.#timeout);
        Adaptive.#timeout = setTimeout(method, Adaptive.#delay);
    }





    static #mobile() {
        Adaptive.#hideDashboard();
        Adaptive.#hideSettings();
        Adaptive.#hideGuide();
        Adaptive.#showWords();
    }

    static #desktop() {
        Adaptive.#hideSettings();
        Adaptive.#hideGuide();
        Adaptive.#showDashboard();
        Adaptive.#showWords();
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
}

window.addEventListener('resize', Adaptive.defineDevice);

Adaptive.defineDevice();