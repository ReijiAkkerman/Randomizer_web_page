<?php
    namespace project;
    
    use project\core\Router;
    
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    
    require_once __DIR__ . '/../vendor/autoload.php';
    
    $obj = new Router();
    $obj->action();