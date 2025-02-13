class WordsTypes {
    static selectors = new Map([
        ['Изучаемые языки', '.languages-additional-languages-list__button_studied-language'],
        ['Кнопки переключения режима изучения', '.other-modes__button'],
    ]);





    static studied_languages = document.querySelectorAll(WordsTypes.selectors.get('Изучаемые языки'));
    static switcher__buttons = document.querySelectorAll(WordsTypes.selectors.get('Кнопки переключения режима изучения'));
    




    static disabled_section__index = false;
    static shown_section__index;
    static hidden_section__index;
    static sections;





    static defineSections() {
        let setDefaultParams = () => {
            WordsTypes.sections = ['source', 'translation'];
            WordsTypes.shown_section__index = 0;
            WordsTypes.hidden_section__index = 1;
        };
        if(WordsTypes.studied_languages.length) {
            if(WordsTypes.studied_languages[0].dataset.kanji) {
                WordsTypes.sections = ['source', 'transcription', 'translation'];
                WordsTypes.shown_section__index = 0;
                WordsTypes.hidden_section__index = 1;
                WordsTypes.disabled_section__index = 2;
            }
            else setDefaultParams();
        }
        else setDefaultParams();
    }

    static getShownSectionType() {
        return WordsTypes.sections[WordsTypes.shown_section__index];
    }

    static getHiddenSectionType() {
        return WordsTypes.sections[WordsTypes.hidden_section__index];
    }

    static getDisabledSectionType() {
        return WordsTypes.sections[WordsTypes.disabled_section__index];
    }

    static setActiveSectionIndex(switcher) {
        if(switcher.dataset.type_index == WordsTypes.disabled_section__index) {
            WordsTypes.disabled_section__index = WordsTypes.hidden_section__index;
            WordsTypes.hidden_section__index = WordsTypes.shown_section__index;
            WordsTypes.shown_section__index = switcher.dataset.type_index;
        }
        else if(switcher.dataset.type_index == WordsTypes.hidden_section__index) 
            WordsTypes.switchActiveSectionIndex();
    }

    static switchActiveSectionIndex() {
        [WordsTypes.shown_section__index, WordsTypes.hidden_section__index] = 
        [WordsTypes.hidden_section__index, WordsTypes.shown_section__index];
    }
}

export {WordsTypes};

document.addEventListener('DOMContentLoaded', function() {
    WordsTypes.defineSections();
    // for(const button of WordsTypes.switcher__buttons) 
        // button.addEventListener('click', WordsTypes.setActiveSectionIndex);
});