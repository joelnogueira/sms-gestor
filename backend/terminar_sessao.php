<?php

header('content-type: application/json; charset=utf-8');
include_once 'config.php';

session_start();
session_unset();
session_destroy();

header('Location: ../index.html');
echo json_encode(['status' => 'sucesso', 'mensagem' => 'Sessão terminada com sucesso.']);


?>

