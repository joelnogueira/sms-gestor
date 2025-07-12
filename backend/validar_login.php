<?php 

header('Content-Type: application/json');
include_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){

    //receber os dados do formulario
    $telefone = $_POST['telefone'] ?? '';
    $senha = $_POST['senha'] ?? '';

    //verificar se os campos estão preenchidos
    if ( empty($telefone) || empty($senha)) {
        echo json_encode(['status' => 'erro_de_input', 'mensagem' => 'Preencha todos os campos.']);
        exit;
    };

    // Preparar a consulta para evitar SQL Injection
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE telefone = ?");
    $stmt->execute([$telefone]);
    if($stmt->rowCount() == 0){
        echo json_encode(['status'=> 'erro_de_existencia', 'mensagem' => 'Usuário não encontrado.']);
        exit;
    }

    $usuario= $stmt->fetch();

    // Verificar o usuario e a senha
    if (!$usuario || !password_verify($senha, $usuario['senha_hash'])) {
        echo json_encode(['status'=> 'erro_de_dados', 'mensagem' => 'Telefone ou senha incorreta.']);
        exit;
    }

    // Iniciar a sessão e armazenar os dados do usuário
    session_start();
    $_SESSION['usuario'] = $usuario['nome'];
    $_SESSION['email'] = $usuario['email'];
    $_SESSION['telefone'] = $usuario['telefone'];
    $_SESSION['id'] = $usuario['id'];
    $_SESSION['logado'] = true;

    echo json_encode(['status' => 'sucesso']);
    exit;


    
} 
else{
    header('Location: ../frontend/sessao.html');
    exit;
}


?>