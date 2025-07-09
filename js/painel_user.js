
// ----------------------MODAL-------------------------------
// script do madal do log-out
document.addEventListener("DOMContentLoaded", function () {
  const intervalo = setInterval(() => {
    // Simula o carregamento do conteúdo
    document.querySelector(".spinner").style.display = "none";
    document.querySelector(".loading").style.display = "block"; // Exibir o conteúdo principal
  }, 3000);
});

document.getElementById("btn-sair").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("modal-sair").style.display = "flex";
});

document.getElementById("cancelar").addEventListener("click", function () {
  document.getElementById("modal-sair").style.display = "none";
});

document.getElementById("confirmar").addEventListener("click", function () {
  // Redireciona para o PHP de logout
  window.location.href = "../backend/terminar_sessao.php";
});


// ............................................

// lógica do modal de aviso para a pagina principal
document.addEventListener("DOMContentLoaded", () => {
  const modalAviso = document.getElementById("modal-aviso");
  const fecharModalAviso = document.getElementById("fechar-modal-aviso");

  const modalConcluido = document.getElementById("modal-aviso-concluido");
  const fecharModalConcluido = document.getElementById(
    "fechar-modal-aviso-concluido"
  );

  // Verifica se o modal já foi visto antes
  const modalJaVisto = localStorage.getItem("modal_aviso_visto");

  if (!modalJaVisto) {
    // Abrir o primeiro modal após 6 segundos
    setTimeout(() => {
      modalAviso.style.display = "block";
    }, 6000);
  }

  // Fechar primeiro modal e abrir o segundo
  fecharModalAviso.addEventListener("click", () => {
    modalAviso.style.display = "none";
    modalConcluido.style.display = "block";
  });

  // Fechar segundo modal e salvar no localStorage
  fecharModalConcluido.addEventListener("click", () => {
    modalConcluido.style.display = "none";
    localStorage.setItem("modal_aviso_visto", "true");
  });
});

// ------------------------FIM MODAL-----------------------------



// ----------------------PAINEL-------------------------------

// adicionar hora no navbar
const horaAtual = new Date()
document.getElementById("hora").innerHTML = 
`${horaAtual.getHours()} : ${horaAtual.getMinutes()}`;

//adicionar saudacao com base o horario
const saudacao1 = document.getElementById("saudacao1");
const hora = horaAtual.getHours()
if(hora < 12){
    saudacao1.innerHTML='Bom dia, '
  }else if( hora < 18 ){
    saudacao1.innerHTML = "Boa tarde, "
  }
  
else{saudacao1.innerHTML = "Boa noite, ";}

//..............................................

//TypeWriter effect. efeito de digitação

document.addEventListener("DOMContentLoaded", function () {
    const elemento = document.querySelector("#lembretes");

    const frases = [
    "📌 Não se esqueça de enviar uma mensagem para seus contatos hoje!",

    "🕒 Agende seus SMS com antecedência e ganhe tempo no dia a dia.",

    "✅ Já conferiu se todos os aniversariantes do dia foram lembrados?",
    "🚀 Cada mensagem enviada é uma nova chance de conquistar um cliente.",

    "💡 Não espere pelo momento certo. Organize, planeje e crie seu próprio sucesso.",

    "💬 Clientes não compram produtos, compram atenção. Mostre que você se importa.",

    "✉️ Lembre-se: uma mensagem simples pode manter seu cliente por perto.",

    "📅 Agendamentos futuros? Verifique seu calendário para garantir tudo certo.",

    "📲 Tem contatos sem número de telefone. Atualize sua lista para evitar falhas.",

    "🎯 Organize seus contatos em grupos para facilitar os envios em massa.",

    "🔁 Mantenha seus dados atualizados para evitar erros de envio.",

    "💬 Clientes que recebem atenção retornam com fidelidade.",

    "📈 Você não precisa ser perfeito, só precisa ser constante.",

    "🎯 Pequenas ações diárias geram grandes resultados mensais.",

    "❤️ Ouvir seu cliente é mais poderoso que convencer.",

    "🧹 Hora de revisar sua lista: limpe contatos duplicados ou inativos.",
    ];

    let fraseIndex = 0;
    let i = 0;

    function digitar() {
    if (i < frases[fraseIndex].length) {
        elemento.innerHTML =
        frases[fraseIndex].substring(0, i + 1) +
        `<span class="cursor">|</span>`;
        i++;
        setTimeout(digitar, 50 + Math.random() * 100);
    } else {
        setTimeout(apagar, 2000);
    }
    }

    function apagar() {
    if (i >= 0) {
        elemento.innerHTML = frases[fraseIndex].substring(0, i);
        i--;
        setTimeout(apagar, 30);
    } else {
        fraseIndex = (fraseIndex + 1) % frases.length;
        digitar();
    }
    }

    digitar();
});

// -----------------------FIM PAINEL------------------------------




//------------------------MEUS CONTATOS------------------------------------------

function ativarMeusContatos() {
  document.querySelector(".teste1").style.color = "blue";
}




//------------------------NOVA MENSAGEM------------------------------------------


//------------------------MEUS RELATORIOS------------------------------------------

function ativarRelatorios() {
  document.querySelector(".teste2").style.color = "blue";
}








//-------------------------REQUISIÇÃO E ATIVAÇÃO DAS FUNCÕRS--------------------------------------

function painel() {
    window.location.href = "painel_user.php";
}
// Requisições FETCH
function meusContatos(){
    carregarPage("meus_contatos.html")
}
function relatorios(){
    carregarPage("relatorios.html")
}


function carregarPage(url){
    fetch(url)
    .then((response)=>{
        if(!response.ok){
            throw new Error ("Erro ao carrgar página")
        }
        return response.text()
    })
    .then( (html)=>{
        document.querySelector(".area-conteudo").innerHTML = html;
        if (url === "meus_contatos.html"){
            ativarMeusContatos();
        }
        else if(url === "relatorios.html"){
            ativarRelatorios();
        }
        
    } )
    .catch((error) => {
        console.error("Erro ao carrgar página", error);
    })
    
}
















