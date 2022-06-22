<?
header("Content-Type: application/json");
$filename = 'players.json';

if (file_exists($filename)) {
    $file = file_get_contents('players.json');
} else {
    $file = fopen("players.json", "a+");
}

$taskList = json_decode($file, true);
$taskList[] = json_decode(file_get_contents("php://input"));

file_put_contents('players.json', json_encode($taskList));
