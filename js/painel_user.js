
// document.addEventListener("DOMContentLoaded", function () {
//   const toastElList = [].slice.call(document.querySelectorAll('.toast'));
//   toastElList.forEach(function (toastEl) {
//     const toast = new bootstrap.Toast(toastEl);
//     toast.show();
//   });
// });
// document.getElementById("liveToastBtn").addEventListener("click", function () {
//   const toastEl = document.getElementById("liveToast"); 
//   const toast = new bootstrap.Toast(toastEl);
//   toast.show();
// });



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
const horaAtual = new Date();
document.getElementById(
  "hora"
).innerHTML = `${horaAtual.getHours()} : ${horaAtual.getMinutes()}`;

//adicionar saudacao com base o horario
const saudacao1 = document.getElementById("saudacao1");
const hora = horaAtual.getHours();
if (hora < 12) {
  saudacao1.innerHTML = "Bom dia, ";
} else if (hora < 18) {
  saudacao1.innerHTML = "Boa tarde, ";
} else {
  saudacao1.innerHTML = "Boa noite, ";
}

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
  const spinnerContato = document.getElementById("spinner-contato");
  const tabela = document.getElementById("tbody");

  // Mostrar spinnerContato
  spinnerContato.style.display = "block";

  //Funcao para Renderizar Contato e deixa-lo retilizável
  function renderizarContatos(listaContatos) {
    tabela.innerHTML = "";

    if (listaContatos.length === 0) {
      tabela.innerHTML = `
      <tr>
        <td colspan="8" class="text-center text-muted">Lista vazia</td>
      </tr>
    `;
      return;
    }

    listaContatos.forEach((contato) => {
      const estrela =
        contato.favorito == 1
          ? `<i class="estrela fas fa-star text-warning favorito-true"></i>` // favorita (cheia)
          : `<i class="estrela far fa-star text-muted favorito-false"></i>`; // não favorita (vazia)

      let corTag = "";

      switch (contato.tag) {
        case "Amigo":
          corTag = "#b143fa";
          break;
        case "Familia":
          corTag = "#f1734d";
          break;
        case "Trabalho":
          corTag = "#4df1e3";
          break;
        case "Cliente":
          corTag = "#4df163";
          break;
        case "Lead":
          corTag = "#cdf14d";
          break;
        case "Outro":
          corTag = "#f19c4d";
          break;
      }
      //https://i.pravatar.cc/40
      const avatar = contato.foto_contato
        ? `../${contato.foto_contato}`
        : "../uploads/contatos/default_avatar.png";

      let linha = `<tr>
          <td><img src="${avatar}" class="rounded-circle " alt="avatar"></td> 
          <td>${contato.nome}</td>
          <td>${contato.telefone}</td>
          <td>${contato.email}</td>
          <td><span class="tag" style="background-color: ${corTag}">${contato.tag}</span></td>
          <td>${contato.morada}</td>
          <td>${contato.data_criacao}</td>
          <td>
              <abbr data-title="Favorito">
                <button class="btn btn-sm btn-favorito" data-id="${contato.id}">
                  ${estrela}
                </button>
              </abbr>
              <abbr data-title="Agendar mensagem">
                <button class="btn btn-sm btn-outline-secondary btn-acao">
                  <i class="fas fa-calendar-check "></i>
                </button>
              </abbr>
              <abbr data-title="Editar">
                <button class="btn btn-sm btn-outline-primary btn-acao">
                  <i class="fas fa-edit "></i>
                </button>
              </abbr>
              <abbr data-title="Eliminar">
                <button class="btn btn-sm btn-outline-danger btn-acao">
                  <i class="fas fa-trash-alt "></i>
                </button>
              </abbr>
              
          </td>
        </tr>`;
      tabela.innerHTML += linha;
    });

    //...................ATUALIZAR CONTATOS FAVORITOS............................
    
    document.querySelectorAll(".btn-favorito").forEach((botao) => {
      botao.addEventListener("click", function () {
        const contatoId = this.getAttribute("data-id");

          const icone = this.querySelector(".estrela");
          const toastTexto = document.getElementById("toastTexto");

          let foiFavoritado = !icone.classList.contains("fas"); // se não tinha 'fas', vai virar favorito

          // Definir o texto do Toast-favorito
              toastTexto.textContent = foiFavoritado
                ? "Contato adicionado aos favoritos! "
                : "Contato removido dos favoritos. ";

              // Mostrar toast-favorito
              const toastElement = document.getElementById('liveToast');
              const toast = new bootstrap.Toast(toastElement);
              toast.show();
              

        fetch("../backend/atualizar_favorito.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: contatoId }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "sucesso") {
              // Atualiza a visualização com o estado novo
              if (mostrandoFavoritos) {
                carregarFavoritos();

              } else {
                carregarTodosContatos();
              }

            }

          });
      });
    });


  }

