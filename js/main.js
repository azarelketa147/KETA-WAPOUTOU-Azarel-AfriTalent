// ================= THEME DARK / LIGHT =================
// Bouton de toggle thème
const toggleBtn = document.getElementById("themeToggle");

// Body de la page
const body = document.body;

/* ===== Charger le thème au démarrage ===== */
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  // Si le thème sauvegardé est "light"
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    updateIcon(true);
  } else {
    body.classList.remove("light-mode");
    updateIcon(false);
  }
}
/* ===== Mise à jour de l’icône du bouton ===== */
function updateIcon(isLight) {
  if (!toggleBtn) return;

  toggleBtn.innerHTML = isLight
    ? '<i class="bi bi-sun-fill"></i>'
    : '<i class="bi bi-moon-fill"></i>';
}

/* ===== Toggle du thème ===== */
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isLight = body.classList.toggle("light-mode");

    // Sauvegarde du thème
    localStorage.setItem("theme", isLight ? "light" : "dark");

    updateIcon(isLight);
  });
}

// Application du thème au chargement
loadTheme();
// ================= NAVBAR SCROLL EFFECT =================
// Sélection de la navbar
const navbar = document.querySelector(".navbar");

/* ===== Effet au scroll ===== */
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ================= CANVAS ANIMATION (RÉSEAU) =================
// Canvas
const c = document.getElementById("network");
const ctx = c.getContext("2d");

// Taille du canvas
c.width = innerWidth;
c.height = innerHeight;

// Tableau des points
let points = [];

// Création des points aléatoires
for (let i = 0; i < 60; i++) {
  points.push({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    dx: (Math.random() - 0.5),
    dy: (Math.random() - 0.5)
  });
}

/* ===== Animation ===== */
function animate() {
  ctx.clearRect(0, 0, c.width, c.height);

  points.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    // Rebond sur les bords
    if (p.x < 0 || p.x > c.width) p.dx *= -1;
    if (p.y < 0 || p.y > c.height) p.dy *= -1;

    // Dessin des points
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#8f3dff";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

// Lancement animation
animate();

// ================= ANNÉE DYNAMIQUE FOOTER =================
document.getElementById("year").textContent =
new Date().getFullYear();


// ================= LOCAL STORAGE TEST (DEBUG) =================

// Sauvegarde thème (test)
localStorage.setItem("theme", "dark");

// Récupération thème (test)
localStorage.getItem("theme");

// Suppression thème (test)
localStorage.removeItem("theme");

// ================= COMPTEURS ANIMÉS =================

/* Fonction de compteur */
function startCounter(id, max = 2500, speed = 30) {

  let count = 0; // valeur initiale

  // élément HTML du compteur
  let compteur = document.getElementById(id);

  // intervalle d’animation
  let interval = setInterval(() => {

    count++; // incrémentation
    compteur.textContent = count; // affichage

    // arrêt du compteur
    if (count >= max) {
      clearInterval(interval);
    }

  }, speed);
}

/* Lancement des compteurs */
window.onload = function () {

  startCounter("count1", 150);
  startCounter("count2", 6);
  startCounter("count3", 50);
  startCounter("count4", 20);
  startCounter("count5", 200);
  startCounter("count6", 15);
  startCounter("count7", +2500);
  startCounter("count8", +800);
  startCounter("count9", 50);
  startCounter("count10", +1200);
};


// ================= APPARITION AU SCROLL =================

// Intersection Observer pour animation fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

// Observer toutes les sections fade-in
document.querySelectorAll(".fade-in").forEach(section => {
  observer.observe(section);
});

// ================= FILTRAGE DES CARTES =================

function filterCards(category) {

  // Sélection des cartes
  let cards = document.querySelectorAll(".card-item");

  cards.forEach(card => {

    // affichage si catégorie correspond
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });
}


// ================= VALIDATION FORMULAIRE =================

// Bouton envoyer
const bouton = document.getElementById("sendBtn");

// Événement clic
bouton.addEventListener("click", function (e) {

  // Empêche le rechargement
  e.preventDefault();

  // ===== Champs =====
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // ===== Messages d’erreur =====
  const nomError = document.getElementById("nomError");
  const prenomError = document.getElementById("prenomError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  // Message succès
  const successMessage = document.getElementById("successMessage");

  // Reset erreurs
  nomError.textContent = "";
  prenomError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  // cacher succès
  successMessage.style.display = "none";

  let valide = true;

  // ===== Validation nom =====
  if (nom === "") {
    nomError.textContent = "Veuillez entrer votre nom";
    valide = false;
  }

  // ===== Validation prénom =====
  if (prenom === "") {
    prenomError.textContent = "Veuillez entrer votre prénom";
    valide = false;
  }

  // ===== Validation email =====
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    emailError.textContent = "Veuillez entrer votre email";
    valide = false;
  } else if (!regexEmail.test(email)) {
    emailError.textContent = "Adresse email invalide";
    valide = false;
  }

  // ===== Validation message =====
  if (message === "") {
    messageError.textContent = "Veuillez écrire un message";
    valide = false;
  } else if (message.length < 20) {
    messageError.textContent =
      "Le message doit contenir au moins 20 caractères";
    valide = false;
  }

  // ===== Succès =====
  if (valide) {
    successMessage.style.display = "block";

    // reset champs
    document.getElementById("nom").value = "";
    document.getElementById("prenom").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  }
});
