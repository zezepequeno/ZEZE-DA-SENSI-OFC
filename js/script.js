import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 CONFIG FIREBASE */
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

/* ELEMENTOS */
const loginBox = document.getElementById("loginBox");
const appBox = document.getElementById("app");
const googleBtn = document.getElementById("googleLogin");
const logoutBtn = document.getElementById("logoutBtn");
const gerarBtn = document.getElementById("gerarBtn");

const userEmail = document.getElementById("userEmail");
const vipStatus = document.getElementById("vipStatus");
const vipSection = document.getElementById("vipSection");
const resultado = document.getElementById("resultadoSensi");

/* LOGIN GOOGLE */
googleBtn.onclick = async () => {
    await signInWithPopup(auth, provider);
};

/* LOGOUT */
logoutBtn.onclick = () => signOut(auth);

/* ESTADO DO USUÁRIO */
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        loginBox.style.display = "block";
        appBox.style.display = "none";
        return;
    }

    loginBox.style.display = "none";
    appBox.style.display = "block";

    userEmail.textContent = user.email;

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        await setDoc(ref, {
            email: user.email,
            uid: user.uid,
            vip: false,
            isAdmin: false,
            createdAt: serverTimestamp()
        });
    }

    const data = (await getDoc(ref)).data();

    if (data.vip) {
        vipStatus.textContent = "VIP";
        vipStatus.classList.add("vip");
        vipSection.style.display = "block";
    } else {
        vipStatus.textContent = "FREE";
        vipSection.style.display = "none";
    }
});

/* GERADOR */
gerarBtn.onclick = () => {
    const modelo = document.getElementById("modeloCelular").value.trim();
    if (!modelo) return;

    resultado.innerHTML = `
        📱 <b>${modelo}</b><br>
        📅 Atualizado – 2026<br><br>

        🎯 Geral: <b>95</b><br>
        🎯 Mira Red Dot: <b>90</b><br>
        🎯 Mira 2x: <b>85</b><br>
        🎯 Mira 4x: <b>80</b><br>
        🎯 AWM: <b>55</b><br><br>

        🔥 Ajuste fino baseado em IA para seu dispositivo.
    `;
};
