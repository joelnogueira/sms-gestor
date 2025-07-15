<?php

include_once '../backend/config.php';
session_start();

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    header('Location: sessao.html');
    exit;
}

$nomeCompleto = $_SESSION['usuario'];
$nomeDivido = strtok($nomeCompleto, " ");
$primeiroNome = ucfirst($nomeDivido);

?>



<!DOCTYPE html>
<html lang="pt-PT">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel | <?php echo ucfirst(string: $_SESSION['usuario']); ?> </title>

    <!--Bootstrap-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <!-- estilo do sidebar -->
    <!-- estilo do clima atual API -->
    <link rel="stylesheet" href="../css/clima_actual.css">
    <!-- estilo do painel-user -->
    <link rel="stylesheet" href="../css/painel_user.css">
    <!-- estilo do novo-contato -->
    <link rel="stylesheet" href="../css/novo_contato.css">

</head>
</head>

<body>
    <div class="spinner">
        <h1>Carregando atualizações...</h1>
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>

    <!-- GRUPO DOS MODAIS  -->

    <!-- MODAL PARA TERMINAR SESSÃO  -->

    <div id="modal-sair" class="modal-sair">
        <div class="modal-conteudo">
            <h2>Ooh! já vais?</h2>
            <p>Antes de terminar a sessão <br>
                se certifique de salvar os seus pendentes</p>
            <div class="modal-acao">
                <button id="cancelar">Cancelar</button>
                <button id="confirmar">Sim, terminar</button>
            </div>
        </div>
    </div>
    <!-- FIM  -->

    <!-- MODAL NOVA MENSAGEM -->
    <div class="modal fade" id="exampleModalSMS" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Nova Mensagem</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Destinatário:</label>
                            <input type="text" class="form-control" id="recipient-name">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Mensagem:</label>
                            <textarea class="form-control" id="message-text"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-ok">Enviar Mensagem</button>
                </div>
            </div>
        </div>
    </div>
    <!-- FIM -->


    <!-- MODAL PARA NOVO CONTATO  -->
    <!-- Modal -->
    <div class="modal fade modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <form action="../backend/novo_contato.php" method="post" id="formNovoContato">

                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Novo Contato</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-box">
                            <div class="nome">
                                <div class="input-group input-group-sm mb-3">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">Nome</span>
                                    <input type="text" name="nome" id="nome" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                                </div>
                            </div>
                            <div class="telefone">
                                <div class="input-group input-group-sm mb-3">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">Telefone</span>
                                    <input type="text" name="telefone" id="telefone" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                                </div>
                            </div>
                            <div class="email">
                                <div class="input-group input-group-sm mb-3">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">Email</span>
                                    <input type="text" name="email" id="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                                </div>
                            </div>
                            <div class="morada">
                                <div class="input-group input-group-sm mb-3">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">Morada</span>
                                    <input type="text" name="morada" id="morada" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                                </div>
                            </div>
                            <div class="tag">
                                <select name="tag" class="form-select form-select-sm" id="tag" aria-label="Small select example">
                                    <option selected>Escolha uma tag para seu contato</option>
                                    <option value="Amigo">Amigo</option>
                                    <option value="Familia">Família</option>
                                    <option value="Trabalho">Trabalho</option>
                                    <option value="Cliente">Cliente</option>
                                    <option value="Lead">Lead</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>
                            <div class="file">
                                <div class="mb-3">
                                    <label for="formFileSm" class="form-label">Adicionar Foto do Contato</label>
                                    <div class="input-box ">
                                        <input name="foto" id="foto" class="form-control form-control-sm" id="formFileSm" type="file" accept="image/*">
                                    </div>
                                    <!-- <button type="button" class="btn btn-danger btn-limpar-img" id="btn-limpar-img" data-bs-dismiss="modal">Limpar ficheiro</button> -->
                                </div>
                            </div>

                            <div class="img-box" id="img-box">
                                <img id="preview" src="#" alt="Pré-visualização" style=" width:180px; height:180px; border-radius:50%; object-fit:cover; border:2px solid var(--azul); margin:0 auto; ">
                                <abbr title="Apagar imagem"><i class="fas fa-trash-alt " id="btn-limpar-img"></i></abbr>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div>
                            <p id="alertaNovoContato"> </p>
                        </div>
                        <div>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button name="submit" class="btn btn-ok">Adicionar</button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>
    <!-- FIM -->

