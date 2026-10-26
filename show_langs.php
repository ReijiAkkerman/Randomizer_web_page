<?php
    $mysql = new \mysqli('localhost', 'root', 'KisaragiEki4', 'Settings');
    $query = "SELECT ID,mark FROM all_languages";
    $result = $mysql->query($query);
    foreach($result as $value) {
        $id = $value['ID'];
        $mark = $value['mark'];
        echo "$id\t$mark\n";
    }
    $mysql->close();