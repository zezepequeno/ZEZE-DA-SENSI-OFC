import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXrz_LFG44evIKLVBjYk4dYhaO9T2-FE0",
  authDomain: "zeze-da-sensi-ofc.firebaseapp.com",
  projectId: "zeze-da-sensi-ofc",
  storageBucket: "zeze-da-sensi-ofc.appspot.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

export async function loginGoogle() {
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    console.error("Erro no login:", e);
    alert("Erro ao entrar com Google.");
  }
}

export async function logout() {
  await signOut(auth);
  location.reload();
}

export function watchAuth(cb) {
  onAuthStateChanged(auth, user => cb(user || null));
}

export async function getOrCreateUser(user) {
  if (!user) return null;
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const data = { email: user.email, vip: false, createdAt: Date.now() };
    await setDoc(ref, data);
    return data;
  }
  return snap.data();
}
