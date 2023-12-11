import readline from 'readline-sync';


class Portefeuille {
    couleur: string;
    taille: string;
    limiteStockage: number;
    documents: { [key: string]: string[] };
    estVide: boolean;
    estPerdu: boolean;

    constructor() {
        this.couleur = '';
        this.taille = '';
        this.limiteStockage = 0;
        this.documents = {};
        this.estVide = true;
        this.estPerdu = false;
    }

    acheterPortefeuille(): void {
        console.log(`Vous n'avez pas de portefeuille. Achetez-en un de couleur ${this.couleur} et de taille ${this.taille}.`);
        this.estVide = false;
    }

    ajouterArgent(montant: number): void {
        if (this.estVide) {
            console.log("Vous devez d'abord acheter un portefeuille.");
            return;
        }

        if (!this.documents['Money']) {
            this.documents['Money'] = montant.toString();
        } else {
            this.documents['Money'] = (parseFloat(this.documents['Money']) + montant).toString();
        }
        console.log(`Argent ajouté. Nouveau solde : ${this.documents['Money']}`);
    }

    ajouterDocument(type: string, document: string): void {
        if (!this.documents[type]) {
            this.documents[type] = [];
        }

        if (this.documents[type].length < this.limiteStockage) {
            this.documents[type].push(document);
            console.log(`${document} ajouté au portefeuille.`);
        } else {
            console.log(`Limite de stockage atteinte pour les ${type}.`);
        }
    }

    retirerDocument(type: string, document: string): void {
        if (!this.documents[type] || this.documents[type].length === 0) {
            console.log(`Aucun document de type ${type} dans le portefeuille.`);
            return;
        }

        const index = this.documents[type].indexOf(document);
        if (index !== -1) {
            this.documents[type].splice(index, 1);
            console.log(`${document} retiré du portefeuille.`);
        } else {
            console.log(`${document} non trouvé dans le portefeuille.`);
        }
    }
}

function afficherMessage(message: string): void {
    console.log(message);
}

const portefeuille = new Portefeuille();

afficherMessage("Choisissez la couleur du portefeuille :");
portefeuille.couleur = prompt();

afficherMessage("Choisissez la taille du portefeuille :");
portefeuille.taille = prompt();

afficherMessage("Choisissez la limite de stockage :");
portefeuille.limiteStockage = parseInt(prompt());

if (portefeuille.estVide) {
    portefeuille.acheterPortefeuille();
}

while (true) {
    afficherMessage("Voulez-vous rentrer des documents ou de l'argent ? (documents/argent/quitter) ");
    const choix: string = prompt();

    if (choix === 'documents') {
        afficherMessage("Entrez le type de document : ");
        const typeDocument: string = prompt();
        afficherMessage("Entrez le nom du document : ");
        const nomDocument: string = prompt();
        portefeuille.ajouterDocument(typeDocument, nomDocument);
    } else if (choix === 'argent') {
        afficherMessage("Entrez le montant à ajouter : ");
        const montant: number = parseFloat(prompt());
        portefeuille.ajouterArgent(montant);
    } else if (choix === 'quitter') {
        afficherMessage("Au revoir !");
        break;
    } else {
        afficherMessage("Choix non reconnu. Veuillez réessayer.");
    }
}
