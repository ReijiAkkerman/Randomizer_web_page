class Git {
    static selectors = new Map([
        ['Репозиторий со списками слов', '.git-repo__input'],
        ['Форма репозитория со списками слов', '.git-repo__form'],
        ['Форма создания новой ветки', '.git-branches__form'],
    ]);





    static repo = document.querySelector(Git.selectors.get('Репозиторий со списками слов'));
    static repo__form = document.querySelector(Git.selectors.get('Форма репозитория со списками слов'));
    static new_branch__form = document.querySelector(Git.selectors.get('Форма создания новой ветки'));

    
    
    
    
    static setRepository(event) {
        event.preventDefault();
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

    static createNewBranch(event) {
        event.preventDefault();
        let data = new FormData(Git.new_branch__form);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/settings/createNewBranch');
        xhr.send(data);
        xhr.reponseType = 'text';
        xhr.onloadend = () => {
            alert(xhr.responseText);
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    Git.repo.addEventListener('input', Git.setRepository);
});