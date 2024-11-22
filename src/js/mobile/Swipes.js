import {Words} from '/src/js/MainFrame/Words.js';
import {Settings} from '/src/js/MainFrame/Settings.js';
import {Guide} from '/src/js/MainFrame/Guide.js';

class Swipes {
    static selectors = new Map([
        ['Навигационная панель', '.dashboard'],
        ['Скролл', 'main'],
    ]);

    static dashboard = document.querySelector(Swipes.selectors.get('Навигационная панель'));

    /** Работа */

    static #panels = new Map([
        [0, Swipes.dashboard],
        [1, Words.main_section],
        [2, Settings.main_section],
        // [3, Guide.main_section],
    ]);

    static show_permission = false;
    static #change_panel_number_permission = true;
    static #startX;
    static #startY;
    static #currentX;
    static #currentY;
    static #deltaX;
    static #deltaY;

    static #current_panel_number = 1;
    static #previous_panel_number = 1;

    static permit_right_panel_opening = false;
    static permit_left_panel_opening = true;
    static switching_permitted = true;
    static error_call = false;

    



    /**
     * Функции для работы непосредственно свайпа
     */

    static show_target_panel() {
        let panel = Swipes.#panels.get(Swipes.#current_panel_number);
        panel.style.display = '';
        Swipes.#previous_panel_number = Swipes.#current_panel_number;
        Swipes.#reset_positions();
    }

    static hide_current_panel() {
        let panel = Swipes.#panels.get(Swipes.#previous_panel_number);
        panel.style.display = 'none';
    }

    static get_initial_position(event) {
        Swipes.#startX = event.touches[0].clientX;
        Swipes.#startY = event.touches[0].clientY;
    }

    static get_current_position(event) {
        Swipes.#currentX = event.touches[0].clientX;
        Swipes.#currentY = event.touches[0].clientY;
    }

    static define_show_permission() {
        Swipes.#deltaX = Swipes.#currentX - Swipes.#startX;
        Swipes.#deltaY = Swipes.#currentY - Swipes.#startY;
        let deltaX = Swipes.#toPositive(Swipes.#deltaX);
        let deltaY = Swipes.#toPositive(Swipes.#deltaY);
        label_if: {
            if(deltaX > 40) {
                if(deltaY < 40) {
                    if(Swipes.#change_panel_number_permission) {
                        if(Swipes.#deltaX > 0)
                            if(Swipes.permit_left_panel_opening && Swipes.switching_permitted)
                                Swipes.#current_panel_number = --Swipes.#current_panel_number < 0 ? Swipes.#panels.size - 1 : Swipes.#current_panel_number;
                            else 
                                break label_if;
                        else 
                            if(Swipes.permit_right_panel_opening && Swipes.switching_permitted)
                                Swipes.#current_panel_number = ++Swipes.#current_panel_number % Swipes.#panels.size;
                            else 
                                break label_if;
                        Swipes.show_permission = true;
                        Swipes.#change_panel_number_permission = false;
                    }
                }
            }
        }
    }

    static define_swipe_direction() {
        if(Swipes.error_call)
            Swipes.error_call = false;
        else 
            Swipes.switching_permitted = false;
        let scrollableElement = document.querySelector(Swipes.selectors.get('Скролл'));
        if(scrollableElement.scrollLeft + scrollableElement.clientWidth >= scrollableElement.scrollWidth) 
            Swipes.permit_right_panel_opening = true;
        else 
            Swipes.permit_right_panel_opening = false;
        if(scrollableElement.scrollLeft === scrollableElement.clientLeft) 
            Swipes.permit_left_panel_opening = true;
        else 
            Swipes.permit_left_panel_opening = false;
    }

    /** 
     * Вспомогательные функции
     */

    static #toPositive(num) {
        return num < 0 ? -num : num;
    }

    static #reset_positions() {
        Swipes.show_permission = false;
        Swipes.#change_panel_number_permission = true;
        Swipes.#startX = undefined;
        Swipes.#startY = undefined;
        Swipes.#currentX = undefined;
        Swipes.#currentY = undefined;
        Swipes.#deltaX = undefined;
        Swipes.#deltaY = undefined;
    }
}

document.addEventListener('touchstart', (event) => {
    Swipes.get_initial_position(event);
});
document.addEventListener('touchmove', function(event) {
    Swipes.get_current_position(event);
});
document.addEventListener('touchend', function() {
    Swipes.define_show_permission();
    if(Swipes.show_permission) {
        Swipes.hide_current_panel();
        Swipes.show_target_panel();
        Swipes.define_swipe_direction();
        Swipes.error_call = true;
    }
    Swipes.switching_permitted = true;
});

document.addEventListener('DOMContentLoaded', function() {
    let element = document.querySelector(Swipes.selectors.get('Скролл'));
    element.addEventListener('scroll', Swipes.define_swipe_direction);
});