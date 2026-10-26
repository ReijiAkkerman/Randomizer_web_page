<?php
    $mysql = new \mysqli('localhost', 'root', 'KisaragiEki4', 'Lists');
    $query = "SELECT ID,name,date FROM reijiakkerman";
    $result = $mysql->query($query);
    foreach($result as $value) {
        $id = $value['ID'];
        $name = ($value['name']) ? $value['name'] : $value['date'];
        echo "$id\t$name\n";
    }
    $mysql->close();