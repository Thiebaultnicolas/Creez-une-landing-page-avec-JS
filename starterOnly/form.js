// Sélectionne le formulaire dans le DOM
const form = document.querySelector("#form");

// Fonction pour afficher les messages d'erreur
const showError = (valid, message, errorFieldId) => {
  // Sélectionner l'élément du DOM où afficher le message d'erreur en utilisant son ID
  const errorField = document.querySelector(errorFieldId);

  // Vérifier si la validation a réussi (valid === true)
  if (valid) {
    // Si la validation a réussi, effacer tout contenu précédent dans le champ d'erreur
    errorField.innerHTML = '';
    return; // Sortir de la fonction car il n'y a pas d'erreur à afficher
  }

  // Si la validation a échoué (valid === false), afficher le message d'erreur dans le champ approprié
  errorField.innerHTML = message;
};

// Fonction pour valider le champ du prénom
const checkName = (field) => {
  if (field.value.trim() === "") {
    return { valid: false, message: "Le champ ne doit pas être vide" };
  }

  if (field.value.length < 2) {
    return {
      valid: false,
      message: "Le champ doit contenir minimum 2 caractères",
    };
  }

  const regex = new RegExp("^[a-z ,.'-,é,è]+$", "i");
  if (regex.test(field.value)) {
    return { valid: true };
  }

  return {
    valid: false,
    message: "Le champ doit contenir uniquement des lettres",
  };
};

// Fonction pour valider le champ email
const checkEmail = (field) => {
  if (field.value.trim() === "") {
    return { valid: false, message: "Le champ ne doit pas être vide" };
  }

  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegExp.test(field.value)) {
    return { valid: false, message: "Veuillez saisir un email correct" };
  }

  return { valid: true };
};

// Fonction pour valider le champ date de naissance
const checkBirthdate = (field) => {
  // Convertir la valeur du champ en objet Date
  const dateValue = new Date(field.value);

  // Vérifier si le champ est vide
  if (field.value.trim() === "") {
    // Si le champ est vide, renvoyer un objet indiquant que la validation a échoué
    // avec un message approprié
    return { valid: false, message: "Veuillez indiquer votre Date" };
  }

  // Vérifier si la valeur convertie en Date est invalide (NaN) ou si l'année est inférieure à 1914
  if (isNaN(dateValue.getTime()) || dateValue.getFullYear() < 1914) {
    // Si la date n'est pas valide ou si l'année est antérieure à 1914,
    // renvoyer un objet indiquant que la validation a échoué
    // avec un message approprié
    return {
      valid: false,
      message: "Veuillez saisir une date correcte ( minimum 1914)",
    };
  }

  // Si la validation réussit, renvoyer un objet indiquant que la validation a réussi
  return { valid: true };
};

// Fonction pour valider le champ de la question
const checkQuestion = (field) => {
  const answer = field.value.trim();

  if (answer === "") {
    return { valid: false, message: "Le champ ne doit pas être vide" };
  }

  if (answer < 0 || answer > 500) {
    return { valid: false, message: "Maximum de 500" };
  }

  return { valid: true };
};

// Fonction pour valider la sélection d'un tournoi
const checkTournament = (radioGroup) => {
  let valid = false;
  radioGroup.forEach((radio) => {
    if (radio.checked) {
      valid = true;
    }
  });
  return valid
    ? { valid: true }
    : { valid: false, message: "Veuillez sélectionner une des villes" };
};

// Fonction pour valider l'acceptation des conditions
const checkConditions = () => {
  const conditionCheckbox = document.getElementById("checkbox1");
  const conditionLabel = document.querySelector(
    `label[for="${conditionCheckbox.id}"]`
  );
  if (conditionCheckbox.checked) {
    conditionLabel.classList.remove("error");
    return { valid: true };
  }
  conditionLabel.classList.add("error");
  return {
    valid: false,
    message: "Vous devez accepter les conditions d'utilisation",
  };
};

// Écouteur d'événement pour la soumission du formulaire
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Validation des champs
  const isFirstValid = checkName(form.first);
  const isLastValid = checkName(form.last);
  const isEmailValid = checkEmail(form.email);
  const isBirthDateValid = checkBirthdate(form.birthdate);
  const isQuestionValid = checkQuestion(form.quantity);
  const isTournamentValid = checkTournament(
    document.querySelectorAll("[name='location']")
  );
  const isConditionsAccepted = checkConditions();

  // Affichage des messages d'erreur pour chaque champ
  showError(isFirstValid.valid, isFirstValid.message, '#id_texte_prénom');
  showError(isLastValid.valid, isLastValid.message, '#id_texte_nom');
  showError(isEmailValid.valid, isEmailValid.message, '#id_texte_email');
  showError(isBirthDateValid.valid, isBirthDateValid.message, '#id_texte_birthdate');
  showError(isQuestionValid.valid, isQuestionValid.message, '#id_texte_question');
  showError(isTournamentValid.valid, isTournamentValid.message, "#id_texte_tournament");
  showError(isConditionsAccepted.valid, isConditionsAccepted.message, "#id_texte_conditions");

  // Si tous les champs sont valides, afficher la modale de confirmation
  if (
    isFirstValid.valid &&
    isLastValid.valid &&
    isEmailValid.valid &&
    isBirthDateValid.valid &&
    isQuestionValid.valid &&
    isTournamentValid.valid &&
    isConditionsAccepted.valid
  ) {
    showConfirmationModal();
    form.reset(); // Réinitialiser les champs du formulaire après soumission réussie
  }
});