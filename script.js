document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btn-ressources");

    btn.addEventListener("click", () => {
        alert("Les ressources seront bientôt disponibles !");
    });
});

// --- CONFIG FIREBASE ---
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_AUTH_DOMAIN",
  projectId: "TON_PROJECT_ID",
  storageBucket: "TON_STORAGE_BUCKET",
  messagingSenderId: "TON_SENDER_ID",
  appId: "TON_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// --- PAGE DE CONNEXION ---
if (document.getElementById("login-btn")) {
    document.getElementById("login-btn").addEventListener("click", () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = "accueil.html";
            })
            .catch(error => {
                document.getElementById("error-message").textContent = error.message;
            });
    });
}

// --- PROTECTION DES PAGES ---
auth.onAuthStateChanged(user => {
    const isLoginPage = window.location.pathname.includes("index.html");

    if (!user && !isLoginPage) {
        window.location.href = "index.html";
    }
});

// --- DECONNEXION ---
if (document.getElementById("logout-btn")) {
    document.getElementById("logout-btn").addEventListener("click", () => {
        auth.signOut().then(() => {
            window.location.href = "index.html";
        });
    });
}
