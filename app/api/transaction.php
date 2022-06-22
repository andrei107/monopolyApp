<?php
$data = $_POST;

$a  = [];
$str = file_get_contents('players.json');
$json = json_decode($str, true); 

foreach ($json as $key => $value) {
    if($value['data']['name'] == $data['from']) {
       $delta = (int)$value['data']['bank'] - (int)$data['value']; 
       $value['data']['bank'] = $delta;
       if($delta<0){
           $value['data']['error'] = true;
       } 
       if($delta>=0){
        $value['data']['error'] = false;
       }
    }
    if($value['data']['name'] == $data['to']) {
        $delta = (int)$value['data']['bank'] + (int)$data['value']; 
        $value['data']['bank'] = $delta;
        if($delta<0){
            $value['data']['error'] = true;
        } 
        if($delta>=0){
         $value['data']['error'] = false;
        }
     }
    array_push($a, $value);
}

file_put_contents('players.json', json_encode($a));




