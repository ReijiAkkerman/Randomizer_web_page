class Git {
    static selectors = new Map([
        // setRepository()
        ['Репозиторий со списками слов', '.git-repo__input'],
        ['Форма репозитория со списками слов', '.git-repo__form'],

        // initRepository()
        ['Кнопка инициализации репозитория', '.git-repo__button_init-repository'],
        ['Элементы для отображения после инициализации репозитория', [
            '.git-branches_no-branches-info',
            '.git-branches-block',
            '.git-branches__div',
            '.git-branches__label',
            '.git-branches_error',
            '.git-branches__form',
        ]],
        ['Элементы для скрытия после инициализации репозитория', [
            '.git-repo__div',
            '.git-branches_no-repo-info',
        ]]
    ]);





    // setRepository()
    static repo = document.querySelector(Git.selectors.get('Репозиторий со списками слов'));
    static repo__form = document.querySelector(Git.selectors.get('Форма репозитория со списками слов'));

    // initRepository()
    static init_repository__button = document.querySelector(Git.selectors.get('Кнопка инициализации репозитория'));
    
    
    
    
    
    static setRepository(event) {
        event.preventDefault();
        let repo_regex = /^(https?|ftp|ssh|git):\/\/[a-zA-Z0-9/._+-]{1,240}\.git$/;
        if(repo_regex.test(Git.repo.value)) {
            let data = new FormData(Git.repo__form);
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/randomizer/setRepository');
            xhr.send(data);
            xhr.responseType = 'json';
            xhr.onloadend = () => {
                if(xhr.response.hasOwnProperty('updated'));
                else if(xhr.response.hasOwnProperty('redirect')) 
                    location.href = '/auth/view';
                else alert(xhr.response.alert);
                // alert(xhr.responseText);
            };
        }
    }

    static initRepository() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/randomizer/initRepository');
        xhr.send();
        xhr.responseType = 'json';
        xhr.onloadend = () => {
            if(xhr.response.hasOwnProperty('prepared')) {
                Git.#hideElementsAfterRepositoryInitialization();
                Git.#showElementsAfterRepositoryInitialization();
            }
            else if(xhr.response.hasOwnProperty('redirect'))
                localtion.href = '/auth/view';
            else alert(xhr.response.alert);
            // alert(xhr.response);
        };
    }

    static commit() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/randomizer/commit');
        xhr.send();
        xhr.responseType = 'text';
        xhr.onloadend = () => {
            alert(xhr.response);
        };
    }





    static #showElementsAfterRepositoryInitialization() {
        let elements = [];
        let iterable = Git.selectors.get('Элементы для отображения после инициализации репозитория')
        for(let selector of iterable) 
            elements.push(document.querySelector(selector));
        for(const element of elements)
            element.style.display = '';
    }

    static #hideElementsAfterRepositoryInitialization() {
        let elements = [];
        let iterable = Git.selectors.get('Элементы для скрытия после инициализации репозитория');
        for(let selector of iterable) 
            elements.push(document.querySelector(selector));
        for(const element of elements)
            element.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let element = document.querySelector('#commit');
    element.addEventListener('click', Git.commit);

    Git.repo.addEventListener('input', Git.setRepository);
    Git.init_repository__button.addEventListener('click', Git.initRepository);
});