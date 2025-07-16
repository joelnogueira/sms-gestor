<?php

header("Content-Type: application/json; charset=utf-8");
include_once "config.php";
session_start();

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    header('Location: ../frontend/sessao.html');
    exit;
}

$contatoId = isset($_GET['contatoId']) ? $_GET['contatoId'] : '';
$usuarioId = $_SESSION['id'];


$stmt = $pdo->prepare("DELETE FROM contatos WHERE id = ? AND id_usuario = ?");
$stmt->execute([$contatoId, $usuarioId]);

$contatos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['status' => 'sucesso', 'contatos' => $contatos]);

/*
WHERE nome = %?%
Isso não funciona com prepare() e ?, porque o %...% precisa estar dentro do valor passado, e não no SQL diretamente.
*/