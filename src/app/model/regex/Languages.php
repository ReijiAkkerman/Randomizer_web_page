<?php
    namespace project\model\regex;

    enum Languages: string {
        case name = '#^[А-Яа-я]{1,40}$#u';
        case foldername = '#^\w{1,40}$#';
        case mark = '#^[a-z]{2}$#';
    }