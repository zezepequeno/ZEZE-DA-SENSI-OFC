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
    setDoc 
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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

/* ===============================
   PROVIDER GOOGLE
================================ */
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

/* ===============================
   LOGIN
================================ */
export async function loginGoogle() {
    try {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            await signInWithRedirect(auth, provider);
        } else {
            await signInWithPopup(auth, provider);
        }
    } catch (err) {
        console.error("Erro no login Google:", err);
    }
}

/* ===============================
   REDIRECT RESULT (MOBILE)
================================ */
getRedirectResult(auth)
    .then((result) => {
        if (result && result.user) {
            console.log("Login redirect OK:", result.user.email);
        }
    })
    .catch((error) => {
        console.error("Erro redirect:", error);
    });

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
    onAuthStateChanged(auth, async (user) => {
        callback(user);
    });
}

/* ===============================
   USER FIRESTORE
================================ */
export async function getOrCreateUser(user) {
    if (!user) return null;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        const newData = {
            email: user.email,
            vip: false,
            createdAt: Date.now()
        };
        await setDoc(userRef, newData);
        return newData;
    }

    return userSnap.data();
}
