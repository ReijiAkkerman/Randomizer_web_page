<?php
    namespace project\model\regex;

    enum Git: string {
        case repo = '#^https?://[a-zA-Z0-9/._+-]{1,240}$#';
    }