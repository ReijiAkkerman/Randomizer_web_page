<?php
    $mysql = new \mysqli('localhost', 'root', 'KisaragiEki4');

    $query = 'DROP DATABASE IF EXISTS Auth';
    $mysql->query($query);
    $query = "DROP USER IF EXISTS 'Auth'@'localhost'";
    $mysql->query($query);
    $query = 'DROP DATABASE IF EXISTS Settings';
    $mysql->query($query);
    $query = "DROP USER IF EXISTS 'Settings'@'localhost'";
    $mysql->query($query);
    $query = 'DROP DATABASE IF EXISTS Lists';
    $mysql->query($query);
    $query = "DROP USER IF EXISTS 'Lists'@'localhost'";
    $mysql->query($query);

    $mysql->close();