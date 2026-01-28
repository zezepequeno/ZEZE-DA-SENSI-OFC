import { loginGoogle, logout, watchAuth, getOrCreateUser } from "./firebase.js";
import { GERAR_SENSI_IA } from "./sensi.js";

// Coloque aqui o seu e-mail para que SÓ VOCÊ veja o botão de Admin
const ADM_EMAILS = ["rafaelaranja90@gmail.com"];
const $ = id => document.getElementById(id);

window.loginGoogle = loginGoogle;
window.logout = logout;

watchAuth(async (user) => {
    if (!user) {
        $("loginBox").style.display = "block";
        $("perfil").style.display = "none";
        $("painel").style.display = "none";
        return;
    }

    // Se logou, mostra o Painel e o Perfil
    $("loginBox").style.display = "none";
    $("perfil").style.display = "block";
    $("painel").style.display = "block";
    $("email").innerText = user.email;

    const userData = await getOrCreateUser(user);
    const isVip = userData && userData.vip === true;

    $("vipStatus").innerText = isVip ? "VIP ATIVO 🔥" : "FREE";
    $("vipStatus").className = `status ${isVip ? 'vip' : 'free'}`;
    $("vipCTA").style.display = isVip ? "none" : "block";

    // Só cria o botão de Admin se o e-mail for o seu
    if (ADM_EMAILS.includes(user.email) && !$("adminBtn")) {
        const adminBtn = document.createElement("button");
        adminBtn.id = "adminBtn";
        adminBtn.innerText = "⚙️ PAINEL ADMIN";
        adminBtn.style.cssText = "background:#222; color:#fff; border:1px solid #555; padding:8px; border-radius:8px; cursor:pointer; margin-top:10px; width:100%; font-size:0.7rem;";
        adminBtn.onclick = () => location.href = "admin.html";
        $("perfil").appendChild(adminBtn);
    }
});

window.gerarSensi = () => {
    const modelo = $("modelo").value.trim();
    if (!modelo) return alert("Digite o modelo do celular!");
    const isVip = $("vipStatus").className.includes("vip");
    $("resultado").innerHTML = GERAR_SENSI_IA(modelo, isVip);
};
