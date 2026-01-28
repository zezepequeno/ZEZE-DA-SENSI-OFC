import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ADM_EMAILS = ["rafaelaranja90@gmail.com"];

onAuthStateChanged(auth, async user => {
    if (!user || !ADM_EMAILS.includes(user.email)) {
        alert("Acesso Negado!");
        window.location.href = "index.html";
        return;
    }
    carregarUsuarios();
});

async function carregarUsuarios() {
    const lista = document.getElementById("lista");
    const totalUsers = document.getElementById("totalUsers");
    lista.innerHTML = "Carregando...";
    
    const querySnapshot = await getDocs(collection(db, "users"));
    lista.innerHTML = "";
    totalUsers.innerText = querySnapshot.size;

    querySnapshot.forEach((userDoc) => {
        const data = userDoc.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${data.email}</td>
            <td class="${data.vip ? 'vip' : 'free'}">${data.vip ? 'VIP' : 'FREE'}</td>
            <td>
                <button class="${data.vip ? 'btn-remover' : 'btn-ativar'}" 
                        onclick="toggleVip('${userDoc.id}', ${data.vip})">
                    ${data.vip ? 'Tirar VIP' : 'Dar VIP'}
                </button>
            </td>
        `;
        lista.appendChild(tr);
    });
}

window.toggleVip = async (uid, currentStatus) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { vip: !currentStatus });
    carregarUsuarios(); // Atualiza a lista
};

