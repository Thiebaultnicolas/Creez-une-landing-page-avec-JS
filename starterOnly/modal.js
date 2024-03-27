// Sélection des éléments du DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector('.close')

// Fonction pour activer/désactiver la classe responsive du menu de navigation
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Fonction pour fermer la modale en cliquant en dehors d'elle
const closeModalOnClickOutside = (modal) => {
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });
};

// Fonction pour afficher une modale de confirmation
const showConfirmationModal = () => {
  // Fermer la modale du formulaire
  modalbg.style.display = "none";

  // Créer une nouvelle modale de confirmation
  const confirmationModal = document.createElement("div");
  confirmationModal.classList.add("confirmation-modal");
  confirmationModal.innerHTML = `
    <div class="modal-content">
      <p>Super ! Merci pour ton inscription !</p>
    </div>
  `;
  document.body.appendChild(confirmationModal);

  // Appeler la fonction pour fermer la modale en cliquant en dehors d'elle
  closeModalOnClickOutside(confirmationModal);
};

// Écouteur d'événement pour le clic sur le bouton d'inscription
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Fonction pour afficher la modale de formulaire
function launchModal() {
  modalbg.style.display = "block";
}

// Fonction pour fermer la modale
function closeModal() {
  // Modification du style de modalbg pour masquer la modale en lui attribuant la valeur 'none'
  modalbg.style.display = 'none';
}

// Écouteur d'événement pour le clic sur le bouton de fermeture de la modale
modalClose.addEventListener('click', () => {
  // Lorsque l'utilisateur clique sur le bouton de fermeture, appelle la fonction closeModal() pour masquer la modale
  closeModal();
})