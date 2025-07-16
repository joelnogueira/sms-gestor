<?php
header("content-type: application/json; charset=utf-8");

include_once "config.php";

session_start();
if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    header('Location: ../frontend/sessao.html');
    exit;
}
if( $_SERVER['REQUEST_METHOD'] === "GET" ){

    $usuarioId = $_SESSION['id']; // pegar o id do usuario logadp
    $filtroTag = $_GET['tagSelecao'] ?? "";


    if ($filtroTag === "") {
        $stmt = $pdo->prepare("SELECT * FROM contatos WHERE id_usuario = ? ORDER BY nome ");
        $stmt->execute([$usuarioId]);
    } else {
        $stmt = $pdo->prepare("SELECT * FROM contatos WHERE id_usuario = ? AND tag = ? ORDER BY nome ");
        $stmt->execute([$usuarioId, $filtroTag]);

    }
    $contatos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['status' => 'sucesso', 'contatos' => $contatos]);

}
else{
    echo "Método de requisição inválida";
}


?>
