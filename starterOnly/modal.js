// Sélection des éléments du DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector('.close ')

// Fonction pour activer/désactiver la classe responsive du menu de navigation
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


// Fonction pour afficher une modale de confirmation
const showConfirmationModal = () => {
  // Fermer la modale du formulaire
  closeModal();

  // Créer une nouvelle modale de confirmation
  const confirmationModal = document.createElement("div");
  confirmationModal.classList.add("confirmation-modal");
  confirmationModal.innerHTML = `
    <div class="modal-content">
      <span class="close2">&times;</span> <!-- Croix pour fermer la modale -->
      <p>Merci pour<br><br/>votre inscription !</p>
      <button class="button-close">Fermer</button> <!-- Bouton "Fermer" -->
    </div>
  `;
  document.body.appendChild(confirmationModal);

  // Sélectionner le bouton de fermeture de la modale
  const closeButton = confirmationModal.querySelector('.close2');
  const closeButtonInner = confirmationModal.querySelector('.button-close');

  // Ajouter un écouteur d'événement au bouton de fermeture et au bouton "Fermer"
  closeButton.addEventListener('click', () => {
    closeConfirmationModal(); // Appeler la fonction closeConfirmationModal() lorsque le bouton de fermeture est cliqué
  });

  closeButtonInner.addEventListener('click', () => {
    closeConfirmationModal(); // Appeler la fonction closeConfirmationModal() lorsque le bouton "Fermer" est cliqué
  });
};

// Fonction pour fermer la modal de confirmation
function closeConfirmationModal() {
  const confirmationModal = document.querySelector('.confirmation-modal');
  if (confirmationModal) {
    confirmationModal.remove(); // Supprimer la modal de confirmation du DOM
  }
}



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