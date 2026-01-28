// ===============================
// SISTEMA PRINCIPAL ZEZÉ DA SENSI
// ===============================

// Simulação de banco (localStorage)
const DB_KEY = "zeze_users";

// Utilidades
function getDB() {
    return JSON.parse(localStorage.getItem(DB_KEY)) || {};
}

function saveDB(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// Login Google (SIMULADO PROFISSIONAL)
window.loginGoogle = function () {
    const email = prompt("Digite seu e-mail do Google:");

    if (!email || !email.includes("@")) {
        alert("E-mail inválido.");
        return;
    }

    const db = getDB();

    if (!db[email]) {
        db[email] = {
            email,
            vip: false,
            vipExpira: null
        };
        saveDB(db);
    }

    localStorage.setItem("usuario_logado", email);
    carregarUsuario();
};

// Logout
window.logout = function () {
    localStorage.removeItem("usuario_logado");
    location.reload();
};

// Carregar usuário
function carregarUsuario() {
    const email = localStorage.getItem("usuario_logado");
    if (!email) return;

    const db = getDB();
    const user = db[email];

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";

    document.getElementById("userEmail").innerText = user.email;

    if (user.vip) {
        document.getElementById("vipStatus").innerText = "VIP";
        document.getElementById("vipStatus").classList.add("vip");
        document.getElementById("vipSection").style.display = "block";
    } else {
        document.getElementById("vipStatus").innerText = "FREE";
    }
}

// Gerador de sensibilidade
window.gerarSensi = function () {
    const modelo = document.getElementById("modeloCelular").value.trim();
    const resultado = document.getElementById("resultadoSensi");

    if (!modelo) {
        resultado.innerHTML = "<p>❌ Digite o modelo do celular.</p>";
        return;
    }

    const sensi = {
        geral: Math.floor(Math.random() * 50) + 50,
        redDot: Math.floor(Math.random() * 40) + 60,
        mira2x: Math.floor(Math.random() * 30) + 50,
        mira4x: Math.floor(Math.random() * 20) + 40,
        awm: Math.floor(Math.random() * 10) + 30
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

// Auto login
carregarUsuario();
