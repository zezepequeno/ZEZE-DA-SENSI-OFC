/* ===============================
   FIREBASE IMPORTS
================================ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
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
   EMAILS ADMIN AUTORIZADOS
================================ */
const ADM_EMAILS = ["rafaellaranga80@gmail.com"];

/* ===============================
   INIT
================================ */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ===============================
   ELEMENTOS DOM
================================ */
const totalUsersEl = document.getElementById("totalUsers");
const vipUsersEl = document.getElementById("vipUsers");
const listaEl = document.getElementById("lista");

/* ===============================
   PROTEÇÃO DE ACESSO ADMIN
================================ */
onAuthStateChanged(auth, user => {
  if (!user || !ADM_EMAILS.includes(user.email)) {
    alert("⛔ Acesso restrito ao administrador");
    location.href = "index.html";
    return;
  }

  carregarUsuarios();
});

/* ===============================
   CARREGAR USUÁRIOS
================================ */
async function carregarUsuarios() {
  listaEl.innerHTML = "";
  let total = 0;
  let vipTotal = 0;

  try {
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

      listaEl.appendChild(tr);
    });

    totalUsersEl.innerText = total;
    vipUsersEl.innerText = vipTotal;

  } catch (e) {
    console.error("Erro ao carregar usuários:", e);
    alert("Erro ao carregar painel admin");
  }
}

/* ===============================
   TOGGLE VIP
================================ */
window.toggleVip = async (uid, statusAtual) => {
  try {
    const ref = doc(db, "users", uid);
    await updateDoc(ref, { vip: !statusAtual });
    carregarUsuarios();
  } catch (e) {
    console.error("Erro ao atualizar VIP:", e);
    alert("Erro ao atualizar VIP");
  }
};
