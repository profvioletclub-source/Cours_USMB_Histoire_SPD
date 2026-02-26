// --- CONFIG FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyD40uUgxFoEyz13kNbRKIqhUHhYqTFivWA",
  authDomain: "cours-l1-spd.firebaseapp.com",
  projectId: "cours-l1-spd",
  storageBucket: "cours-l1-spd.appspot.com",
  messagingSenderId: "78540999306",
  appId: "1:78540999306:web:fc64877610d1a998a1fb73"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// --- FONCTION POUR LIRE LES PARAMÈTRES D'URL ---
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// --- PAGE DE CONNEXION ---
if (document.getElementById("login-btn")) {
    document.getElementById("login-btn").addEventListener("click", () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                const redirect = getQueryParam("redirect");
                if (redirect) {
                    window.location.href = redirect;
                } else {
                    window.location.href = "accueil.html";
                }
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
        const currentPage = window.location.pathname.replace("/", "");
        window.location.href = "index.html?redirect=" + currentPage;
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
