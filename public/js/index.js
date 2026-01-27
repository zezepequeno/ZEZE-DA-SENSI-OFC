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
   CONFIG
================================ */
const ADM_EMAILS = ["rafaelaranga90@gmail.com"];
const $ = id => document.getElementById(id);

/* ===============================
   EXPOR FUNÇÕES PRO HTML
================================ */
window.loginGoogle = loginGoogle;
window.logout = logout;

/* ===============================
   CONTROLE DE LOGIN
================================ */
watchAuth(async user => {

  /* ---------- DESLOGADO ---------- */
  if (!user) {
    if ($("loginBox")) $("loginBox").style.display = "block";
    if ($("painel")) $("painel").style.display = "none";
    if ($("perfil")) $("perfil").style.display = "none";
    return;
  }

  /* ---------- LOGADO ---------- */
  if ($("loginBox")) $("loginBox").style.display = "none";
  if ($("painel")) $("painel").style.display = "block";
  if ($("perfil")) $("perfil").style.display = "flex";

  if ($("email")) $("email").innerText = user.email;

  /* ---------- DADOS DO USUÁRIO ---------- */
  const data = await getOrCreateUser(user);

  /* ---------- STATUS VIP ---------- */
  if ($("vipStatus")) {
    $("vipStatus").innerText = data.vip ? "VIP ATIVO 🔥" : "FREE";
    $("vipStatus").className = data.vip ? "status vip" : "status free";
  }

  if ($("vipCTA")) {
    $("vipCTA").style.display = data.vip ? "none" : "block";
  }

  /* ---------- BOTÃO ADMIN (SÓ ADM) ---------- */
  if (ADM_EMAILS.includes(user.email)) {
    if (!$("adminBtn") && $("painel")) {
      const btn = document.createElement("button");
      btn.id = "adminBtn";
      btn.className = "admin-btn";
      btn.innerHTML = "⚙️ PAINEL ADMIN";
      btn.onclick = () => location.href = "admin.html";
      $("painel").prepend(btn);
    }
  }
});

/* ===============================
   GERAR SENSI
================================ */
window.gerarSensi = () => {
  const modelo = $("modelo")?.value.trim();

  if (!modelo) {
    alert("Digite o modelo do celular");
    return;
  }

  const vip = $("vipStatus")?.innerText.includes("VIP");
  const html = GERAR_SENSI_IA(modelo, vip);

  if ($("resultado")) {
    $("resultado").innerHTML = `
      <h3>🎯 SENSIBILIDADE IDEAL — FREE FIRE</h3>
      ${html}
    `;
  }
};
