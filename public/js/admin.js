/* ===============================
   FIREBASE IMPORTS
================================ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
   CONFIG FIREBASE
================================ */
const firebaseConfig = {
  apiKey: "AIzaSyBXrz_LFG44evIKLVBjYk4dYhaO9T2-FE0",
  authDomain: "zeze-da-sensi-ofc.firebaseapp.com",
  projectId: "zeze-da-sensi-ofc",
  storageBucket: "zeze-da-sensi-ofc.appspot.com"
};

/* ===============================
   EMAIL ADMIN
================================ */
const ADM_EMAILS = ["rafaelaranja90@gmail.com"];

/* ===============================
   INIT
================================ */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

/* ===============================
   DOM
================================ */
const $ = id => document.getElementById(id);

/* ===============================
   LOGIN / LOGOUT
================================ */
window.loginGoogle = async () => {
  await signInWithPopup(auth, provider);
};

window.logout = async () => {
  await signOut(auth);
  location.href = "index.html";
};

/* ===============================
   PROTEÇÃO ADMIN
================================ */
onAuthStateChanged(auth, user => {
  if (!user || !ADM_EMAILS.includes(user.email)) {
    alert("⛔ Acesso restrito ao administrador");
    location.href = "index.html";
    return;
  }

  $("loginBox").style.display = "none";
  $("perfil").style.display = "block";
  $("painel").style.display = "block";

  $("email").innerText = user.email;

  carregarUsuarios();
});

/* ===============================
   CARREGAR USUÁRIOS
================================ */
async function carregarUsuarios() {
  $("lista").innerHTML = "";
  let total = 0;
  let vipTotal = 0;

  const snap = await getDocs(collection(db, "users"));

  snap.forEach(docSnap => {
    total++;
    const data = docSnap.data();
    if (data.vip) vipTotal++;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${data.email}</td>
      <td>${docSnap.id}</td>
      <td class="${data.vip ? "vip" : "free"}">
        ${data.vip ? "VIP" : "FREE"}
      </td>
      <td>${data.vip ? "ATIVO" : "-"}</td>
      <td>
        <button onclick="toggleVip('${docSnap.id}', ${data.vip})">
          ${data.vip ? "Remover VIP" : "Ativar VIP"}
        </button>
      </td>
    `;

    $("lista").appendChild(tr);
  });

  $("totalUsers").innerText = total;
  $("vipUsers").innerText = vipTotal;
}

/* ===============================
   TOGGLE VIP
================================ */
window.toggleVip = async (uid, statusAtual) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { vip: !statusAtual });
  carregarUsuarios();
};
