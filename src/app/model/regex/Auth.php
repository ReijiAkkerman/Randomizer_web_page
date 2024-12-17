<?php
    namespace project\model\regex;

    enum Auth: string {
        case email = '#^[a-z0-9.\-_]{5,50}@[a-z]{2,20}.[a-z]{2,5}$#';
        case login = '#^[a-zA-Z0-9]{5,50}$#';
        case name = '#^[a-zA-Zа-яА-Я]{2,20}$#u';
        case password = '#^[a-zA-Z0-9]{3,100}$#';
    }