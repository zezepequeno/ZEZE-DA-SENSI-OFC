import { loginGoogle, logout, watchAuth, getOrCreateUser } from "./firebase.js";
import { gerarSensi } from "./sensi.js";

window.loginGoogle = loginGoogle;
window.logout = logout;
window.gerarSensi = gerarSensi;

const loginBox = document.getElementById("loginBox");
const perfil = document.getElementById("perfil");
const painel = document.getElementById("painel");
const emailEl = document.getElementById("email");
const vipStatus = document.getElementById("vipStatus");
const vipCTA = document.getElementById("vipCTA");

watchAuth(async (user) => {
    if (user) {
        loginBox.style.display = "none";
        perfil.style.display = "block";
        painel.style.display = "block";

        emailEl.textContent = user.email;

        const data = await getOrCreateUser(user);
        if (data.vip) {
            vipStatus.textContent = "VIP";
            vipCTA.style.display = "none";
        } else {
            vipStatus.textContent = "FREE";
            vipCTA.style.display = "block";
        }
    } else {
        loginBox.style.display = "block";
        perfil.style.display = "none";
        painel.style.display = "none";
    }
});
