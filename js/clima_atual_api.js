
let cidade; // variavel para colocar a cidade do usuario
function mensagemClima(main) {
  switch (main.toLowerCase()) {
    case "clear":
      return `Céu limpo para ${cidade}! Hora de organizar seus contatos — sem nuvens nem confusão. 😎📱`;
    case "clouds":
      return `Dia nublado para ${cidade}? Aproveita pra limpar os contatos duplicados. ☁️📇`;
    case "rain":
      return `Chuva caindo lá fora… e suas mensagens fluindo daqui! ☔📨`;
    case "thunderstorm":
      return `Se o tempo está elétrico para ${cidade}, aproveite pra acender seu engajamento! ⚡💬`;
    case "snow":
      return `Dia gelado para ${cidade}? Aquece os contatos com mensagens quentinhas. ☕❄️`;
    case "mist":
    case "fog":
      return `Névoa para ${cidade}? Organize sua agenda antes que se perca nos nomes! 🌫️📒`;
    default:
      return `Seja o sol do dia de alguém. Mande aquela mensagem que faz sorrir! 📲✨`;
  }
}

const iconeSol = document.querySelector(".fa-sun");
const iconeLua = document.querySelector(".fa-moon");

// 🔍 1. Primeiro, descobrir a cidade com base no IP
fetch("http://ip-api.com/json/")
  .then((res) => res.json())
  .then((local) => {
      cidade = local.city;

    // 🌤️ 2. Agora buscar os dados climáticos com base na cidade detectada
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt&appid=7330ac6e22f4bb8d9a5e184c4f2f42cb`
    );
  })
  .then((res) => res.json())
  .then((data) => {
    const clima = data.weather[0].main.toLowerCase();

    document.getElementById(
      "cidade"
    ).textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("descricao").textContent =
      data.weather[0].description;
    document.getElementById("temperatura").textContent = `${Math.round(
      data.main.temp
    )}°C`;
    document.getElementById("sensacao").textContent = `${Math.round(
      data.main.feels_like
    )}°C`;
    document.getElementById("umidade").textContent =
      data.main.humidity /* + "%" */ ;
    document.getElementById("nascer").textContent = new Date(
      data.sys.sunrise * 1000
    ).toLocaleTimeString();
    document.getElementById("por").textContent = new Date(
      data.sys.sunset * 1000
    ).toLocaleTimeString();
    document.getElementById("saudacao2").textContent = mensagemClima(clima);

    // 🎨 Ícones dinâmicos
    if (clima.includes("cloud")) {
      iconeSol.classList.replace("fa-sun", "fa-cloud");
      iconeLua.classList.replace("fa-moon", "fa-cloud-moon");
    } else if (clima.includes("rain")) {
      iconeSol.classList.replace("fa-sun", "fa-cloud-showers-heavy");
      iconeLua.classList.replace("fa-moon", "fa-cloud-rain");
    } else if (clima.includes("snow")) {
      iconeSol.classList.replace("fa-sun", "fa-snowflake");
      iconeLua.classList.replace("fa-moon", "fa-snowflake");
    }
  })
  .catch((error) => {
    document.getElementById("cidade").textContent = "Erro ao carregar dados";
    console.error("Erro ao buscar clima:", error);
  });
