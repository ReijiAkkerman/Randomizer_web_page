class Swipes {
    static selectors = new Map([
        ['Красная панель', '.red'],
        ['Синяя панель', '.blue'],
        ['Белая панель', '.white'],
    ]);

    static red = document.querySelector(Swipes.selectors.get('Красная панель'));
    static blue = document.querySelector(Swipes.selectors.get('Синяя панель'));
    static white = document.querySelector(Swipes.selectors.get('Белая панель'));

    static startX = false;
    static touchX = false;

    static panel_number = 1;
    static touchend = true;





    // static show_left_panel(event) {
    //     Swipes.initial_position(event);
    //     Swipes.current_position(event);
    // }

    // static show_right_panel(event) {
    //     Swipes.#initial_position(event);
    //     Swipes.#current_position(event);
        
    // }

    static define_direction() {
        if(Swipes.touchend) {
            if(Swipes.startX < Swipes.touchX) {
                Swipes.panel_number--;
            }
            else {
                Swipes.panel_number++;
            }
            Swipes.touchend = false;
        }
    }

    static initial_position(event) {
        Swipes.startX = event.touches[0].clientX;
    }

    static current_position(event) {
        Swipes.touchX = event.touches[0].clientX;
        Swipes.define_direction();
        Swipes.#show();
    }

    static #show() {
        switch(Swipes.panel_number) {
            case 0:
                Swipes.#show_red();
                break;
            case 1: 
                Swipes.#show_white();
                break;
            case 2:
                Swipes.#show_blue();
                break;
        }
    }

    static #show_red() {
        Swipes.white.style.display = 'none';
        Swipes.blue.style.display = 'none';
        Swipes.red.style.display = '';
    }

    static #show_white() {
        Swipes.red.style.display = 'none';
        Swipes.blue.style.display = 'none';
        Swipes.white.style.display = '';
    }

    static #show_blue() {
        Swipes.red.style.display = 'none';
        Swipes.white.style.display = 'none';
        Swipes.blue.style.display = '';
    }
}

document.addEventListener('touchstart', Swipes.initial_position);
document.addEventListener('touchmove', Swipes.current_position);
document.addEventListener('touchend', function() {
    Swipes.touchend = true;
});