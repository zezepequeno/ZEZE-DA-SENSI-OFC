// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🔥 CONFIG DO FIREBASE (USA A SUA)
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ELEMENTOS
const loginBox = document.getElementById("loginBox");
const appBox = document.getElementById("app");
const googleBtn = document.getElementById("googleLogin");
const logoutBtn = document.getElementById("logoutBtn");
const userEmail = document.getElementById("userEmail");
const vipStatus = document.getElementById("vipStatus");
const vipSection = document.getElementById("vipSection");

// LOGIN GOOGLE (SEM LOOP)
googleBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    alert("Erro no login Google");
    console.error(e);
  }
});

// ESTADO DO USUÁRIO
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginBox.style.display = "none";
    appBox.style.display = "block";
    userEmail.textContent = user.email;

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        uid: user.uid,
        email: user.email,
        vip: false,
        isAdmin: false,
        createdAt: serverTimestamp()
      });
    }

    const data = (await getDoc(ref)).data();

    if (data.vip) {
      vipStatus.textContent = "VIP";
      vipSection.style.display = "block";
    } else {
      vipStatus.textContent = "FREE";
    }

  } else {
    loginBox.style.display = "block";
    appBox.style.display = "none";
  }
});

// LOGOUT
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});
