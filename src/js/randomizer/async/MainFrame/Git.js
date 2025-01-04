class Git {
    static selectors = new Map([
        ['Репозиторий со списками слов', '.git-repo__input'],
        ['Форма репозитория со списками слов', '.git-repo__form'],
        ['Нет информации о репозитории', '.git-branches_no-info'],
        ['Отобразить действия над ветками', '.git-branches_display'],
        ['Кнопка синхронизации с Github', '.actions-main__button_sync-with-github'],
        ['Кнопки выбора ветки', '.git-branches__button_change-branch'],
        ['Шаблон для новой кнопки веток', '.git-branches__template'],
        ['Место вставки кнопок веток', '.git-branches-block'],
    ]);





    static repo = document.querySelector(Git.selectors.get('Репозиторий со списками слов'));
    static repo__form = document.querySelector(Git.selectors.get('Форма репозитория со списками слов'));
    static branches_info = document.querySelector(Git.selectors.get('Нет информации о репозитории'));
    static branches_actions__array = document.querySelectorAll(Git.selectors.get('Отобразить действия над ветками'));
    static sync__button = document.querySelector(Git.selectors.get('Кнопка синхронизации с Github'));
    static select_branch_button__array = document.querySelectorAll(Git.selectors.get('Кнопки выбора ветки'));
    static branch_button__template = document.querySelector(Git.selectors.get('Шаблон для новой кнопки веток'));
    static insert_branch_button_place = document.querySelector(Git.selectors.get('Место вставки кнопок веток'));
    
    
    
    
    
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

    static createNewBranch(event) {
        
    }

    static syncWithGithub() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/randomizer/syncWithGithub');
        xhr.send();
        xhr.responseType = 'json';
        xhr.onloadend = () => {
            if(xhr.response === null)
                alert('Репозиторий недоступен!');
            else if(xhr.response.hasOwnProperty('branches')) {
                // Удалить все имеющиеся кнопки веток
                Git.select_branch_button__array = document.querySelectorAll(Git.selectors.get('Кнопки выбора ветки'));
                for(const element of Git.select_branch_button__array) {
                    element.remove();
                }
                // Создать новые кнопки веток
                for(const branch of xhr.response.branches) {
                    let clone = Git.branch_button__template.content.cloneNode(true);
                    let button = clone.querySelector('button');
                    button.textContent = branch;
                    Git.insert_branch_button_place.append(button);
                }
                // Отобразить ветки
                Git.repo.dataset['checked'] = 'on';
                Git.isRepositoryInfo();
            }
        };
    }

    static selectBranch() {

    }





    /**
     * Методы вызывающиеся сразу после загрузки страницы
     */

    static isRepositoryInfo() {
        if(Git.repo.dataset['checked'] === 'on') {
            Git.branches_info.style.display = 'none';
            for(const element of Git.branches_actions__array) {
                element.style.display = '';
            }
        }
        else {
            for(const element of Git.branches_actions__array) {
                element.style.display = 'none';
            }
            Git.branches_info.style.display = '';
        }
    }

    static defaultRepoValues() {
        Git.repo.dataset['checked'] = 'off';
        Git.isRepositoryInfo();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    Git.repo.addEventListener('input', Git.defaultRepoValues);
    Git.repo.addEventListener('input', Git.setRepository);
    Git.sync__button.addEventListener('click', Git.syncWithGithub);
});

Git.isRepositoryInfo();