
// VERIFICAR SE O USUARIO ESTÁ ONLINE OU OFFLINE
// conexao.js

function alertaDaConexao() {
    const banner = document.createElement("div");
    banner.id = "alerta-Banner";
    banner.style.position = "fixed";
    banner.style.top = "0";
    banner.style.left = "0";
    banner.style.right = "0";
    banner.style.padding = "10px";
    banner.style.fontFamily = "var(--titulo)";
    banner.style.fontSize = "14px";
    banner.style.color = "#fff";
    banner.style.textAlign = "center";
    banner.style.zIndex = "9999";
    banner.style.display = "none";
    document.body.appendChild(banner);
    return banner;
  }
  
  function verificarConexao(isOnline) {
    const banner = document.getElementById("alerta-Banner") || alertaDaConexao();
  
    if (isOnline) {
      banner.textContent = "🎉 Você já está conectado! Aproveite todos os recursos do sistema.";
      banner.style.backgroundColor = "#28a745"; // verde
      banner.style.display = "block";
      setTimeout(() => {
        banner.style.display = "none"; // esconde após 3 segundos
      }, 3000);
    } else {
      banner.textContent = "⚠️ Upss Você está offline. Algumas funções podem não funcionar.";
      banner.style.backgroundColor = "#dc3545"; // vermelho
      banner.style.display = "block";
    }
  }
  
  // Inicializa
  // window.addEventListener("load", () => verificarConexao(navigator.onLine));
  window.addEventListener("online", () => verificarConexao(true));
  window.addEventListener("offline", () => verificarConexao(false));
  


  /*
  function verificarEstadoOnline() {
    if (navigator.onLine) {
      console.log("✅ Usuário está ONLINE");
      // Aqui você pode executar ações como sincronizar dados
    } else {
      console.log("❌ Usuário está OFFLINE");
      // Aqui você pode alertar o usuário ou salvar dados localmente
    }
  }

  // Detectar mudança de estado da conexão
  window.addEventListener('online',  verificarEstadoOnline);
  window.addEventListener('offline', verificarEstadoOnline);

  // Verificar o estado atual ao carregar
  window.addEventListener('load', verificarEstadoOnline);
  
  */