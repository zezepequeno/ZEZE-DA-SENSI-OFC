// ===============================
// SISTEMA PRINCIPAL ZEZÉ DA SENSI
// ===============================

// ===============================
// CONFIGURAÇÕES
// ===============================
const DB_KEY = "zeze_users";
const USER_LOGADO_KEY = "usuario_logado";

// ===============================
// BANCO DE DADOS (localStorage)
// ===============================
function getDB() {
    try {
        return JSON.parse(localStorage.getItem(DB_KEY)) || {};
    } catch (e) {
        console.error("Erro ao ler banco:", e);
        return {};
    }
}

function saveDB(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// ===============================
// LOGIN GOOGLE (SIMULADO)
// ===============================
window.loginGoogle = function () {
    const email = prompt("Digite seu e-mail do Google:");

    if (!email || !email.includes("@")) {
        alert("❌ E-mail inválido.");
        return;
    }

    const db = getDB();

    // Cria usuário se não existir
    if (!db[email]) {
        db[email] = {
            email: email,
            vip: false,
            vipExpira: null,
            criadoEm: new Date().toISOString()
        };
        saveDB(db);
    }

    localStorage.setItem(USER_LOGADO_KEY, email);
    carregarUsuario();
};

// ===============================
// LOGOUT
// ===============================
window.logout = function () {
    localStorage.removeItem(USER_LOGADO_KEY);
    location.reload();
};

// ===============================
// CARREGAR USUÁRIO LOGADO
// ===============================
function carregarUsuario() {
    const email = localStorage.getItem(USER_LOGADO_KEY);
    if (!email) return;

    const db = getDB();
    const user = db[email];

    if (!user) {
        // Segurança: usuário inexistente
        localStorage.removeItem(USER_LOGADO_KEY);
        return;
    }

    // Mostrar app
    const loginBox = document.getElementById("loginBox");
    const app = document.getElementById("app");

    if (loginBox) loginBox.style.display = "none";
    if (app) app.style.display = "block";

    // Dados do usuário
    const userEmail = document.getElementById("userEmail");
    const vipStatus = document.getElementById("vipStatus");
    const vipSection = document.getElementById("vipSection");

    if (userEmail) userEmail.innerText = user.email;

    if (user.vip) {
        if (vipStatus) {
            vipStatus.innerText = "VIP";
            vipStatus.classList.add("vip");
        }
        if (vipSection) vipSection.style.display = "block";
    } else {
        if (vipStatus) vipStatus.innerText = "FREE";
        if (vipSection) vipSection.style.display = "none";
    }
}

// ===============================
// GERADOR DE SENSIBILIDADE
// ===============================
window.gerarSensi = function () {
    const modeloInput = document.getElementById("modeloCelular");
    const resultado = document.getElementById("resultadoSensi");

    if (!modeloInput || !resultado) return;

    const modelo = modeloInput.value.trim();

    if (!modelo) {
        resultado.innerHTML = "<p>❌ Digite o modelo do celular.</p>";
        return;
    }

    // Geração simulada (base pra IA futura)
    const sensi = {
        geral: random(50, 100),
        redDot: random(60, 100),
        mira2x: random(50, 80),
        mira4x: random(40, 70),
        awm: random(30, 50)
    };

    resultado.innerHTML = `
        <p>📱 <strong>${modelo}</strong></p>
        <p>🎯 Geral: ${sensi.geral}%</p>
        <p>🔴 Red Dot: ${sensi.redDot}%</p>
        <p>🔭 Mira 2x: ${sensi.mira2x}%</p>
        <p>🎯 Mira 4x: ${sensi.mira4x}%</p>
        <p>💥 AWM: ${sensi.awm}%</p>
    `;
};

// ===============================
// UTILITÁRIOS
// ===============================
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===============================
// AUTO LOGIN AO CARREGAR
// ===============================
document.addEventListener("DOMContentLoaded", carregarUsuario);
