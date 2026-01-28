import { loginGoogle, logout, watchAuth, getOrCreateUser } from "./firebase.js";
import { GERAR_SENSI_IA } from "./sensi.js";

const ADM_EMAILS = ["rafaelaranja90@gmail.com"];
const $ = id => document.getElementById(id);

window.loginGoogle = loginGoogle;
window.logout = logout;

watchAuth(async user => {
  if (!user) {
    $("loginBox").style.display = "block";
    $("painel").style.display = "none";
    $("perfil").style.display = "none";
    return;
  }

  $("loginBox").style.display = "none";
  $("painel").style.display = "block";
  $("perfil").style.display = "block";
  $("email").innerText = user.email;

  const data = await getOrCreateUser(user);
  const isVip = data && data.vip === true;

  $("vipStatus").innerText = isVip ? "VIP ATIVO 🔥" : "FREE";
  $("vipStatus").className = `status ${isVip ? 'vip' : 'free'}`;
  $("vipCTA").style.display = isVip ? "none" : "block";

  if (ADM_EMAILS.includes(user.email) && !$("adminBtn")) {
    const btn = document.createElement("button");
    btn.id = "adminBtn";
    btn.innerText = "⚙️ ADMIN";
    btn.style.cssText = "background:#333; color:white; border:none; padding:5px; margin-top:10px; border-radius:5px;";
    btn.onclick = () => location.href = "admin.html";
    $("perfil").appendChild(btn);
  }
});

window.gerarSensi = () => {
  const modelo = $("modelo").value.trim();
  if (!modelo) return alert("Digite o modelo!");
  const isVip = $("vipStatus").innerText.includes("VIP");
  $("resultado").innerHTML = GERAR_SENSI_IA(modelo, isVip);
};
