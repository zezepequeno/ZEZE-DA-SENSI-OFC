import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithRedirect, 
    getRedirectResult, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
   FIREBASE CONFIG
================================ */
const firebaseConfig = {
    apiKey: "AIzaSyBXrz_LFG44evIKLVBjYk4dYhaO9T2-FE0",
    authDomain: "zeze-da-sensi-ofc.firebaseapp.com",
    projectId: "zeze-da-sensi-ofc",
    storageBucket: "zeze-da-sensi-ofc.appspot.com"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

/* ===============================
   GOOGLE PROVIDER
================================ */
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

/* ===============================
   LOGIN (REDIRECT ONLY)
================================ */
export async function loginGoogle() {
    try {
        await signInWithRedirect(auth, provider);
    } catch (err) {
        console.error("Erro login Google:", err);
        alert("Erro ao tentar login com Google");
    }
}

/* ===============================
   REDIRECT RESULT
================================ */
getRedirectResult(auth).catch(() => {});

/* ===============================
   LOGOUT
================================ */
export async function logout() {
    await signOut(auth);
    location.reload();
}

/* ===============================
   AUTH OBSERVER
================================ */
export function watchAuth(callback) {
    onAuthStateChanged(auth, callback);
}

/* ===============================
   FIRESTORE USER
================================ */
export async function getOrCreateUser(user) {
    if (!user) return null;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        const data = {
            email: user.email,
            vip: false,
            createdAt: Date.now()
        };
        await setDoc(userRef, data);
        return data;
    }

    return userSnap.data();
}
