<?php

header("Content-Type: application/json; charset=utf-8");
include_once "config.php";
session_start();

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    header('Location: ../frontend/sessao.html');
    exit;
}

$pesquisa = isset($_GET['termo']) ? $_GET['termo'] : '';
$usuarioId = $_SESSION['id'];

// Prepara a pesquisa com LIKE
$pesquisa = "%$pesquisa%";  //

$stmt = $pdo->prepare("SELECT * FROM contatos WHERE (nome LIKE ? OR telefone LIKE ? ) AND id_usuario = ?");
$stmt->execute([$pesquisa, $pesquisa, $usuarioId]);

$contatos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['status' => 'sucesso', 'contatos' => $contatos]);

/*
WHERE nome = %?%
Isso não funciona com prepare() e ?, porque o %...% precisa estar dentro do valor passado, e não no SQL diretamente.
*/