<?php
    $mysql = new \mysqli('localhost', 'root', 'KisaragiEki4', 'Lists');
    $query = "SELECT * FROM __LISTS__";
    $result = $mysql->query($query);
    foreach($result as $value) {
        $selected_list_id = $value['SELECTED_LIST_ID'];
    }
    $query = "SELECT source,translation,transcription FROM reijiakkerman WHERE ID=$selected_list_id";
    $result = $mysql->query($query);
    foreach($result as $value) {
        $source = $value['source'];
        $translation = $value['translation'];
        $transcription = $value['transcription'];
    }

    $source .= ';';
    $translation .= ';';
    if(!is_null($transcription))
        $transcription .= ';';

    $source = str_replace(';', "\n", $source);
    $translation = str_replace(';', "\n", $translation);
    if(!is_null($transcription))
        $transcription = str_replace(';', "\n", $transcription);

    `echo "$source" > NW.txt`;
    `echo "$translation" > TNW.txt`;
    if(!is_null($transcription))
        `echo "$transcription" > SNW.txt`;