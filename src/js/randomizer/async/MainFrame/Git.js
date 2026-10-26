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
            '.git-branches_error',
            '.git-branches__form',
        ]],
        ['Элементы для скрытия после инициализации репозитория', [
            '.git-repo__div',
            '.git-branches_no-repo-info',
        ]],

        // createNewBranch
        ['Поле для ввода наименования новой ветки', '.git-branches__input[name="new_branch"]'],
        ['Область для вывода ошибок о новой ветке', '.git-branches_error'],
        ['Шаблон кнопки новой ветки', '.git-branches__template'],
        ['Область для вставки кнопок новых веток', '.git-branches-block'],
        ['Кнопка создания новой ветки', '.git-branches__button_create-branch'],
        ['Отметка о выводе списков со всех веток', '.git-branches__label'],
    ]);





    // setRepository()
    static repo = document.querySelector(Git.selectors.get('Репозиторий со списками слов'));
    static repo__form = document.querySelector(Git.selectors.get('Форма репозитория со списками слов'));

    // initRepository()
    static init_repository__button = document.querySelector(Git.selectors.get('Кнопка инициализации репозитория'));

    // createNewBranch()
    static new_branch__input = document.querySelector(Git.selectors.get('Поле для ввода наименования новой ветки'));
    static new_branch_error = document.querySelector(Git.selectors.get('Область для вывода ошибок о новой ветке'));
    static new_branch__template = document.querySelector(Git.selectors.get('Шаблон кнопки новой ветки'));
    static new_branch_insertion_area = document.querySelector(Git.selectors.get('Область для вставки кнопок новых веток'));
    static create_new_branch__button = document.querySelector(Git.selectors.get('Кнопка создания новой ветки'));
    static all_branches_output_mark = document.querySelector(Git.selectors.get('Отметка о выводе списков со всех веток'));
    
    
    
    
    
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

    static createNewBranch(event) {
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        let new_branch = Git.new_branch__input.value;
        xhr.open('POST', `/randomizer/createNewBranch/${new_branch}`);
        xhr.send();
        xhr.responseType = 'json';
        xhr.onloadend = () => {
            if(xhr.response === null)
                alert('Произошла ошибка!');
            else if(xhr.response.hasOwnProperty('updated')) {
                let clone = Git.new_branch__template.content.cloneNode(true);
                let button = clone.querySelector('button');
                button.textContent = new_branch;
                Git.new_branch_insertion_area.append(button);
                Git.new_branch__input.value = '';
                if(xhr.response.hasOwnProperty('branches_number')) {
                    if(xhr.response.branches_number > 1)
                        Git.all_branches_output_mark.style.display = '';
                }
            }
            else if(xhr.response.hasOwnProperty('fields'))
                Git.new_branch_error.textContent = xhr.response.new_branch;
            else if(xhr.response.hasOwnProperty('redirect'))
                location.href = '/auth/view';
        };
    }

    static clearNewBranchError() {
        Git.new_branch_error.textContent = '';
    }

    static syncRepository() {
        
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
    Git.create_new_branch__button.addEventListener('click', Git.createNewBranch);
    Git.new_branch__input.addEventListener('input', Git.clearNewBranchError);
});