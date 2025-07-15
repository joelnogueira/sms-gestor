<?php
header("Content-Type: application/json");
include_once "config.php";
session_start();

$usuarioId = $_SESSION['id'] ?? null;

$data = json_decode(file_get_contents("php://input"), true);
$contatoId = $data['id'] ?? null;

if (!$usuarioId || !$contatoId) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Dados inválidos']);
    exit;
}

// Alternar o valor do favorito
$stmt = $pdo->prepare("UPDATE contatos SET favorito = NOT favorito WHERE id = ? AND id_usuario = ?");
$stmt->execute([$contatoId, $usuarioId]);
echo json_encode(['status' => 'sucesso']);
