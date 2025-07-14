<?php

header("content-type: application/json; charset=utf-8");

include_once "config.php";
session_start();

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    header('Location: ../frontend/sessao.html');
    exit;
}

$uploadDir = '../uploads/contatos/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $nome = $_POST['nome'] ?? '';
    $telefone = $_POST['telefone'] ?? '';
    $email = $_POST['email'] ?? '';
    $morada = $_POST['morada'] ?? '';
    $tag = $_POST['tag'] ?? '';
    $foto = $_FILES['foto'] ?? null;
    $usuarioId = $_SESSION['id'];

    // Campos obrigatórios
    if (empty($nome) || empty($telefone)) {
        echo json_encode(["status" => "erro", 'mensagem' => "Campos 'Nome' e 'Telefone' não podem estar vazíos."]);
        exit;
    }

    // Verificar se o telefone já existe
    $stmt = $pdo->prepare("SELECT * FROM contatos WHERE telefone = ? AND id_usuario = ?");
    $stmt->execute([$telefone, $usuarioId]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "erro", "mensagem" => "Este contato já está na sua lista."]);
        exit;
    }

    $caminhoBD = null; // valor padrão se não houver imagem

    // Se uma imagem foi enviada
    if ($foto && $foto['error'] === UPLOAD_ERR_OK && $foto['size'] > 0) {

        // Segurança 1: tamanho
        if ($foto['size'] > 2 * 1024 * 1024) {
            echo json_encode(['status' => 'erro', 'mensagem' => 'Imagem excede o tamanho máximo de 2MB.']);
            exit;
        }

        // Segurança 2: tipo
        $mimeTiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];
        $tipoArquivo = mime_content_type($foto['tmp_name']);
        if (!in_array($tipoArquivo, $mimeTiposPermitidos)) {
            echo json_encode(['status' => 'erro', 'mensagem' => 'Tipo de imagem não permitido. Use JPG ou PNG.']);
            exit;
        }

        // Segurança 3: nome seguro
        $extensao = pathinfo($foto['name'], PATHINFO_EXTENSION);
        $nomeArquivo = 'contato_' . time() . '.' . $extensao;
        $caminhoFinal = $uploadDir . $nomeArquivo;
        $caminhoBD = 'uploads/contatos/' . $nomeArquivo;

        move_uploaded_file($foto['tmp_name'], $caminhoFinal);
    }

    // Inserir contato no banco
    $stmt = $pdo->prepare("INSERT INTO contatos (id_usuario, nome, telefone, email, morada, tag, foto_contato) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$usuarioId, $nome, $telefone, $email, $morada, $tag, $caminhoBD]);

    echo json_encode([
        "status" => "sucesso", 
        "mensagem" => "Contato adicionado com sucesso.",
        "foto"=> $caminhoBD]);
} else {
    echo "Método de requisição inválido";
}
