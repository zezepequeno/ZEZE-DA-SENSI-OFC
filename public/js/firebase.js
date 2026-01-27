/* ===============================
   FIREBASE CONFIG
================================ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
   CONFIG DO PROJETO
   (NÃO MEXER SE JÁ FUNCIONA)
================================ */
const firebaseConfig = {
  apiKey: "AIzaSyBXrz_LFG44evIKLVBjYk4dYhaO9T2-FE0",
  authDomain: "zeze-da-sensi-ofc.firebaseapp.com",
  projectId: "zeze-da-sensi-ofc",
  storageBucket: "zeze-da-sensi-ofc.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:000000000000"
};

/* ===============================
   INIT
================================ */
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

/* ===============================
   LOGIN GOOGLE
   (POPUP NO PC / REDIRECT NO MOBILE)
================================ */
export async function loginGoogle() {
  const isMobile = /Android|iPhone/i.test(navigator.userAgent);

  try {
    if (isMobile) {
      await signInWithRedirect(auth, provider);
    } else {
      await signInWithPopup(auth, provider);
    }
  } catch (err) {
    console.error("Erro no login:", err);
    alert("Erro ao fazer login. Tente novamente.");
  }
}

/* ===============================
   LOGOUT
================================ */
export async function logout() {
  try {
    await signOut(auth);
    location.reload();
  } catch (err) {
    console.error("Erro no logout:", err);
  }
}

/* ===============================
   OBSERVAR LOGIN (AUTH STATE)
================================ */
export function watchAuth(callback) {
  onAuthStateChanged(auth, user => {
    callback(user);
  });
}

/* ===============================
   CRIAR OU BUSCAR USUÁRIO
================================ */
export async function getOrCreateUser(user) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const data = {
      email: user.email,
      vip: false,
      createdAt: Date.now()
    };

    await setDoc(ref, data);
    return data;
  }

  return snap.data();
}

/* ===============================
   ATUALIZAR VIP (ADMIN)
================================ */
export async function setVip(uid, status) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { vip: status });
}
