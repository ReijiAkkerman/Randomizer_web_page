<?php $enable_tests = false; ?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/src/css/fonts.css">
        <link rel="stylesheet" href="/src/css/randomizer/position.css">
        <link rel="stylesheet" href="/src/css/randomizer/style.css">

        <?php if($enable_tests) require_once __DIR__ . '/tests/head.php'; ?>

    </head>
    <body class="randomizer">
        <main>
            <section class="words" style="display:none;">
                <div class="source">
                    <div class="counter">
                        <p>1</p>
                        <p>2</p>
                    </div>
                    <div>
                        <pre>source1</pre>
                        <pre>source2</pre>
                    </div>
                </div>
                <div class="translation" style="display:none;">
                    <div class="counter">
                        <p>1</p>
                        <p>2</p>
                    </div>
                    <div>
                        <pre>перевод</pre>
                        <pre>перевод</pre>
                    </div>
                </div>
                <div class="transcription" style="display:none;">
                    <div class="counter">
                        <p>1</p>
                        <p>2</p>
                    </div>
                    <div>
                        <pre>sounding</pre>
                        <pre>sounding</pre>
                    </div>
                </div>
            </section>
            <section class="guide" style="display:none;">
                <h1>Руководство</h1>
            </section>
            <section class="settings">
                <div class="theme">
                    <div class="theme-grid-container theme-switcher">
                        <div class="theme-switcher theme-flex">
                            <button class="theme-switcher__button">
                                <svg viewBox="0 0 32 32">
                                    <path d="M16 8.010c-4.417 0-7.997 3.581-7.997 7.998 0 4.415 3.58 7.996 7.997 7.996s7.997-3.58 7.997-7.996c0-4.416-3.58-7.998-7.997-7.998zM16 22.938c-3.821 0-6.931-3.109-6.931-6.93 0-3.822 3.109-6.932 6.931-6.932s6.931 3.11 6.931 6.932c0 3.821-3.109 6.93-6.931 6.93z"></path>
                                    <path d="M15.471 0.006h1.066v6.405h-1.066v-6.405z"></path>
                                    <path d="M15.471 25.604h1.066v6.39h-1.066v-6.39z"></path>
                                    <path d="M0.006 15.467h6.397v1.066h-6.397v-1.066z"></path>
                                    <path d="M25.596 15.467h6.398v1.066h-6.398v-1.066z"></path>
                                    <path d="M26.936 4.28l0.754 0.754-4.458 4.458-0.754-0.754 4.458-4.458z"></path>
                                    <path d="M5.072 27.653l-0.754-0.754 4.458-4.458 0.754 0.754-4.458 4.458z"></path>
                                    <path d="M5.073 4.281l4.458 4.458-0.754 0.754-4.458-4.458 0.754-0.754z"></path>
                                    <path d="M26.937 27.654l-4.458-4.458 0.754-0.754 4.458 4.458-0.754 0.754z"></path>
                                </svg>
                            </button>
                            <button class="theme-switcher__button">
                                <svg viewBox="0 0 32 32">
                                    <path d="M29.223 24.178l-0.021-0.057c-0.116-0.274-0.383-0.463-0.694-0.463-0.104 0-0.202 0.021-0.292 0.059l0.005-0.002c-1.272 0.542-2.752 0.857-4.306 0.857-6.213 0-11.25-5.037-11.25-11.25 0-4.66 2.833-8.658 6.871-10.366l0.074-0.028 0.211-0.089c0.267-0.118 0.45-0.381 0.45-0.687 0-0.375-0.276-0.686-0.635-0.74l-0.004-0.001c-0.653-0.103-1.407-0.161-2.174-0.161-8.145 0-14.748 6.603-14.748 14.748s6.603 14.748 14.748 14.748c4.748 0 8.973-2.244 11.67-5.73l0.025-0.034c0.097-0.125 0.155-0.285 0.155-0.458 0-0.127-0.031-0.246-0.086-0.351l0.002 0.004zM22.518 28.24c-1.497 0.637-3.238 1.007-5.066 1.007-7.317 0-13.249-5.932-13.249-13.249 0-7.074 5.543-12.853 12.523-13.23l0.034-0.001c-3.395 2.326-5.594 6.183-5.594 10.554 0 7.043 5.709 12.752 12.752 12.752 0.85 0 1.681-0.083 2.485-0.242l-0.081 0.013c-1.081 0.976-2.339 1.783-3.716 2.364l-0.087 0.033z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="theme-grid-container setups-switcher">
                        <div class="setups-switcher theme-flex">
                            <button class="setups-switcher__button setups-switcher__button_languages" style="color:#000;">Languages</button>
                            <button class="setups-switcher__button setups-switcher__button_git">Git</button>
                        </div>
                    </div>
                    <div class="theme-grid-container exit-buttons">
                        <div class="exit-buttons theme-flex">
                            <button class="theme_close-settings">
                                <svg viewBox="0 0 1024 1024">
                                    <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                                </svg>
                            </button>
                            <button class="theme_exit">
                                <svg viewBox="0 0 1024 1024">
                                    <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"/>
                                    <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="settings-content">
                    <div class="languages">
                        <div class="languages-main-language">
                            <p>Основной язык</p>
                            <button class="languages-main-language__button" data-language="Наименование языка" data-mark="na" data-folder="folder" data-kanji="">Наименование языка</button>
                        </div>
                        <div class="languages-additional-languages">
                            <p>Изучаемые языки</p>
                            <div>
                                <div class="languages-additional-languages-list">
                                    <button class="languages-additional-languages-list__button languages-additional-languages-list__button_studied-language" data-language="Английский" data-mark="en" data-folder="english" data-kanji="">Английский</button>
                                    <button class="languages-additional-languages-list__button languages-additional-languages-list__button_studied-language" data-language="Японский" data-mark="jp" data-folder="japanese" data-kanji="true">Японский</button>
                                    <button class="languages-additional-languages-list__button languages-additional-languages-list__button_add-language">
                                        <svg viewBox="0 0 32 32">
                                            <path d="M24,15v2h-7v7h-2v-7H8v-2h7V8h2v7H24z M24.485,24.485c-4.686,4.686-12.284,4.686-16.971,0 c-4.686-4.686-4.686-12.284,0-16.971c4.687-4.686,12.284-4.686,16.971,0C29.172,12.201,29.172,19.799,24.485,24.485z M23.071,8.929 c-3.842-3.842-10.167-3.975-14.142,0c-3.899,3.899-3.899,10.243,0,14.142c3.975,3.975,10.301,3.841,14.142,0 C26.97,19.172,26.97,12.828,23.071,8.929z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="languages-additional-languages-actions">
                                    <button class="languages-additional-languages-actions__button languages-additional-languages-actions__button_edit-language">
                                        <svg viewBox="0 0 1024 1024">
                                            <path d="M574.4 590.4l-3.2 7.2 1.6 8L608 740.8l8 33.6 28-20L760 672l5.6-4 2.4-6.4 220-556.8 8.8-22.4-22.4-8.8-140-55.2-21.6-8-8.8 20.8-229.6 559.2z m244-528l140 55.2-13.6-30.4-220 556.8 8-10.4-116 82.4 36 13.6-33.6-135.2-0.8 15.2 229.6-560-29.6 12.8z"/>
                                            <path d="M872 301.6l-107.2-40c-7.2-2.4-10.4-10.4-8-17.6l8-20.8c2.4-7.2 10.4-10.4 17.6-8l107.2 40c7.2 2.4 10.4 10.4 8 17.6l-8 20.8c-2.4 7.2-10.4 10.4-17.6 8zM718.4 645.6l-107.2-40c-7.2-2.4-10.4-10.4-8-17.6l8-20.8c2.4-7.2 10.4-10.4 17.6-8l107.2 40c7.2 2.4 10.4 10.4 8 17.6l-8 20.8c-2.4 7.2-10.4 10.4-17.6 8zM900.8 224l-107.2-40c-7.2-2.4-10.4-10.4-8-17.6l8-20.8c2.4-7.2 10.4-10.4 17.6-8l107.2 40c7.2 2.4 10.4 10.4 8 17.6l-8 20.8c-2.4 7.2-10.4 11.2-17.6 8z"/>
                                            <path d="M930.4 965.6H80c-31.2 0-56-24.8-56-56V290.4c0-31.2 24.8-56 56-56h576c13.6 0 24 10.4 24 24s-10.4 24-24 24H80c-4 0-8 4-8 8v619.2c0 4 4 8 8 8h850.4c4 0 8-4 8-8V320c0-13.6 10.4-24 24-24s24 10.4 24 24v589.6c0 31.2-24.8 56-56 56z"/>
                                            <path d="M366.4 490.4H201.6c-13.6 0-25.6-11.2-25.6-25.6 0-13.6 11.2-25.6 25.6-25.6h165.6c13.6 0 25.6 11.2 25.6 25.6-0.8 14.4-12 25.6-26.4 25.6zM409.6 584h-208c-13.6 0-25.6-11.2-25.6-25.6 0-13.6 11.2-25.6 25.6-25.6h208c13.6 0 25.6 11.2 25.6 25.6-0.8 14.4-12 25.6-25.6 25.6zM441.6 676.8h-240c-13.6 0-25.6-11.2-25.6-25.6 0-13.6 11.2-25.6 25.6-25.6h240c13.6 0 25.6 11.2 25.6 25.6-0.8 14.4-12 25.6-25.6 25.6z"/>
                                        </svg>
                                    </button>
                                    <button class="languages-additional-languages-actions__button languages-additional-languages-actions__button_delete-language">
                                        <svg viewBox="0 0 1024 1024">
                                            <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="languages-add" style="display:none;">
                        <div class="languages-add-select languages-add-select_recent-languages" style="display:none;">
                            <button class="languages-add-select__button">Английский</button>
                            <button class="languages-add-select__button">Японский</button>
                            <button class="languages-add-select__button">Китайский</button>
                        </div>
                        <div class="languages-add-select languages-add-select_all-languages">
                            <button class="languages-add-select__button">Английский</button>
                            <button class="languages-add-select__button">Японский</button>
                            <button class="languages-add-select__button">Китайский</button>
                            <button class="languages-add-select__button">Английский</button>
                            <button class="languages-add-select__button">Японский</button>
                            <button class="languages-add-select__button">Китайский</button>
                        </div>
                        <div class="languages-add-create">
                            <p class="languages-add-create__p_add-language">Добавить новый язык</p>
                            <p class="languages-add-create__p_edit-language">Изменить параметры языка</p>
                            <div>
                                <div class="languages-add-create__div">
                                    <input class="languages-add-create__input languages-add-create__input_language-name" type="text" placeholder="Наименование языка">
                                    <input class="languages-add-create__input languages-add-create__input_language-folder" type="text" placeholder="Папка языка">
                                    <input class="languages-add-create__input languages-add-create__input_shorthand" type="text" placeholder="Метка">
                                </div>
                                <input class="languages-add-create__input" type="checkbox" id="present-kanji">
                                <label class="languages-add-create__label" for="present-kanji">В языке есть иероглифы</label>
                                <button class="languages-add-create__button">Добавить</button>
                            </div>
                        </div>
                    </div>
                    <div class="git" style="display:none;">
                        <div class="git-repo">
                            <p>Репозиторий</p>
                            <input class="git-repo__input" type="text" placeholder="Репозиторий со списками слов">
                        </div>
                        <div class="git-branches">
                            <p>Ветка</p>
                            <button class="git-branches__button">main</button>
                            <input class="git-branches__input" type="checkbox" id="combine-branches">
                            <label class="git-branches__label" for="combine-branches">Отображать списки со всех веток</label>
                        </div>
                        <div class="git-lang-folders">
                            <p>Папки и соответствующие им языки</p>
                            <div>
                                <input class="git-lang-folders-foldernames__input" type="text" value="english">
                                <button class="git-lang-folders-langnames__button">Английский язык</button>
                                <input class="git-lang-folders-foldernames__input" type="text" value="japanese">
                                <button class="git-lang-folders-langnames__button">Японский язык</button>
                                <input class="git-lang-folders-foldernames__input" type="text" placeholder="Наименование папки">
                                <button class="git-lang-folders-langnames__button">Выбрать язык</button>
                            </div>
                        </div>
                    </div>
                    <div style="display:none;">
    
                    </div>
                </div>
            </section>
        </main>
        <section class="dashboard">
            <div class="search">
                <form action="#" class="search-form">
                    <input type="text" class="search-form__input" placeholder="Искомое слово ...">
                    <button class="search-form__button">
                        <svg viewBox="0 0 24 24">
                            <path d="M10.77 18.3C9.2807 18.3 7.82485 17.8584 6.58655 17.031C5.34825 16.2036 4.38311 15.0275 3.81318 13.6516C3.24325 12.2757 3.09413 10.7616 3.38468 9.30096C3.67523 7.84029 4.39239 6.49857 5.44548 5.44548C6.49857 4.39239 7.84029 3.67523 9.30096 3.38468C10.7616 3.09413 12.2757 3.24325 13.6516 3.81318C15.0275 4.38311 16.2036 5.34825 17.031 6.58655C17.8584 7.82485 18.3 9.2807 18.3 10.77C18.3 11.7588 18.1052 12.738 17.7268 13.6516C17.3484 14.5652 16.7937 15.3953 16.0945 16.0945C15.3953 16.7937 14.5652 17.3484 13.6516 17.7268C12.738 18.1052 11.7588 18.3 10.77 18.3ZM10.77 4.74999C9.58331 4.74999 8.42327 5.10189 7.43657 5.76118C6.44988 6.42046 5.68084 7.35754 5.22672 8.45389C4.77259 9.55025 4.65377 10.7566 4.88528 11.9205C5.11679 13.0844 5.68824 14.1535 6.52735 14.9926C7.36647 15.8317 8.43556 16.4032 9.59945 16.6347C10.7633 16.8662 11.9697 16.7474 13.0661 16.2933C14.1624 15.8391 15.0995 15.0701 15.7588 14.0834C16.4181 13.0967 16.77 11.9367 16.77 10.75C16.77 9.15869 16.1379 7.63257 15.0126 6.50735C13.8874 5.38213 12.3613 4.74999 10.77 4.74999Z"/>
                            <path d="M20 20.75C19.9015 20.7504 19.8038 20.7312 19.7128 20.6934C19.6218 20.6557 19.5392 20.6001 19.47 20.53L15.34 16.4C15.2075 16.2578 15.1354 16.0697 15.1388 15.8754C15.1422 15.6811 15.221 15.4958 15.3584 15.3583C15.4958 15.2209 15.6812 15.1422 15.8755 15.1388C16.0698 15.1354 16.2578 15.2075 16.4 15.34L20.53 19.47C20.6704 19.6106 20.7493 19.8012 20.7493 20C20.7493 20.1987 20.6704 20.3893 20.53 20.53C20.4608 20.6001 20.3782 20.6557 20.2872 20.6934C20.1962 20.7312 20.0985 20.7504 20 20.75Z"/>
                        </svg>
                    </button>
                </form>
            </div>
            <div class="actions">
                <div class="actions-main">
                    <button class="actions-main__button actions-main__button_sync-with-github">
                        <svg viewBox="0 0 291.32 291.32">
                            <path d="M145.66,0C65.219,0,0,65.219,0,145.66c0,80.45,65.219,145.66,145.66,145.66 s145.66-65.21,145.66-145.66C291.319,65.219,226.1,0,145.66,0z M186.462,256.625c-0.838-11.398-1.775-25.518-1.83-31.235 c-0.364-4.388-0.838-15.549-11.434-22.677c42.068-3.523,62.087-26.774,63.526-57.499c1.202-17.497-5.754-32.883-18.107-45.3 c0.628-13.282-0.401-29.023-1.256-35.941c-9.486-2.731-31.608,8.949-37.79,13.947c-13.037-5.062-44.945-6.837-64.336,0 c-13.747-9.668-29.396-15.64-37.926-13.974c-7.875,17.452-2.813,33.948-1.275,35.914c-10.142,9.268-24.289,20.675-20.447,44.572 c6.163,35.04,30.816,53.94,70.508,58.564c-8.466,1.73-9.896,8.048-10.606,10.788c-26.656,10.997-34.275-6.791-37.644-11.425 c-11.188-13.847-21.23-9.832-21.849-9.614c-0.601,0.218-1.056,1.092-0.992,1.511c0.564,2.986,6.655,6.018,6.955,6.263 c8.257,6.154,11.316,17.27,13.2,20.438c11.844,19.473,39.374,11.398,39.638,11.562c0.018,1.702-0.191,16.032-0.355,27.184 C64.245,245.992,27.311,200.2,27.311,145.66c0-65.365,52.984-118.348,118.348-118.348S264.008,80.295,264.008,145.66 C264.008,196.668,231.69,239.992,186.462,256.625z"/>
                        </svg>
                    </button>
                    <button class="actions-main__button actions-main__button_split-list">
                        <svg viewBox="0 0 17 17">
                            <path d="M10.646 13.146l0.707 0.707-2.853 2.854-2.854-2.854 0.707-0.707 1.647 1.647v-3.772h1v3.772l1.646-1.647zM8 2.207v3.772h1v-3.772l1.646 1.646 0.707-0.707-2.853-2.853-2.854 2.853 0.707 0.707 1.647-1.646zM0 8v1h17v-1h-17z"/>
                        </svg>
                    </button>
                    <button class="actions-main__button actions-main__button_combine-lists">
                        <svg viewBox="0 0 17 16">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 1l-.5.5v3l.5.5h3l.5-.5v-3L4.5 1h-3zM2 4V2h2v2H2zm-.5 2l-.5.5v3l.5.5h3l.5-.5v-3L4.5 6h-3zM2 9V7h2v2H2zm-1 2.5l.5-.5h3l.5.5v3l-.5.5h-3l-.5-.5v-3zm1 .5v2h2v-2H2zm10.5-7l-.5.5v6l.5.5h3l.5-.5v-6l-.5-.5h-3zM15 8h-2V6h2v2zm0 3h-2V9h2v2zM9.1 8H6v1h3.1l-1 1 .7.6 1.8-1.8v-.7L8.8 6.3l-.7.7 1 1z"/>
                        </svg>
                    </button>
                    <button class="actions-main__button actions-main__button_create-new-list">
                        <svg viewBox="0 0 32 32">
                            <path d="M24,15v2h-7v7h-2v-7H8v-2h7V8h2v7H24z M24.485,24.485c-4.686,4.686-12.284,4.686-16.971,0 c-4.686-4.686-4.686-12.284,0-16.971c4.687-4.686,12.284-4.686,16.971,0C29.172,12.201,29.172,19.799,24.485,24.485z M23.071,8.929 c-3.842-3.842-10.167-3.975-14.142,0c-3.899,3.899-3.899,10.243,0,14.142c3.975,3.975,10.301,3.841,14.142,0 C26.97,19.172,26.97,12.828,23.071,8.929z"/>
                        </svg>
                    </button>
                    <button class="actions-main__button actions-main__button_close-editing" style="display:none;">
                        <svg viewBox="0 0 1024 1024">
                            <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                        </svg>
                    </button>
                </div>
                <div class="actions-additional">
                    <button class="actions-additional__button actions-additional__button_save-list" style="display:none;">Сохранить список</button>
                    <button class="actions-additional__button actions-additional__button_split-list" style="display:none;">Разделить список на</button>
                    <button class="actions-additional__button actions-additional__button_combine-lists" style="display:none;">Обьединить списки</button>
                </div>
            </div>
            <div class="parameters" style="display:none;">
                <div>
                    <input type="text" class="parameters__input parameters-block__input_lists-number" placeholder="списков">
                    <input type="text" class="parameters__input parameters-block__input_words-number" placeholder="слов">
                </div>
            </div>
            <div class="lists">
                <div class="lists-combining" style="display:none;">
                    <p class="lists_title">Списки для объединения</p>
                    <div class="lists_select-list">
                        <p>Список для обьединения</p>
                        <button class="lists_delete-list">
                            <svg viewBox="0 0 1024 1024">
                                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="lists_select-list">
                        <p>Список для обьединения</p>
                        <button class="lists_delete-list">
                            <svg viewBox="0 0 1024 1024">
                                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="lists-combined">
                    <div class="lists_header">
                        <p class="lists_title">Объединенные списки</p>
                        <button class="lists_delete-lists">
                            <svg viewBox="0 0 1024 1024">
                                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="lists_select-list">
                        <p>Обьединенный список</p>
                        <button class="lists_delete-list">
                            <svg viewBox="0 0 1024 1024">
                                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="lists_select-list">
                        <p>Обьединенный список</p>
                        <button class="lists_delete-list">
                            <svg viewBox="0 0 1024 1024">
                                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="lists-temporary-split">
                    <div class="lists_header">
                        <p class="lists_title">Разделенные списки</p>
                        <button class="lists_delete-lists">
                            <svg viewBox="0 0 1024 1024">
                                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="lists_select-list">
                        <p>Разделенный список</p>
                        <button class="lists_delete-list">
                            <svg viewBox="0 0 1024 1024">
                                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="lists_select-list">
                        <p>Разделенный список</p>
                        <button class="lists_delete-list">
                            <svg viewBox="0 0 1024 1024">
                                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="lists-hard-word">
                    <div class="lists_header">
                        <p class="lists_title">Трудные слова</p>
                        <button class="lists_delete-lists">
                            <svg viewBox="0 0 1024 1024">
                                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="lists_select-list">
                        <p>Список трудных слов</p>
                        <button class="lists_delete-list">
                            <svg viewBox="0 0 1024 1024">
                                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="lists_select-list">
                        <p>Список трудных слов</p>
                        <button class="lists_delete-list">
                            <svg viewBox="0 0 1024 1024">
                                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="lists-word">
                    <p class="lists_title">Списки слов</p>
                    <div class="lists_select-list">
                        <p>Список слов</p>
                        <button class="lists_delete-list">
                            <svg viewBox="0 0 1024 1024">
                                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="lists_select-list">
                        <p>Список слов</p>
                        <button class="lists_delete-list">
                            <svg viewBox="0 0 1024 1024">
                                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="filters">
                <form class="filters-form">
                    <input type="text" class="filters-form__input filters-form__input_date-from" placeholder="1.1.1970">
                    <p>-</p>
                    <input type="text" class="filters-form__input filters-form__input_date-until" placeholder="31.10.2024">
                </form>
            </div>
            <div class="other">
                <div class="other-languages">
                    <button class="other-languages__button">en</button>
                    <button class="other-languages__button">jp</button>
                    <button class="other-languages__button">cn</button>
                </div>
                <div class="other-modes">
                    <button class="other-modes__button other-modes__button_source" id="source-mode_button">
                        <svg viewBox="0 0 64 64" enable-background="new 0 0 64 64" style="fill:#00f;">
                            <path d="M56,0H8C5.789,0,4,1.789,4,4v56c0,2.211,1.789,4,4,4h48c2.211,0,4-1.789,4-4V4C60,1.789,58.211,0,56,0z M58,60c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2V4c0-1.104,0.896-2,2-2h48c1.104,0,2,0.896,2,2V60z"/>
                            <path d="M49,25H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,25,49,25z"/>
                            <path d="M49,19H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,19,49,19z"/>
                            <path d="M49,37H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,37,49,37z"/>
                            <path d="M49,43H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,43,49,43z"/>
                            <path d="M49,49H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,49,49,49z"/>
                            <path d="M49,31H15c-0.553,0-1,0.447-1,1s0.447,1,1,1h34c0.553,0,1-0.447,1-1S49.553,31,49,31z"/>
                            <path d="M15,15h16c0.553,0,1-0.447,1-1s-0.447-1-1-1H15c-0.553,0-1,0.447-1,1S14.447,15,15,15z"/>
                        </svg>
                    </button>
                    <button class="other-modes__button other-modes__button_stroke other-modes__button_transcription" id="transcription-mode_button">
                        <svg viewBox="0 0 48 48" style="stroke:#00f;">
                            <defs>
                                <style>.a{fill:none;stroke-linecap:round;stroke-linejoin:round;}</style>
                            </defs>
                            <path class="a" d="M32.7554,34.8415H8.1671A2.7945,2.7945,0,0,1,5.3727,32.047V8.2944A2.7944,2.7944,0,0,1,8.1671,5.5H22.531Z"/>
                            <path class="a" d="M25.2,13.1585H39.8329a2.7945,2.7945,0,0,1,2.7944,2.7945V39.7056A2.7944,2.7944,0,0,1,39.8329,42.5H25.469L22.8,34.8414"/>
                            <line class="a" x1="32.7554" y1="34.8415" x2="25.469" y2="42.5"/>
                            <path class="a" d="M16.0441,11.0706h0a3.96,3.96,0,0,1,3.96,3.96v4.8958a3.96,3.96,0,0,1-3.96,3.96h0a3.96,3.96,0,0,1-3.96-3.96h0V15.0307a3.96,3.96,0,0,1,3.96-3.96Z"/>
                            <path class="a" d="M9.4018,21.1048a6.7645,6.7645,0,0,0,13.2847,0"/>
                            <line class="a" x1="16.0441" y1="26.5891" x2="16.0441" y2="29.9251"/>
                            <line class="a" x1="27.9687" y1="21.1048" x2="39.2192" y2="21.1048"/>
                            <line class="a" x1="31.3835" y1="30.9044" x2="39.2192" y2="30.9044"/>
                            <line class="a" x1="29.7307" y1="26.0046" x2="39.2192" y2="26.0046"/>
                        </svg>
                    </button>
                    <button class="other-modes__button other-modes__button_translation" id="translation-mode_button">
                        <svg viewBox="0 0 64 64" enable-background="new 0 0 64 64">
                            <path d="M60,0H14c-2.211,0-4,1.789-4,4v27H4c-2.211,0-4,1.789-4,4v23c0,3.313,2.687,6,6,6h52c3.313,0,6-2.687,6-6V4 C64,1.789,62.211,0,60,0z M2,58V35c0-1.104,0.896-2,2-2h6v25c0,2.209-1.791,4-4,4S2,60.209,2,58z M58,62H10.463 C11.416,60.938,12,59.539,12,58V4c0-1.104,0.896-2,2-2h46c1.104,0,2,0.896,2,2v54C62,60.209,60.209,62,58,62z"/>
                            <path d="M53,25H21c-0.553,0-1,0.447-1,1s0.447,1,1,1h32c0.553,0,1-0.447,1-1S53.553,25,53,25z"/>
                            <path d="M53,19H21c-0.553,0-1,0.447-1,1s0.447,1,1,1h32c0.553,0,1-0.447,1-1S53.553,19,53,19z"/>
                            <path d="M53,37H21c-0.553,0-1,0.447-1,1s0.447,1,1,1h32c0.553,0,1-0.447,1-1S53.553,37,53,37z"/>
                            <path d="M53,43H21c-0.553,0-1,0.447-1,1s0.447,1,1,1h32c0.553,0,1-0.447,1-1S53.553,43,53,43z"/>
                            <path d="M53,49H21c-0.553,0-1,0.447-1,1s0.447,1,1,1h32c0.553,0,1-0.447,1-1S53.553,49,53,49z"/>
                            <path d="M53,31H21c-0.553,0-1,0.447-1,1s0.447,1,1,1h32c0.553,0,1-0.447,1-1S53.553,31,53,31z"/>
                            <path d="M21,15h15c0.553,0,1-0.447,1-1s-0.447-1-1-1H21c-0.553,0-1,0.447-1,1S20.447,15,21,15z"/>
                        </svg>
                    </button>
                </div>
                <div class="other-utilities">
                    <button class="other-utilities__button other-utilities__button_settings">
                        <svg viewBox="0 0 512 512">
                            <path d="M336.896,269.874c-18.795,0-36.449,7.308-49.698,20.575c-13.276,13.267-20.593,30.912-20.593,49.698 c0,18.768,7.307,36.422,20.593,49.707c13.276,13.267,30.921,20.574,49.698,20.574c18.769,0,36.422-7.307,49.698-20.574 c13.276-13.286,20.584-30.939,20.584-49.707c0-18.778-7.307-36.43-20.574-49.689C373.336,277.182,355.682,269.874,336.896,269.874z M378.1,381.35c-11.011,11.003-25.636,17.061-41.204,17.061c-15.559,0-30.202-6.058-41.204-17.061 c-11.011-11.002-17.07-25.635-17.07-41.203c0-15.568,6.058-30.202,17.07-41.195c11.002-11.011,25.645-17.069,41.204-17.069 c15.568,0,30.193,6.058,41.204,17.069c11.002,10.993,17.06,25.627,17.06,41.195C395.161,355.715,389.102,370.348,378.1,381.35z"/>
                            <path d="M499.041,317.118l-37.455-5.428c-2.346-0.18-4.368-1.654-5.277-3.838l-12.134-29.294 c-0.908-2.175-0.531-4.656,1.006-6.436l22.4-30.103c3.569-4.18,3.335-10.392-0.556-14.274l-17.726-17.726 c-2.04-2.05-4.736-3.083-7.433-3.083c-2.427,0-4.863,0.836-6.832,2.526l-30.112,22.409c-1.141,0.98-2.588,1.492-4.044,1.492 c-0.809,0-1.618-0.162-2.382-0.476l-29.312-12.153c-2.166-0.89-3.65-2.94-3.838-5.268l-5.438-37.455 c-0.422-5.484-4.989-9.708-10.472-9.708h-25.078c-5.492,0-10.059,4.224-10.481,9.708l-5.447,37.455 c-0.179,2.328-1.654,4.378-3.829,5.276l-29.312,12.144c-0.773,0.314-1.582,0.476-2.39,0.476c-1.456,0-2.895-0.512-4.045-1.492 l-30.094-22.4c-1.969-1.69-4.404-2.535-6.822-2.535c-2.706,0-5.402,1.043-7.452,3.092l-17.726,17.717 c-3.883,3.892-4.116,10.094-0.557,14.274l22.4,30.103c1.519,1.779,1.914,4.26,1.016,6.436l-12.144,29.303 c-0.881,2.175-2.931,3.65-5.258,3.829l-37.474,5.438c-5.464,0.432-9.689,4.998-9.689,10.49v25.06 c0,5.502,4.225,10.068,9.689,10.498l37.474,5.43c2.328,0.189,4.378,1.672,5.258,3.838l12.144,29.311 c0.907,2.158,0.503,4.656-1.016,6.436l-22.4,30.103c-3.559,4.161-3.326,10.382,0.557,14.265l17.726,17.726 c2.05,2.049,4.746,3.082,7.443,3.082c2.427,0,4.863-0.836,6.832-2.526l30.094-22.409c1.15-0.98,2.589-1.483,4.045-1.483 c0.809,0,1.617,0.152,2.39,0.476L304.6,459.57c2.175,0.899,3.659,2.93,3.838,5.276l5.438,37.456 c0.422,5.464,4.989,9.698,10.481,9.698h25.078c5.492,0,10.049-4.234,10.481-9.698l5.429-37.456 c0.189-2.345,1.672-4.376,3.838-5.276l29.312-12.144c0.773-0.324,1.581-0.476,2.39-0.476c1.456,0,2.904,0.503,4.045,1.483 l30.103,22.409c1.969,1.69,4.404,2.526,6.832,2.526c2.697,0,5.393-1.034,7.433-3.082l17.726-17.726 c3.9-3.883,4.125-10.104,0.556-14.265l-22.4-30.103c-1.509-1.78-1.914-4.279-1.006-6.436l12.134-29.311 c0.909-2.167,2.931-3.65,5.277-3.838l37.455-5.43c5.474-0.431,9.699-4.997,9.699-10.48v-25.078 C508.74,322.125,504.515,317.559,499.041,317.118z M496.722,351.364l-36.574,5.304c-6.643,0.71-12.324,4.944-14.939,11.182 l-12.126,29.266c-2.598,6.22-1.582,13.25,2.633,18.481l21.879,29.402l-15.856,15.855l-29.392-21.878 c-3.236-2.616-7.29-4.054-11.461-4.054c-2.436,0-4.808,0.485-6.984,1.402l-29.339,12.152c-6.211,2.589-10.444,8.278-11.155,14.93 l-5.302,36.574h-22.418l-5.312-36.565c-0.701-6.652-4.926-12.35-11.173-14.957l-29.276-12.117c-2.238-0.944-4.602-1.42-7.028-1.42 c-4.153,0-8.198,1.438-11.443,4.044l-29.411,21.887l-15.847-15.855l21.87-29.402c4.224-5.232,5.24-12.27,2.652-18.446 l-12.117-29.248c-2.553-6.256-8.252-10.517-14.94-11.236l-36.592-5.304v-22.436l36.575-5.303 c6.714-0.701,12.422-4.98,14.929-11.164l12.126-29.267c2.606-6.22,1.591-13.258-2.633-18.48l-21.879-29.411l15.865-15.856 l29.383,21.878c3.245,2.624,7.29,4.054,11.461,4.054c2.409,0,4.763-0.468,6.992-1.393l29.303-12.144 c6.23-2.571,10.481-8.278,11.173-14.948l5.321-36.566h22.418l5.302,36.584c0.72,6.669,4.972,12.369,11.173,14.921l29.312,12.153 c2.22,0.916,4.575,1.393,6.984,1.393c4.18,0,8.234-1.438,11.47-4.054l29.392-21.878l15.856,15.856l-21.86,29.375 c-4.243,5.214-5.268,12.26-2.661,18.471l12.135,29.312c2.588,6.22,8.288,10.462,14.948,11.164l36.565,5.303V351.364z"/>
                            <path d="M170.661,260.418l18.463-6.742c4.054-1.474,6.274-5.816,5.123-9.96l-6.066-29.05 c-0.486-1.798,0.062-3.686,1.411-4.926l18.328-16.826c0.907-0.836,2.094-1.276,3.29-1.276c0.584,0,1.169,0.099,1.716,0.296 l28.198,8.423c0.962,0.359,1.95,0.53,2.921,0.521c3.11-0.009,6.068-1.798,7.452-4.764l8.278-17.824 c1.843-3.91,0.332-8.557-3.416-10.67l-24.584-16.144c-1.6-0.907-2.562-2.624-2.472-4.476l1.061-24.853 c0.081-1.843,1.187-3.461,2.841-4.233l26.138-14.076c3.928-1.78,5.807-6.292,4.332-10.328l-6.732-18.471 c-1.214-3.336-4.378-5.43-7.776-5.42c-0.728,0.009-1.465,0.098-2.193,0.306l-29.052,6.049c-0.432,0.126-0.872,0.189-1.303,0.189 c-1.348,0.009-2.661-0.566-3.614-1.59l-16.808-18.32c-1.259-1.356-1.646-3.29-0.99-5.006l8.414-28.207 c1.501-4.035-0.332-8.53-4.252-10.355l-17.824-8.296c-1.133-0.522-2.329-0.773-3.506-0.773c-2.885,0.017-5.654,1.546-7.154,4.206 l-16.153,24.593c-0.872,1.528-2.49,2.471-4.243,2.48h-0.215l-24.863-1.078c-1.834-0.09-3.488-1.195-4.242-2.858L107.103,4.836 c-1.375-3.038-4.387-4.853-7.542-4.836c-0.926,0-1.869,0.162-2.786,0.494l-18.463,6.75c-4.054,1.475-6.283,5.807-5.114,9.951 l6.058,29.06c0.494,1.771-0.054,3.667-1.411,4.908L59.517,67.99c-0.925,0.845-2.094,1.286-3.299,1.295 c-0.575,0-1.159-0.108-1.726-0.324l-28.188-8.395c-0.961-0.369-1.95-0.539-2.921-0.539c-3.101,0.017-6.05,1.798-7.442,4.764 L7.662,82.624c-1.834,3.901-0.333,8.539,3.416,10.669l24.584,16.153c1.609,0.899,2.562,2.616,2.471,4.441l-1.06,24.871 c-0.072,1.834-1.196,3.461-2.85,4.234L8.085,157.068c-3.919,1.779-5.798,6.283-4.324,10.319l6.733,18.471 c1.222,3.335,4.386,5.447,7.784,5.438c0.719-0.009,1.447-0.117,2.175-0.323l29.069-6.058c0.423-0.117,0.854-0.18,1.277-0.18 c1.357,0,2.678,0.558,3.622,1.582l16.818,18.337c1.258,1.348,1.626,3.29,0.989,5.016l-8.414,28.188 c-1.5,4.036,0.342,8.539,4.252,10.374l17.815,8.286c1.141,0.522,2.337,0.773,3.514,0.773c2.886-0.018,5.654-1.537,7.146-4.197 l16.153-24.584c0.862-1.528,2.463-2.482,4.197-2.482h0.27l24.854,1.07c1.842,0.072,3.487,1.177,4.252,2.849l14.067,26.139 c1.384,3.02,4.386,4.836,7.55,4.827C168.801,260.903,169.744,260.75,170.661,260.418z M156.98,224.491 c-2.741-5.564-8.242-9.151-14.454-9.394l-24.763-1.06c-0.306-0.018-0.611-0.036-0.917-0.036 c-5.834,0.036-11.299,3.128-14.338,8.108L87.984,244.23l-11.883-5.528l7.569-25.321c1.986-5.887,0.628-12.314-3.569-16.845 l-16.79-18.309c-3.21-3.524-7.784-5.528-12.558-5.502c-1.33,0-2.661,0.162-3.946,0.486l-26.148,5.447l-4.477-12.297l23.514-12.656 c5.564-2.777,9.151-8.288,9.376-14.444l1.07-24.799c0.296-6.22-2.805-12.009-8.117-15.227L19.931,84.727l5.519-11.883l25.357,7.568 c1.762,0.594,3.595,0.881,5.465,0.881c4.206-0.018,8.225-1.581,11.371-4.458l18.274-16.773c4.629-4.206,6.535-10.498,5.034-16.539 l-5.438-26.121l12.296-4.494l12.646,23.513c2.751,5.547,8.234,9.133,14.446,9.393l24.889,1.079l0.746,0.018 c5.879-0.027,11.353-3.137,14.391-8.126l14.526-22.121l11.883,5.527l-7.56,25.304c-2.013,5.896-0.664,12.314,3.56,16.862 l16.817,18.328c3.208,3.514,7.775,5.51,12.512,5.483c1.349-0.009,2.679-0.17,3.991-0.476l26.121-5.456l4.476,12.305l-23.524,12.674 c-5.491,2.733-9.069,8.18-9.375,14.418l-1.07,24.781c-0.297,6.23,2.805,12.018,8.126,15.254l22.085,14.516l-5.519,11.892 l-25.348-7.577c-1.762-0.594-3.595-0.89-5.474-0.881c-4.234,0.008-8.279,1.609-11.362,4.44l-18.346,16.836 c-4.557,4.206-6.436,10.481-4.97,16.485l5.456,26.138l-12.306,4.477L156.98,224.491z"/>
                            <path d="M186.04,154.802c6.499-13.987,7.173-29.663,1.888-44.135c-5.294-14.48-15.891-26.04-29.842-32.521 c-7.792-3.64-16.062-5.465-24.575-5.429c-6.651,0.027-13.231,1.213-19.559,3.524c-14.498,5.285-26.057,15.883-32.556,29.86 c-6.499,13.96-7.173,29.626-1.897,44.134c5.304,14.49,15.911,26.049,29.861,32.53c7.784,3.622,16.053,5.455,24.565,5.42 c6.661-0.036,13.241-1.222,19.578-3.524C167.965,179.377,179.515,168.77,186.04,154.802z M149.376,173.372 c-5.042,1.843-10.282,2.769-15.505,2.787c-6.634,0.036-13.25-1.403-19.442-4.288c-11.065-5.151-19.442-14.302-23.64-25.762 c-4.17-11.478-3.65-23.882,1.501-34.939c5.151-11.074,14.31-19.469,25.77-23.639c5.051-1.852,10.292-2.778,15.506-2.796 c6.634-0.028,13.24,1.411,19.433,4.297c11.056,5.15,19.451,14.301,23.64,25.761c4.18,11.47,3.648,23.865-1.493,34.939 C169.978,160.797,160.837,169.184,149.376,173.372z"/>
                        </svg>
                    </button>
                    <button class="other-utilities__button other-utilities__button_guide">
                        <svg viewBox="0 0 64 64">
                            <path d="M32,11c1.654,0,3-1.346,3-3s-1.346-3-3-3s-3,1.346-3,3S30.346,11,32,11z M32,7c0.551,0,1,0.448,1,1s-0.449,1-1,1   s-1-0.448-1-1S31.449,7,32,7z"/>
                            <path d="M37,25h-2V13h-8v6h2v6h-2v6h10V25z M35,29h-6v-2h2V17h-2v-2h4v12h2V29z"/>
                            <path d="M59,15v-2H48.247C46.107,6.059,39.634,1,32,1S17.893,6.059,15.753,13H5v2H1v44h26.101c0.464,2.279,2.485,4,4.899,4   s4.435-1.721,4.899-4H63V15H59z M32,3c8.271,0,15,6.729,15,15c0,7.124-5.063,13.308-12.039,14.705l-0.479,0.096L32,37.764   l-2.481-4.963l-0.479-0.096C22.063,31.308,17,25.124,17,18C17,9.729,23.729,3,32,3z M37,34.24c1.045-0.321,2.046-0.735,2.989-1.24   H53v12H37V34.24z M7,15h8.281C15.107,15.976,15,16.975,15,18c0,7.908,5.506,14.795,13.163,16.562L32,42.236l3-6.001V47h20V31   H42.921C46.659,27.848,49,23.146,49,18c0-1.025-0.107-2.024-0.281-3H57v38H33v-9h-2v9H7V15z M61,57H35v1c0,1.654-1.346,3-3,3   s-3-1.346-3-3v-1H3V17h2v38h54V17h2V57z"/>
                            <rect height="2" width="20" x="9" y="49"/>
                            <rect height="2" width="20" x="9" y="45"/>
                            <rect height="2" width="20" x="9" y="41"/>
                            <rect height="2" width="18" x="9" y="37"/>
                            <rect height="2" width="20" x="35" y="49"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
        <script type="module" src="/src/js/UserInterface.js"></script>
        <script type="module" src="/src/js/DataStructures/CircularQueue.js"></script>
        <script type="module" src="/src/js/DataStructures/Stack.js"></script>

        <?php if($enable_tests) require_once __DIR__ . '/tests/body.php'; ?>

    </body>
</html>