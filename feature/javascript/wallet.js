const prompt = require('prompt-sync')();

function afficherMessage(message) {
  console.log(message);
}

class Portefeuille {
  constructor(couleur, taille, limiteStockage) {
    this.couleur = couleur;
    this.taille = taille;
    this.limiteStockage = limiteStockage;
    this.documents = {};
    this.estVide = true;
    this.estPerdu = false;
  }

  acheterPortefeuille() {
    afficherMessage(`Vous n'avez pas de portefeuille. Achetez-en un de couleur ${this.couleur} et de taille ${this.taille}.`);
    this.estVide = false;
  }

  ajouterArgent(montant) {
    if (this.estVide) {
      afficherMessage("Vous devez d'abord acheter un portefeuille.");
      return;
    }
    if (!this.documents.Money) {
      this.documents.Money = montant;
    } else {
      this.documents.Money += montant;
    }
    afficherMessage(`Argent ajouté. Nouveau solde : ${this.documents.Money}`);
  }

  ajouterDocument(type, document) {
    if (!this.documents[type]) {
      this.documents[type] = [];
    }

    if (this.documents[type].length < this.limiteStockage) {
      this.documents[type].push(document);
      afficherMessage(`${document} ajouté au portefeuille.`);
    } else {
      afficherMessage(`Limite de stockage atteinte pour les ${type}.`);
    }
  }

  retirerDocument(type, document) {
    if (!this.documents[type] || this.documents[type].length === 0) {
      afficherMessage(`Aucun document de type ${type} dans le portefeuille.`);
      return;
    }

    const index = this.documents[type].indexOf(document);
    if (index !== -1) {
      this.documents[type].splice(index, 1);
      afficherMessage(`${document} retiré du portefeuille.`);
    } else {
      afficherMessage(`${document} non trouvé dans le portefeuille.`);
    }
  }
}

function consulterPortefeuille(portefeuille) {
  if (portefeuille.estVide) {
    portefeuille.acheterPortefeuille();
  }

  while (true) {
    const choix = prompt('Voulez-vous rentrer des documents ou de l\'argent ? (documents/argent/quitter) ');

    if (choix === 'documents') {
      const typeDocument = prompt('Entrez le type de document : ');
      const nomDocument = prompt('Entrez le nom du document : ');
      portefeuille.ajouterDocument(typeDocument, nomDocument);
    } else if (choix === 'argent') {
      const montant = parseFloat(prompt('Entrez le montant à ajouter : '));
      portefeuille.ajouterArgent(montant);
    } else if (choix === 'quitter') {
      afficherMessage('Au revoir !');
      break;
    } else {
      afficherMessage('Choix non reconnu. Veuillez réessayer.');
    }

    if (!portefeuille.estVide) {
      while (true) {
        const nouvelleOperation = prompt('Voulez-vous effectuer une autre opération ? (oui/non) ');

        if (nouvelleOperation === 'oui') {
          const choixOperation = prompt('Que souhaitez-vous faire ? (documents/argent/quitter) ');

          if (choixOperation === 'documents') {
            const typeDocument = prompt('Entrez le type de document : ');
            const nomDocument = prompt('Entrez le nom du document : ');
            portefeuille.ajouterDocument(typeDocument, nomDocument);
          } else if (choixOperation === 'argent') {
            const montant = parseFloat(prompt('Entrez le montant à ajouter : '));
            portefeuille.ajouterArgent(montant);
          } else if (choixOperation === 'quitter') {
            afficherMessage('Au revoir !');
            return;
          } else {
            afficherMessage('Choix non reconnu. Veuillez réessayer.');
          }
        } else if (nouvelleOperation === 'non') {
          afficherMessage('Au revoir !');
          return;
        } else {
          afficherMessage('Veuillez répondre par oui ou non.');
        }
      }
    }
  }
}

const couleur = prompt('Choisissez la couleur du portefeuille : ');
const taille = prompt('Choisissez la taille du portefeuille : ');
const limiteStockage = parseInt(prompt('Choisissez la limite de stockage : '));

const monPortefeuille = new Portefeuille(couleur, taille, limiteStockage);
consulterPortefeuille(monPortefeuille);
