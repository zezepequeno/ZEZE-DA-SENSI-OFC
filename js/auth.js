const provider = new firebase.auth.GoogleAuthProvider();

function loginGoogle() {
  auth.signInWithPopup(provider)
    .then(async (result) => {
      const user = result.user;

      const ref = db.collection("users").doc(user.uid);
      const snap = await ref.get();

      if (!snap.exists) {
        await ref.set({
          email: user.email,
          uid: user.uid,
          vip: false,
          vipExpire: null,
          createdAt: new Date()
        });
      }

      window.location.href = "dashboard.html";
    })
    .catch((err) => {
      alert("Erro no login: " + err.message);
    });
}

// bloqueia acesso se já estiver logado
auth.onAuthStateChanged((user) => {
  if (user && window.location.pathname.includes("index.html")) {
    window.location.href = "dashboard.html";
  }
});
