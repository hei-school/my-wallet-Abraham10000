<?php
class Portefeuille {
    public $couleur;
    public $taille;
    public $limiteStockage;
    public $documents = [];
    public $estVide = true;
    public $estPerdu = false;

    public function acheterPortefeuille() {
        echo "Vous n'avez pas de portefeuille. Achetez-en un de couleur $this->couleur et de taille $this->taille.\n";
        $this->estVide = false;
    }

    public function ajouterArgent($montant) {
        if ($this->estVide) {
            echo "Vous devez d'abord acheter un portefeuille.\n";
            return;
        }

        if (!isset($this->documents['Money'])) {
            $this->documents['Money'] = $montant;
        } else {
            $this->documents['Money'] += $montant;
        }
        echo "Argent ajouté. Nouveau solde : {$this->documents['Money']}\n";
    }

    public function ajouterDocument($type, $document) {
        if (!isset($this->documents[$type])) {
            $this->documents[$type] = [];
        }

        if (count($this->documents[$type]) < $this->limiteStockage) {
            $this->documents[$type][] = $document;
            echo "$document ajouté au portefeuille.\n";
        } else {
            echo "Limite de stockage atteinte pour les $type.\n";
        }
    }

    public function retirerDocument($type, $document) {
        if (!isset($this->documents[$type]) || count($this->documents[$type]) === 0) {
            echo "Aucun document de type $type dans le portefeuille.\n";
            return;
        }

        $index = array_search($document, $this->documents[$type]);
        if ($index !== false) {
            unset($this->documents[$type][$index]);
            echo "$document retiré du portefeuille.\n";
        } else {
            echo "$document non trouvé dans le portefeuille.\n";
        }
    }
}

function afficherMessage($message) {
    echo $message . "\n";
}

$portefeuille = new Portefeuille();

afficherMessage("Choisissez la couleur du portefeuille :");
$portefeuille->couleur = readline();

afficherMessage("Choisissez la taille du portefeuille :");
$portefeuille->taille = readline();

afficherMessage("Choisissez la limite de stockage :");
$portefeuille->limiteStockage = intval(readline());

if ($portefeuille->estVide) {
    $portefeuille->acheterPortefeuille();
}

while (true) {
    afficherMessage("Voulez-vous rentrer des documents ou de l'argent ? (documents/argent/quitter) ");
    $choix = readline();

    if ($choix === 'documents') {
        afficherMessage("Entrez le type de document : ");
        $typeDocument = readline();
        afficherMessage("Entrez le nom du document : ");
        $nomDocument = readline();
        $portefeuille->ajouterDocument($typeDocument, $nomDocument);
    } elseif ($choix === 'argent') {
        afficherMessage("Entrez le montant à ajouter : ");
        $montant = floatval(readline());
        $portefeuille->ajouterArgent($montant);
    } elseif ($choix === 'quitter') {
        afficherMessage("Au revoir !");
        break;
    } else {
        afficherMessage("Choix non reconnu. Veuillez réessayer.");
    }
}

?>
