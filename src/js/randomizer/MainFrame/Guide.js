import {Adaptive} from '/src/js/randomizer/Adaptive.js';

class Guide {
    static selectors = new Map([
        ['Раздел руководства', '.guide'],
    ]);



    /**
     * Отображение раздела
     */

    static main_section = document.querySelector(Guide.selectors.get('Раздел руководства'));





    /**
     * Отображение раздела
     */

    static show_section() {
        Adaptive.remember_guide_window();
        Guide.main_section.style.display = '';
    }

    static hide_section() {
        Guide.main_section.style.display = 'none';
    }
}

export {Guide};