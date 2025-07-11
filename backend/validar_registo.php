<?php
header('content-type: application/json; charset=utf-8');

include_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Receber os dados do formulário
    $nome =  $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $senha_hash = password_hash($_POST['senha'], PASSWORD_DEFAULT);
    $telefone = $_POST['telefone'] ?? '';

    // Verificar se os campos estão preenchidos
    if (empty($nome) || empty($email) || empty($senha_hash)) {
        echo json_encode(['status'=> 'erro_de_input', 'mensagem' => 'Preencha todos os campos.']);
        exit;
    }

    // Preparar a consulta para evitar SQL Injection   
    // Verificar se o email já está cadastrado
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'erro_de_existencia', 'mensagem' => 'Email já cadastrado.']);
        exit;
    } else{
        // Inserir o novo usuário no banco de dados
        $stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha_hash, telefone ) VALUES (?, ?, ?, ?)");
        if ($stmt->execute([$nome, $email, $senha_hash, $telefone])) {
            // Redirecionar para a página de login ou outra página de sucesso
            session_start();
            $_SESSION['usuario'] = $nome;
            $_SESSION['email'] = $email;
            $_SESSION['telefone'] = $telefone;
            $_SESSION['id'] = $pdo->lastInsertId();
            $_SESSION['logado'] = true;


            echo json_encode(['status' => 'sucesso', 'mensagem' => 'A registrar... aguarde.']);
        } else {
            echo json_encode(['status' => 'erro_de_bd', 'mensagem' => 'Erro ao cadastrar usuário.']);
        }
    }

    
} else {
    echo "Método de requisição inválido.";
}
// Fim do código de registro

