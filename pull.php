<?php
    $active_language_id = 2;
    $source = `cat NW.txt`;
    $translation = `cat TNW.txt`;
    $transcription = `cat SNW.txt`;

    $source = str_replace("\n", ';', $source);
    $translation = str_replace("\n", ';', $translation);
    if($transcription) $transcription = str_replace("\n", ';', $transcription);

    $source = rtrim($source, ';');
    $translation = rtrim($translation, ';');
    if($transcription) $transcription = rtrim($transcription, ';');

    $str = $source . $translation . $transcription;
    $hash = hash('sha1', $str);

    $mysql = new \mysqli('localhost', 'root', 'KisaragiEki4', 'Lists');
    if($transcription)
        $query = "INSERT INTO reijiakkerman(
            name,
            type,
            date,
            hash,
            native_language,
            active_language,
            source,
            translation,
            transcription
        ) VALUES (
            ''
            'main',
            NOW(),
            '$hash',
            1,
            $active_language_id,
            '$source',
            '$translation',
            '$transcription'
        )";
    else 
        $query = "INSERT INTO reijiakkerman(
            name,
            type,
            date,
            hash,
            native_language,
            active_language,
            source,
            translation
        ) VALUES (
            '',
            'main',
            NOW(),
            '$hash',
            1,
            $active_language_id,
            '$source',
            '$translation'
        )";
    $mysql->query($query);
    $mysql->close();