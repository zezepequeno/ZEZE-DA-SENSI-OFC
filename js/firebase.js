<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
  import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
  } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
  import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    serverTimestamp
  } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBHA5x5Q0eY3anWzM75ffUDY6P6FQRslJk",
    authDomain: "zeze-da-sensi-ofc11.firebaseapp.com",
    projectId: "zeze-da-sensi-ofc11",
    storageBucket: "zeze-da-sensi-ofc11.firebasestorage.app",
    messagingSenderId: "61734156611",
    appId: "1:61734156611:web:01a2a137479dbddcaad7f6",
    measurementId: "G-J2R9N1PTZ7"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);

  // BOTÃO LOGIN GOOGLE
  window.loginGoogle = async function () {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          vip: false,
          isAdmin: false,
          createdAt: serverTimestamp()
        });
      }

      window.location.href = "home.html"; // ou dashboard.html
    } catch (err) {
      alert("Erro no login Google");
      console.error(err);
    }
  };

  // EVITA LOOP
  onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname.includes("login")) {
      window.location.href = "home.html";
    }
  });
</script>