function carregarTodosContatos(){
  fetch("../backend/listar_contatos.php")
    .then((response) => response.json())
    .then((data) => {
      // Esconder loading
      spinnerContato.style.display = "none";

      if (data.status === "sucesso") {
        renderizarContatos(data.contatos);
      }
    })
    .catch((error) => console.error("Erro ao listar contatos:", error));

}
carregarTodosContatos();
  //-----------------FILTRAR TAG - CONTATOS-----------------------------

  const filtro = document.getElementById("filtro-tag");

  function carregarContatosDaTag(tagSelecao = "") {
    const url =
      "../backend/filtrar_contatos.php?tagSelecao=" +
      encodeURIComponent(tagSelecao);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "sucesso") {
          renderizarContatos(data.contatos);
        }
      })
      .catch((error) => console.error("Erro ao listar contatos:", error));
  }
  filtro.addEventListener("change", function () {
    carregarContatosDaTag(this.value); // adicionar o valor à filtragem
  });


  //-----------------PESQUISAR - CONTATOS-----------------------------

  

 function pesquisarContatos() {
  const termo = document.getElementById("pesquisarId").value.trim();

  if (!termo) {
    carregarTodosContatos(); // Se o campo estiver vazio, carrega todos
    return;
  }

  const url = `../backend/pesquisar_contatos.php?termo=${encodeURIComponent(termo)}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "sucesso") {
        renderizarContatos(data.contatos);
      } else {
        console.warn("Pesquisa sem resultados.");
      }
    })
    .catch((error) => console.error("Erro ao pesquisar contatos:", error));
}
document.getElementById("pesquisarId").addEventListener("keyup", function () {
  pesquisarContatos();
});

  //...........BUSCAR CONTATOS FAVORITOS........................
  
  let mostrandoFavoritos = false; // estado inicial

  const btnFavoritos = document.getElementById("btn-favoritos");

  btnFavoritos.addEventListener("click", function () {
    mostrandoFavoritos = !mostrandoFavoritos; // alterna o estado

    if (mostrandoFavoritos) {
      // Modo favoritos
      carregarFavoritos();
      btnFavoritos.textContent = "Mostrar todos";
    } else {
      // Modo todos
      carregarTodosContatos();
      btnFavoritos.textContent =  "Mostrar favoritos";
    }
  });
  
  function carregarFavoritos() {
    fetch("../backend/contatos_favoritos.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "sucesso") {
          renderizarContatos(data.contatos);
        }
      })
      .catch((error) => {
        console.error("Erro ao consultar contatos favoritos", error);
      });
  }



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
function meusContatos() {
  carregarPage("meus_contatos.html");
}
function relatorios() {
  carregarPage("relatorios.html");
}

function carregarPage(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carrgar página");
      }
      return response.text();
    })
    .then((html) => {
      document.querySelector(".area-conteudo").innerHTML = html;
      if (url === "meus_contatos.html") {
        ativarMeusContatos();
      } else if (url === "relatorios.html") {
        ativarRelatorios();
      }
    })
    .catch((error) => {
      console.error("Erro ao carrgar página", error);
    });
}

//--------------------NOVO CONTATO------------------------------
function novoContato() {
  //Validar o campo de nome para aceitar apenas letras, espaços e caracteres especiais
  document.getElementById("nome").addEventListener("input", function (e) {
    const input = e.target;
    input.value = formatarNome(input.value); // função  da validação
  });
  function formatarNome(nome) {
    // 1. Remover caracteres inválidos (aceita letras, espaços, hífens e apóstrofos)
    nome = nome.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");

    // 2. Substituir múltiplos espaços por apenas um
    // nome = nome.replace(/\s+/g, " ").trim();

    // 3. Capitalizar cada palavra (com exceções)
    const excecoes = ["da", "de", "do", "das", "dos", "e"];
    return nome
      .split(" ")
      .map((palavra, index) => {
        const palavraMin = palavra.toLowerCase();
        if (excecoes.includes(palavraMin) && index !== 0) {
          return palavraMin;
        }
        return palavraMin.charAt(0).toUpperCase() + palavraMin.slice(1);
      })
      .join(" ");
  }

  document.getElementById("telefone").addEventListener("input", function (e) {
    const input = e.target;
    input.value = input.value
      .replace(/[^\d+]/g, "") // Remove tudo exceto dígitos e "+"
      .replace(/(?!^)\+/g, "") // Remove "+" que não esteja no início
      .slice(0, 15); // Limite para 15 caracteres (máximo internacional)
  });

  document.getElementById("email").addEventListener("input", function (e) {
    const input = e.target;
    input.value = input.value.replace(/[^a-z-0-9._@]/g, ""); // Permitir apenas letras, números, pontos, sublinhados e o símbolo @
  });

  const fotoContato = document.getElementById("foto");
  fotoContato.addEventListener("change", function () {
    const preview = document.getElementById("preview");
    const imgBox = document.getElementById("img-box");
    const file = this.files[0];
    if (file) {
      imgBox.style.display = "block";
      preview.src = URL.createObjectURL(file);
    } else {
      imgBox.style.display = "none";
      preview.src = "";
    }
  });
  document
    .getElementById("btn-limpar-img")
    .addEventListener("click", function () {
      fotoContato.value = "";
      fotoContato.dispatchEvent(new Event("change"));
    });

  document.getElementById("morada").addEventListener("input", function (e) {
    const input = e.target;
    input.value = formatarNome(input.value); // função  da validação de capitalização
  });

  let tag = document.getElementById("tag");
  let foto = document.getElementById("foto");

  let alertaNovoContato = document.getElementById("alertaNovoContato");

  let formNovoContato = document.getElementById("formNovoContato");
  formNovoContato.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    fetch("../backend/novo_contato.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "sucesso") {
          alertaNovoContato.classList.remove("alerta-erro");
          alertaNovoContato.classList.add("alerta-sucesso");
          alertaNovoContato.textContent = data.mensagem;
          setTimeout(() => {
            alertaNovoContato.textContent = "";
            this.reset();
            document.getElementById("preview").style.display = "none";
          }, 3000);

          ativarMeusContatos(); // 💡 chama novamente a função que atualiza a tabela
        } else if (data.status === "erro") {
          alertaNovoContato.classList.remove("alerta-sucesso");
          alertaNovoContato.classList.add("alerta-erro");
          alertaNovoContato.textContent = data.mensagem;
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  });
}
novoContato(); // chamada funcao do novo contato

//--------------------FIM NOVO CONTATO------------------------------

/*
formNovoContato.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("../backend/novo_contato.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "sucesso") {
          alertaNovoContato.classList.remove("alerta-erro");
          alertaNovoContato.classList.add("alerta-sucesso");
          alertaNovoContato.textContent = data.mensagem;

          // ✅ Inserir novo contato na tabela dinamicamente
          const nome = formData.get("nome");
          const telefone = formData.get("telefone");
          const email = formData.get("email") || "";
          const morada = formData.get("morada") || "";
          const tag = formData.get("tag") || "outro";
          const dataCriacao = new Date().toLocaleString("pt-PT"); // Simples formatação local
          const avatar = "https://i.pravatar.cc/40";

          // Define a cor da tag
          let corTag = "";
          switch (tag.toLowerCase()) {
            case "amigo":
              corTag = "#b143fa";
              break;
            case "familia":
              corTag = "#f1734d";
              break;
            case "trabalho":
              corTag = "#4df1e3";
              break;
            case "cliente":
              corTag = "#4df163";
              break;
            case "lead":
              corTag = "#cdf14d";
              break;
          }

          // Calcula novo índice
          const tabela = document.getElementById("tbody");
          const index = tabela.querySelectorAll("tr").length + 1;

          // Cria a linha
          let novaLinha = `
          <tr>
            <td>${index}</td>
            <td><img src="${avatar}" class="rounded-circle" alt="avatar"></td>
            <td>${nome}</td>
            <td>${telefone}</td>
            <td>${email}</td>
            <td><span class="tag" style="background-color: ${corTag}">${tag}</span></td>
            <td>${morada}</td>
            <td>${dataCriacao}</td>
            <td>
              <button class="btn btn-sm btn-outline-primary"><i class="fas fa-edit"></i></button>
              <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>
        `;

          tabela.innerHTML += novaLinha;

          // ✅ Limpar o formulário e alerta após 3s
          setTimeout(() => {
            alertaNovoContato.textContent = "";
            formNovoContato.reset();
            document.getElementById("preview").style.display = "none";
          }, 3000);
        } else if (data.status === "erro") {
          alertaNovoContato.classList.remove("alerta-sucesso");
          alertaNovoContato.classList.add("alerta-erro");
          alertaNovoContato.textContent = data.mensagem;
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  });

*/
