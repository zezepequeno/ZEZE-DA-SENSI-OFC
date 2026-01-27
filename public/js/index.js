/* ===============================
   INDEX CONTROLLER
   Arquivo: js/index.js
================================ */

/* ===============================
   IMPORTS
================================ */
import {
  auth,
  loginGoogle,
  logout,
  watchAuth,
  getOrCreateUser
} from "./firebase.js";

import { GERAR_SENSI_IA } from "./sensi.js";

/* ===============================
   CONFIGURAÇÕES
================================ */
const ADM_EMAILS = ["rafaellaranga80@gmail.com"];
const $ = id => document.getElementById(id);

/* ===============================
   BIND GLOBAL (HTML)
================================ */
window.loginGoogle = loginGoogle;
window.logout = logout;

/* ===============================
   ESTADO DE AUTENTICAÇÃO
================================ */
watchAuth(async user => {
  // NÃO LOGADO
  if (!user) {
    $("loginBox").style.display = "block";
    $("painel").style.display = "none";
    $("perfil").style.display = "none";
    return;
  }

  // LOGADO
  $("loginBox").style.display = "none";
  $("painel").style.display = "block";
  $("perfil").style.display = "flex";

  $("email").innerText = user.email;

  /* ===============================
     BUSCAR / CRIAR USUÁRIO
  ================================ */
  const data = await getOrCreateUser(user);

  /* ===============================
     STATUS VIP
  ================================ */
  if (data.vip) {
    $("vipStatus").innerText = "VIP ATIVO 🔥";
    $("vipStatus").className = "status vip";
    $("vipCTA").style.display = "none";
  } else {
    $("vipStatus").innerText = "FREE";
    $("vipStatus").className = "status free";
    $("vipCTA").style.display = "block";
  }

  /* ===============================
     BOTÃO ADMIN (SÓ ADM)
  ================================ */
  if (ADM_EMAILS.includes(user.email)) {
    if (!$("adminBtn")) {
      const btn = document.createElement("button");
      btn.id = "adminBtn";
      btn.className = "admin-btn";
      btn.innerText = "⚙️ PAINEL ADMIN";
      btn.onclick = () => {
        location.href = "admin.html";
      };

      $("painel").prepend(btn);
    }
  }
});

/* ===============================
   GERAR SENSIBILIDADE
================================ */
window.gerarSensi = () => {
  const modelo = $("modelo").value.trim();

  if (!modelo) {
    alert("Digite o modelo do celular.");
    return;
  }

  const vipAtivo = $("vipStatus").innerText.includes("VIP");

  const resultadoHTML = GERAR_SENSI_IA(modelo, vipAtivo);

  $("resultado").innerHTML = `
    <h3>🎯 SENSIBILIDADE IDEAL — FREE FIRE</h3>
    ${resultadoHTML}
  `;
};
