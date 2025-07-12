function ativarValidarLogin() {
  // Validar o campo de telefone para aceitar apenas números e o formato +2449xxxxxxx
  document.getElementById("telefone").addEventListener("input", function (e) {
    const input = e.target;
    // Permite apenas 1 sinal de "+" no início e o resto apenas dígitos
    input.value = input.value
      .replace(/[^\d+]/g, "") // Remove tudo exceto dígitos e "+"
      .replace(/(?!^)\+/g, "") // Remove "+" que não esteja no início
      .slice(0, 15); // Limite para 15 caracteres (máximo internacional)
  });

  // Validar o campo de senha para aceitar apenas letras, números e caracteres especiais
  document.getElementById("senha").addEventListener("input", function (e) {
    const input = e.target;
    input.value = input.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+]/g, ""); // Permitir apenas letras, números e caracteres especiais
  });

  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = document.getElementById("form");
    const spinner = document.querySelector(".spinner");
    const alerta = document.getElementById("alert");
    alerta.style.display = "none";

    const formData = new FormData(this);
    fetch("../backend/validar_login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "sucesso") {
          // Exibir progress bar
          const progressBar = document.getElementById("progress-bar");
          const progressContainer =
            document.getElementById("progress-container");
          progressContainer.style.display = "block";

          let progress = 0;
          const intervalo = setInterval(() => {
            progress += 10;
            progressBar.style.width = progress + "%";

            if (progress >= 100) {
              clearInterval(intervalo);
              window.location.href = "../frontend/painel_user.php";
              progressContainer.style.display = "none";
              form.reset(); // Limpar o formulário após o sucesso
            }
          }, 100); // tempo total: 1 segundo (100 * 10ms)
        } else if (data.status === "erro_de_input") {
          alerta.textContent = data.mensagem;
          alerta.style.display = "block";
          alerta.classList.add("erro");
        } else if (data.status === "erro_de_existencia") {
          alerta.textContent = data.mensagem;
          alerta.style.display = "block";
          alerta.classList.add("erro");
        } else if (data.status === "erro_de_dados") {
          alerta.textContent = data.mensagem;
          alerta.style.display = "block";
          alerta.classList.add("erro");
        }
      })
      .catch((error) => {
        alerta.textContent = "Erro de conexão com o servidor.";
        alerta.style.display = "block";
        alerta.classList.add("erro");
        console.error("Erro:", error);
      });
  });

  document
    .querySelector(".imagem-vetor")
    .addEventListener("mouseenter", function () {
      let btnHidden = document.getElementById("btn-hidden");
      btnHidden.style.display = "block";
      btnHidden.addEventListener("click", function () {
        let vetor = document.querySelector(".imagem-vetor");
        let form = document.querySelector(".form-Box");
        // Adiciona classe que esconde o vetor
        vetor.classList.add("oculto");
        // Centralizar o formulario
        form.classList.add("centralizar-form");
      });
    });
  document
    .querySelector(".imagem-vetor")
    .addEventListener("mouseleave", function () {
      let btnHidden = document.getElementById("btn-hidden");
      btnHidden.style.display = "none";
    });
}

function ativarValidarCriarConta() {
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


    // Validar o campo de email para aceitar apenas letras, números, pontos, sublinhados e o símbolo @
    document.getElementById("email").addEventListener("input", function (e) {
        const input = e.target;
        input.value = input.value.replace(/[^a-z-0-9._@]/g, ""); // Permitir apenas letras, números, pontos, sublinhados e o símbolo @
    });
    // Validar o campo de senha para aceitar apenas letras, números e caracteres especiais
    document.getElementById("senha").addEventListener("input", function (e) {
        const input = e.target;
        input.value = input.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+]/g, ""); // Permitir apenas letras, números e caracteres especiais
    });
    // Validar o campo de telefone para aceitar apenas números e o formato +2449xxxxxxx
    document.getElementById("telefone").addEventListener("input", function (e) {
        const input = e.target;
      // Permite apenas 1 sinal de "+" no início e o resto apenas dígitos
        input.value = input.value
            .replace(/[^\d+]/g, "") // Remove tudo exceto dígitos e "+"
            .replace(/(?!^)\+/g, "") // Remove "+" que não esteja no início
            .slice(0, 15); // Limite para 15 caracteres (máximo internacional)
    });

    document
        .getElementById("form-registo")
        .addEventListener("submit", function (e) {
        e.preventDefault();

        

        const formData = new FormData(this);
        const form = document.getElementById("form-registo");
        const nome = document.getElementById("nome").value;
        const senha = document.getElementById("senha").value;
        const alertaGlobal = document.getElementById("alert-global");
        const alertaNome = document.getElementById("alert-nome");
        const alertaEmail = document.getElementById("alert-email");
        const alertaSenha = document.getElementById("alert-senha");
        const spinner = document.querySelector(".spinner");
        alertaGlobal.style.display = "none";
        alertaNome.style.display = "none";
        alertaEmail.style.display = "none";
        alertaSenha.style.display = "none";

        if (nome.length < 3) {
            alertaNome.textContent = "Nome muito curto.";
            alertaNome.style.display = "block";
            return;
        }
        if (senha.length < 6 || senha.length > 20) {
            alertaSenha.textContent =
            " A senha deve ter pelo menos 6 a 20 caracteres.";
            alertaSenha.style.display = "block";
            return;
        }

        fetch("../backend/validar_registo.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
            if (data.status === "sucesso") {
              // Exibir progress bar
                const progressBar = document.getElementById("progress-bar");
                const progressContainer = document.getElementById("progress-container");
                progressContainer.style.display = "block";

                let progress = 0;
                const intervalo = setInterval(() => {
                    progress += 10;
                    progressBar.style.width = progress + "%";

                    if (progress >= 100) {
                        clearInterval(intervalo);
                        window.location.href = "../frontend/painel_user.php";
                        form.reset(); // Limpar o formulário após o sucesso
                        progressContainer.style.display = "none";
                    }
                }, 300); // tempo total: 1 segundo (100 * 10ms)

            } else if (data.status === "erro_de_input") {
                alertaGlobal.textContent = data.mensagem;
                alertaGlobal.style.display = "block";
                alertaGlobal.classList.add("erro");
            } else if (data.status === "erro_de_existencia") {
                alertaEmail.textContent = data.mensagem;
                alertaEmail.style.display = "block";
                alertaEmail.classList.add("erro");
            } else if (data.status === "erro_de_bd") {
                alertaGlobal.textContent = data.mensagem;
                alertaGlobal.style.display = "block";
                alertaGlobal.classList.add("erro");
            }
        });
    });

        

}

//requisicão assincrona "Dinamicamente"
function login_form() {
    carregarForm("login-form.html");
    }
function criar_conta_form() {
    carregarForm("criar-conta-form.html");
}

    function carregarForm(url) {
    fetch(url)
        .then((response) => {
        if (!response.ok) {
            throw new Error("Erro ao carregar o formulário.");
        }
        return response.text();
        })
        .then((html) => {
        document.getElementById("main").innerHTML = html;
        if (url === "login-form.html") {
            ativarValidarLogin();
        } else if (url === "criar-conta-form.html") {
            ativarValidarCriarConta();
        }
        })
        .catch((error) => {
        console.error("Erro ao carregar o formulário:", error);
    });
}
// Carregar login ao abrir a página
window.onload = function () {
    carregarForm("login-form.html");
    };


