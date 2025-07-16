
<?php

header("content-type: application/json; charset=utf-8");
include_once "config.php";
session_start();

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    header('Location: ../frontend/sessao.html');
    exit;
}

$usuarioId = $_SESSION['id'];

$stmt= $pdo->prepare("SELECT * FROM contatos WHERE id_usuario = ? AND favorito = ? ORDER BY nome ");
$stmt->execute([$usuarioId, 1]);

$contatos = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode(['status'=> 'sucesso', 'contatos'=> $contatos]);




?>