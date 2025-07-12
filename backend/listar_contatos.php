<?php
header("content-type: application/json; charset=utf-8");

include_once "config.php";
session_start();

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    header('Location: ../frontend/sessao.html');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === "POST" || $_SERVER['REQUEST_METHOD'] === "GET") {

    $usuarioId = $_SESSION['id'];

    try {

        $stmt = $pdo->prepare(" SELECT * FROM contatos WHERE id_usuario = ? ");
        $stmt->execute([$usuarioId]);
        $contatos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['status'=> 'sucesso', 'contatos'=> $contatos ]);

    } catch (PDOException $e) {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao buscar contatos']);
    }
} else {
    echo "Método de requisição inválido";
}
