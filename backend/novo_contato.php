<?php
header("Content-Type: application/json; charset=utf-8");

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
    $idContato = $_POST['id'] ?? null; // ID do contato (se for edição)

    $nome = $_POST['nome'] ?? '';
    $telefone = $_POST['telefone'] ?? '';
    $email = $_POST['email'] ?? '';
    $morada = $_POST['morada'] ?? '';
    $tag = $_POST['tag'] ?? '';
    $foto = $_FILES['foto'] ?? null;
    $usuarioId = $_SESSION['id'];

    // Validação obrigatória
    if (empty($nome) || empty($telefone)) {
        echo json_encode(["status" => "erro", 'mensagem' => "Campos 'Nome' e 'Telefone' são obrigatórios."]);
        exit;
    }

    // Caminho da imagem no BD
    $caminhoBD = null;

    // Se o usuário enviou uma nova imagem
    if ($foto && $foto['error'] === UPLOAD_ERR_OK && $foto['size'] > 0) {
        if ($foto['size'] > 2 * 1024 * 1024) {
            echo json_encode(['status' => 'erro', 'mensagem' => 'Imagem excede 2MB.']);
            exit;
        }

        $mimeTiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];
        $tipoArquivo = mime_content_type($foto['tmp_name']);
        if (!in_array($tipoArquivo, $mimeTiposPermitidos)) {
            echo json_encode(['status' => 'erro', 'mensagem' => 'Tipo de imagem inválido.']);
            exit;
        }

        $extensao = pathinfo($foto['name'], PATHINFO_EXTENSION);
        $nomeArquivo = 'contato_' . time() . '.' . $extensao;
        $caminhoFinal = $uploadDir . $nomeArquivo;
        $caminhoBD = 'uploads/contatos/' . $nomeArquivo;

        move_uploaded_file($foto['tmp_name'], $caminhoFinal);
    }

    // Se for EDIÇÃO (tem id do contato)
    if (!empty($idContato)) {
        // Se for editar, atualize os dados. Verifica se o contato pertence ao usuário.
        $sqlVerifica = "SELECT * FROM contatos WHERE id = ? AND id_usuario = ?";
        $stmtVerifica = $pdo->prepare($sqlVerifica);
        $stmtVerifica->execute([$idContato, $usuarioId]);

        if ($stmtVerifica->rowCount() === 0) {
            echo json_encode(["status" => "erro", "mensagem" => "Contato não encontrado."]);
            exit;
        }

        // Se não foi enviada nova imagem, manter a antiga
        if (!$caminhoBD) {
            $caminhoBD = $stmtVerifica->fetch()['foto_contato'];
        }

        $sqlUpdate = "UPDATE contatos SET nome = ?, telefone = ?, email = ?, morada = ?, tag = ?, foto_contato = ? WHERE id = ? AND id_usuario = ?";
        $stmt = $pdo->prepare($sqlUpdate);
        $stmt->execute([$nome, $telefone, $email, $morada, $tag, $caminhoBD, $idContato, $usuarioId]);

        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Contato atualizado com sucesso.",
            "foto" => $caminhoBD
        ]);
        exit;
    }

    // Caso contrário, é adição de novo contato
    // Verifica se telefone já existe
    $stmt = $pdo->prepare("SELECT * FROM contatos WHERE telefone = ? AND id_usuario = ?");
    $stmt->execute([$telefone, $usuarioId]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "erro", "mensagem" => "Este contato já está na sua lista."]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO contatos (id_usuario, nome, telefone, email, morada, tag, foto_contato) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$usuarioId, $nome, $telefone, $email, $morada, $tag, $caminhoBD]);

    echo json_encode([
        "status" => "sucesso",
        "mensagem" => "Contato adicionado com sucesso.",
        "foto" => $caminhoBD
    ]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Método de requisição inválido"]);
}
