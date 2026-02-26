// --- CONFIG FIREBASE --
const firebaseConfig = {
  apiKey: "AIzaSyD40uUgxFoEyz13kNbRKIqhUHhYqTFivWA",
  authDomain: "cours-l1-spd.firebaseapp.com",
  projectId: "cours-l1-spd",
  storageBucket: "cours-l1-spd.firebasestorage.app",
  messagingSenderId: "78540999306",
  appId: "1:78540999306:web:fc64877610d1a998a1fb73"
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
