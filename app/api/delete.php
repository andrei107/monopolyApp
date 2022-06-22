<?php
$id = $_POST;

$str = file_get_contents('players.json');
$json = json_decode($str, true); 

foreach ($json as $key => $value) {
    if($value['data']['id'] == $id['id']) {
        unset($json[$key]);
    }
}

$a  = [];
foreach ($json as $key => $value) {
    array_push($a, $value);
 }

file_put_contents('players.json', json_encode($a));