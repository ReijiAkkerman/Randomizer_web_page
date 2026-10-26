<?php
    namespace project\model\regex;

    enum Git: string {
        case repo = '#^(https?|ftp|ssh|git)://[a-zA-Z0-9/._+-]{1,240}$#';
        case branch = '#^\w{1,45}$#';
        case branches_selection = '#^\s+\b\w+\b#mu';
    }