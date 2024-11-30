import {Words} from '/src/js/MainFrame/Words.js';
import {Settings} from '/src/js/MainFrame/Settings.js';

/** Описание функций */
// сamelCase для разрешений
// snake_notation для обработки самого свайпа

class Swipes {
    static selectors = new Map([
        ['Навигационная панель', '.dashboard'],
        ['Скролл', 'main'],
        ['', ''],
    ]);

    static dashboard = document.querySelector(Swipes.selectors.get('Навигационная панель'));
    static main = document.querySelector(Swipes.selectors.get('Скролл'));

    static #panels = new Map([
        [0, Swipes.dashboard],
        [1, Words.main_section],
        [2, Settings.main_section],
    ]);

    static #startX;
    static #startY;
    static #currentX;
    static #currentY;
    static #deltaX;
    static #deltaY;
    static direction;
    static #panel_number = 1;
    static panel_edge = 'left';







    static set_initial_coordinates(event) {
        Swipes.#startX = event.touches[0].clientX;
        Swipes.#startY = event.touches[0].clientY;
    }

    static get_current_coordinates(event) {
        Swipes.#currentX = event.touches[0].clientX;
        Swipes.#currentY = event.touches[0].clientY;
        Swipes.#deltaX = Swipes.#startX - Swipes.#currentX;
        Swipes.#deltaY = Swipes.#startY - Swipes.#currentY;
    }

    static define_direction() {
        if(Swipes.#deltaX > 0) Swipes.direction = 'right';
        else Swipes.direction = 'left';
    }

    static switch_panel() {
        Swipes.#hide_current_panel();
        Swipes.#change_panel_number();
        Swipes.#show_next_panel();
    }

    static #change_panel_number() {
        switch(Swipes.direction) {
            case 'left':
                Swipes.#panel_number = --Swipes.#panel_number < 0 ? Swipes.#panels.size - 1 : Swipes.#panel_number;
                break;
            case 'right':
                Swipes.#panel_number = ++Swipes.#panel_number % Swipes.#panels.size;
                break;
        }
    }

    static #hide_current_panel() {
        let panel = Swipes.#panels.get(Swipes.#panel_number);
        panel.style.display = 'none';
    }

    static #show_next_panel() {
        let panel = Swipes.#panels.get(Swipes.#panel_number);
        panel.style.display = '';
    }

    static isRightRange() {
        let deltaX = Swipes.#to_positive(Swipes.#deltaX);
        let deltaY = Swipes.#to_positive(Swipes.#deltaY);
        return (deltaX > 40 && deltaY < 40) ? true : false;
    }

    static getPanelEdge() {
        const {scrollLeft, clientWidth, scrollWidth, clientLeft} = Swipes.main;
        if(clientWidth !== scrollWidth) {
            if(scrollLeft === clientLeft) Swipes.panel_edge = 'left';
            else if(scrollLeft + clientWidth >= scrollWidth - 1) Swipes.panel_edge = 'right';
            else Swipes.panel_edge = 'none';
        }
        else Swipes.panel_edge = 'both';
    }

    static reset_values() {
        Swipes.#startX,
        Swipes.#startY,
        Swipes.#currentX,
        Swipes.#currentY,
        Swipes.#deltaX,
        Swipes.#deltaY,
        Swipes.direction = undefined;
    }

    static #to_positive(num) {
        return num < 0 ? -num : num;
    }
}

document.addEventListener('touchstart', Swipes.set_initial_coordinates);
document.addEventListener('touchstart', Swipes.getPanelEdge);
document.addEventListener('touchmove', Swipes.get_current_coordinates);
document.addEventListener('touchend', () => {
    if(Swipes.isRightRange()) {
        Swipes.define_direction();
        if(Swipes.panel_edge === 'both') {
            Swipes.switch_panel();
            Swipes.reset_values();
        }
        else if(Swipes.panel_edge === Swipes.direction) {
            Swipes.switch_panel();
            Swipes.reset_values();
        }
    }
});