<!--  MODAL TOAST-->
    <!-- TOAST PARA CONTATO ADICIONADO AO FAVORITO -->
      <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" class="toast bg-light text-primary" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-primary text-light"  id="imgContato">
            <strong class="me-auto" style="font-family:var(--titulo);">Favorito</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body" style="display:flex; align-items:center;">
                <span id="toastTexto"> </span>
                <button class="btn btn-sm ">
                    <i class="fas fa-star text-warning "></i>
                </button>
            </div>
        </div>
    </div>

<!--  FIM  TOAST-->




    <main class="loading">

        <nav>
            <div class="logo">
                <a href="../index.html"><img src="assets/logo-sms.jpg" alt="sms-gestor"></a>
                <h5>SMS<span>GESTOR</span></h5>
            </div>
            <div class="hora">
                <div class="horaBox">
                    <ion-icon name="time-outline"></ion-icon>
                    <h1 id="hora"></h1>
                </div>
                <div class="btnBox">
                    <abbr data-title="Página inicial">
                        <div id="inicio" onclick="window.location.href='../index.html'">
                            <i class="fa-solid fa-house"></i>
                        </div>
                    </abbr>
                    <abbr data-title="Mudar tema">
                        <div id="tema" onclick="mudar_tema()">
                            <ion-icon name="moon"></ion-icon>
                        </div>
                    </abbr>
                </div>
            </div>
        </nav>



        <section class="section1" id="section-pd">
            <div class=" l-navbar" id="navbar">
                <nav class="nav ">
                    <div>
                        <div class="nav__brand">
                            <ion-icon name="menu-outline" class="nav__toggle" id="nav-toggle"></ion-icon>
                            <a class="nav__logo">Versão Normal</a>
                        </div>
                        <div class="nav__list">
                            <a href="#" class="nav__link active" onclick="painel()">
                                <ion-icon name="home-outline" class="nav__icon"></ion-icon>
                                <span class="nav__name">Painel</span>
                            </a>
                            <a href="#" class="nav__link" onclick="meusContatos()">
                                <ion-icon name="people-outline" class="nav__icon"></ion-icon>
                                <span class="nav__name">Meus Contatos</span>
                            </a>
                            <a href="#" class="nav__link" data-bs-toggle="modal" data-bs-target="#exampleModalSMS">
                                <ion-icon name="chatbubbles-outline" class="nav__icon"></ion-icon>
                                <span class="nav__name">Nova Mensagem</span>
                            </a>

                            <a href="#" class="nav__link" onclick="relatorios()">
                                <ion-icon name="pie-chart-outline" class="nav__icon"></ion-icon>
                                <span class="nav__name">Relatórios</span>
                            </a>

                            <div class="nav__link drop">
                                <ion-icon name="folder-outline" class="nav__icon"></ion-icon>
                                <span class="nav__name">Extras</span>
                                <ion-icon name="chevron-down-outline" class="drop__link"></ion-icon>
                                <ul class="drop__menu">
                                    <a href="#" class="drop__sublink">Data</a>
                                    <a href="#" class="drop__sublink">Group</a>
                                </ul>
                            </div>

                            <a href="#" class="nav__link">
                                <ion-icon name="calendar-outline" class="nav__icon"></ion-icon>
                                <span class="nav__name">Calendário</span>
                            </a>
                            <a href="#" class="nav__link">
                                <ion-icon name="location-outline" class="nav__icon"></ion-icon>
                                <span class="nav__name">Mapa</span>
                            </a>


                            <a href="#" class="nav__link">
                                <ion-icon name="settings-outline" class="nav__icon"></ion-icon>
                                <span class="nav__name">Definições</span>
                            </a>

                            <a href="#" class="nav__link sair" id="btn-sair">
                                <ion-icon name="log-out-outline" class="nav__icon"></ion-icon>
                                <span class="nav__name">Terminar sessão</span>
                            </a>
                        </div>
                    </div>


                </nav>
            </div>

            <!-- a tela de conteudo -->
            <div class="tela-principal">
                <header>
                    
                    <abbr data-title="Escrever mensagem">
                        <div class="mais-sms" data-bs-toggle="modal" data-bs-target="#exampleModalSMS">
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </abbr>
                    <abbr data-title="Adicionar contato">
                        <div class="mais-contato" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i class="fa-solid fa-user-plus icon-grande "></i>
                        </div>
                    </abbr>
                    <div class="notificacao">
                        <abbr data-title="Nova mensagem">
                            <div class="sms">
                                <i class="fa-solid fa-comment-sms icon-grande "></i>
                            </div>
                        </abbr>
                        <abbr data-title="Nova notificação">
                            <div class=" sino ">
                                <i class="fa-solid fa-bell icon-grande"></i>
                            </div>
                        </abbr>
                    </div>
                    <div class="usuario-logado">
                        <div class="foto"></div>
                        <h1 class="nome"><?= $primeiroNome; ?></h1>
                    </div>
                </header>

                <div style="padding:10px;">
                    <div class="area-conteudo">

                        <!--Conteudos do painel-->
                        <section class="painel">

                            <div class="saudacao">
                                <h1><ion-icon name="home-outline" class="icon-painel"> </ion-icon>Painel</h1>
                                <p><span id="saudacao1"></span><?= $primeiroNome;  ?>! <span id="saudacao2"></span>
                                </p>
                            </div>

                            <div class="container-fluid banner">

                                <!-- Clima actual  -->
                                <div class="clima-card" id="clima-card">
                                    <div class="cidade" id="cidade">Carregando...</div>
                                    <div class="descricao" id="descricao"></div>
                                    <div class="temperatura" id="temperatura"></div>
                                    <div class="detalhes">
                                        <div><i class="fas fa-thermometer-half"></i> Sensação: <span id="sensacao"></span></div>
                                        <div><i class="fas fa-tint"></i> Umidade: <span id="umidade"></span>%</div>
                                        <div><i class="fas fa-sun"></i> Nascer: <span id="nascer"></span></div>
                                        <div><i class="fas fa-moon"></i> Pôr: <span id="por"></span></div>
                                    </div>
                                </div>
                                <!-- Fim Clima actual  -->


                                <div class="aviso-paginaInicial" id="modal-aviso">
                                    <div class="fecharBox">
                                        <div class="fechar" id="fechar-modal-aviso"><i class="fa-solid fa-xmark"></i></div>
                                    </div>
                                    <p>
                                        Se chegaste até aqui de paraquedas, dê uma olhada na Página inicial para saber como usar o Gestor de SMS.
                                    </p>
                                    <a href="../index.html">Página inicial</a>
                                </div>
                                <div class="modal-aviso-concluido" id="modal-aviso-concluido">
                                    <p>
                                        Ótimo! compreendemos que ja saibas como utilizar o Gestor de SMS. <br>
                                        Desejámos-lhe boa sorte!.
                                    </p>
                                    <a id="fechar-modal-aviso-concluido">Ok</a>
                                </div>


                                <div class="lembretes efeito-3d-lembretes">
                                    <div class="titulo">
                                        <h1>Lembretes <i class="fa-solid fa-lightbulb "></i></h1>
                                    </div>
                                    <div class="quadro">
                                        <p id="lembretes"></p>

                                    </div>
                                </div>
                            </div>

                            <div class="container cardBox">
                                <div class="container boxs">
                                    <div class="box contato-favorito">
                                        <div class="texto">
                                            <h1>Contato Favorito</h1>
                                            <div class="contato">
                                                <div class="foto">
                                                    <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="">
                                                </div>
                                                <div class="dados">
                                                    <h2 id="nome">Eliana Cruz</h2>
                                                    <p id="numero"> 933003300
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="opcoes">
                                            <ul>
                                                <abbr data-title="Enviar mensagem">
                                                    <li><i class="fa-solid fa-paper-plane icon-pequeno"></i></li>
                                                </abbr>
                                                
                                                <abbr data-title="Editar">
                                                    <li><i class="fa-solid fa-edit icon-pequeno"></i></li>
                                                </abbr>

                                                <abbr data-title="Vêr morada">
                                                    <li><i class="fa-solid fa-map-marker-alt icon-pequeno"></i></li>
                                                </abbr>

                                                <abbr data-title="Ligar">
                                                    <li><i class="fa-solid fa-phone icon-pequeno"></i></li>
                                                </abbr>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="box box1">
                                        <div class="texto">
                                            <h1>SMS Enviados</h1>
                                            <h2 id="total-enviado">10</h2>
                                            <p id="ultima-enviado">Desde ontem 15:45</p>

                                        </div>
                                    </div>
                                    <div class="box box2">
                                        <div class="texto">
                                            <h1>SMS Recebidos</h1>
                                            <h2 id="total-recebido">10</h2>
                                            <p id="ultima-recebido">Hoje 19:30</p>

                                        </div>
                                    </div>
                                    <div class="box box3">
                                        <div class="texto">
                                            <h1>Atividades</h1>
                                            <div>
                                                <h2 id="contatos-registrados">Contatos Registrados:</h2>
                                                <h3>30</h3>
                                            </div>
                                            <div>
                                                <h2 id="enviados-na-semana">SMS Enviados na Semana:</h2>
                                                <h3>20</h3>
                                            </div>
                                            <div>
                                                <h2 id="ultimo-envio">Último Envio Realizado:</h2>
                                                <h3>9</h3>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="box box4">
                                        <div class="texto">
                                            <h1>Grupos de Contatos</h1>
                                            <div class="tags">
                                                <div class="lado1">
                                                    <div class="tag" style="background-color:#b143fa;"><a>Amigo</a></div>
                                                    <div class="tag" style="background-color:#f1734d;"><a>Família</a></div>
                                                    <div class="tag" style="background-color:#4df1e3;"><a>Trabalho</a></div>
                                                </div>
                                                <div class="lado2">
                                                    <div class="tag" style="background-color:#4df163;"><a>Cliente</a></div>
                                                    <div class="tag" style="background-color:#cdf14d;"><a>Lead</a></div>
                                                    <div class="tag" style="background-color:#f19c4d;"><a>Outro</a></div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="box box5">
                                        <div class="texto">

                                            <h1>Contatos Agendados</h1>
                                            <div class="nome">
                                                <h2>Angelina</h2>
                                                <span>Para 13 horas</span>
                                            </div>
                                            <div class="nome">
                                                <h2>Gilson</h2>
                                                <span>Para amanhã</span>
                                            </div>
                                            <div class="nome">
                                                <h2>Beatriz</h2>
                                                <span>Para 20 horas</span>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="box box6">
                                        <div class="texto">
                                            <h1>Notificações</h1>
                                            <div>
                                                <h2 id="sms-falhadas">Mensagens Falhadas</h2>
                                                <h3>14</h3>
                                            </div>
                                            <h2 id="agendamento-prox">Agendamento Próximo De: </h2>
                                            <div>
                                                <h3><i class="fa-solid fa-user "></i> Beatriz </h3>
                                                <p>12/09/2025</p>
                                            </div>



                                        </div>

                                    </div>
                                    <div class=" box box7">
                                        <div class="texto">
                                            <h1>TOP 3 Mais Usados</h1>
                                            <div class="contatosBox">
                                                <div class="contato card1-3d" style="background-image: linear-gradient(31deg, #670061 0%, #375492 100%);">
                                                    <div class="foto">
                                                        <img src="https://randomuser.me/api/portraits/women/20.jpg" alt="">
                                                    </div>
                                                    <div class="dados">
                                                        <h2 class="nome">
                                                            Angelina
                                                        </h2>
                                                        <h2 class="numero">
                                                            943671232
                                                        </h2>
                                                        <p>Amigo</p>
                                                        <div class="btn-enviar">
                                                            <abbr data-title="Enviar-lhe mensagem">
                                                                <div class="enviar"><i class="fa-solid fa-paper-plane "></i></div>
                                                            </abbr>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="contato card2-3d" style="background-image: linear-gradient(31deg, #6dccbc 0%, #0d14c8 100%);">
                                                    <div class="foto">
                                                        <img src="https://randomuser.me/api/portraits/men/25.jpg" alt="">
                                                    </div>
                                                    <div class="dados">
                                                        <h2 class="nome">
                                                            Edmilson
                                                        </h2>
                                                        <h2 class="numero">
                                                            923096340
                                                        </h2>
                                                        <p>Trabalho</p>
                                                        <div class="btn-enviar">
                                                            <abbr data-title="Enviar-lhe mensagem">
                                                                <div class="enviar"><i class="fa-solid fa-paper-plane "></i></div>
                                                            </abbr>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="contato card3-3d" style="background-image: linear-gradient(31deg, #09f5ef 0%, #14191f 100%);">
                                                    <div class="foto">
                                                        <img src="https://randomuser.me/api/portraits/mn/30.jpg" alt="">
                                                    </div>
                                                    <div class="dados">
                                                        <h2 class="nome">
                                                            António
                                                        </h2>
                                                        <h2 class="numero">
                                                            934235132
                                                        </h2>
                                                        <p>Amigo</p>
                                                        <div class="btn-enviar">
                                                            <abbr data-title="Enviar-lhe mensagem">
                                                                <div class="enviar"><i class="fa-solid fa-paper-plane "></i></div>
                                                            </abbr>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                        </section>
                    </div>
                </div>



            </div>

        </section>

    </main>

    <script src="../js/conexao.js"></script>
    <script src="../js/painel_user.js"></script>
    <script src="../js/sidebar.js"></script>
    <script src="../js/clima_atual_api.js"></script>

    <!--Bootstrap-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>


    <!-- Icon ionicons -->
    <script src="https://unpkg.com/ionicons@5.1.2/dist/ionicons.js"></script>

    <!-- Icon FontAwesome -->
    <script src="https://kit.fontawesome.com/3f04aa5ab1.js" crossorigin="anonymous"></script>


</body>

</html>