<?php
    namespace project\model\regex;

    enum Lists: string {
        case listName = '#^[А-Яа-яA-Za-z0-9 ]{1,250}$#u';
        case languageMark = '#^[a-z]{2}$#';
    }