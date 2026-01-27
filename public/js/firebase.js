/* ===============================
   FIREBASE CONFIG + INIT
================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
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
   CONFIG
================================ */
const firebaseConfig = {
  apiKey: "AIzaSyBXrz_LFG44evIKLVBjYk4dYhaO9T2-FE0",
  authDomain: "zeze-da-sensi-ofc.firebaseapp.com",
  projectId: "zeze-da-sensi-ofc",
  storageBucket: "zeze-da-sensi-ofc.appspot.com"
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
================================ */
export async function loginGoogle() {
  try {
    const isMobile = /Android|iPhone/i.test(navigator.userAgent);
    if (isMobile) {
      await signInWithRedirect(auth, provider);
    } else {
      await signInWithPopup(auth, provider);
    }
  } catch (e) {
    alert("Erro ao fazer login");
    console.error(e);
  }
}

getRedirectResult(auth).catch(() => {});

/* ===============================
   LOGOUT
================================ */
export async function logout() {
  await signOut(auth);
  location.reload();
}

/* ===============================
   OBSERVADOR
================================ */
export function watchAuth(cb) {
  return onAuthStateChanged(auth, user => cb(user || null));
}

/* ===============================
   USER
================================ */
export async function getOrCreateUser(user) {
  if (!user) return null;

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

export async function setVip(uid, status) {
  if (!uid) return;
  await updateDoc(doc(db, "users", uid), { vip: status });
}
