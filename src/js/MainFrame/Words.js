class Words {
    static selectors = new Map([
        ['Исходник', '.source'],
        ['Транскрипция', '.transcription'],
        ['Перевод', '.translation'],
    ]);



    // Исходник

    static source = document.querySelector(Words.selectors.get('Исходник'));

    // Транскрипция

    static transcription = document.querySelector(Words.selectors.get('Транскрипция'));

    // Перевод

    static translation = document.querySelector(Words.selectors.get('Перевод'));





    // Исходник

    static source_enable() {
        Words.source.style.display = '';
    }

    static source_disable() {
        Words.source.style.display = 'none';
    }



    // Транскрипция 

    static transcription_enable() {
        Words.transcription.style.display = '';
    }

    static transcription_disable() {
        Words.transcription.style.display = 'none';
    }



    // Перевод

    static translation_enable() {
        Words.translation.style.display = '';
    }

    static translation_disable() {
        Words.translation.style.display = 'none';
    }
}

export {Words};