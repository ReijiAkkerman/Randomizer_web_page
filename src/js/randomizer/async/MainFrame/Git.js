class Git {
    static selectors = new Map([
        ['Репозиторий со списками слов', '.git-repo__input'],
        ['Форма репозитория со списками слов', '.git-repo__form'],
    ]);





    static repo = document.querySelector(Git.selectors.get('Репозиторий со списками слов'));
    static repo__form = document.querySelector(Git.selectors.get('Форма репозитория со списками слов'));

    
    
    
    
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
}

document.addEventListener('DOMContentLoaded', function() {
    Git.repo.addEventListener('input', Git.setRepository);
});