<?php

$solde = [
    'euro' => 0,
    'dollar' => 0,
    'ariary' => 0
];

$tauxDeChange = [
    'euro' => ['dollar' => 1.12, 'ariary' => 4582.95],
    'dollar' => ['euro' => 0.89, 'ariary' => 4106.5],
    'ariary' => ['euro' => 0.00022, 'dollar' => 0.00024]
];

function demanderChoix($message) {
    echo $message . PHP_EOL;
    return readline("> ");
}

function afficherMessage($message) {
    echo $message . PHP_EOL;
}

function consulterPortefeuille() {
    global $solde;

    while (true) {
        $choix = demanderChoix("Voulez-vous consulter votre portefeuille ? (Tapez 1 pour Oui, 0 pour Non)");

        if ($choix === '1') {
            afficherMessage("Votre solde :");
            foreach ($solde as $devise => $montant) {
                afficherMessage("$devise: $montant");
            }

            $entree = demanderChoix("Veuillez entrer le montant et l'unité (par exemple: 10 euro) ou 0 pour fermer votre portefeuille.");
            if ($entree === '0') {
                afficherMessage("Au revoir !");
                return;
            } else {
                [$montantStr, $unite] = explode(' ', $entree);
                $montant = floatval($montantStr);

                if (!$unite || !$montant || !is_numeric($montantStr)) {
                    afficherMessage("Veuillez entrer un montant valide avec l'unité (par exemple: 10 euro)");
                } else {
                    $solde[strtolower($unite)] += $montant;
                    afficherMessage("Votre nouveau solde en $unite est de : " . $solde[strtolower($unite)]);
                }
            }

            gestionPortefeuille();
        } elseif ($choix === '0') {
            afficherMessage("Au revoir !");
            return;
        } else {
            afficherMessage("Choix non reconnu. Veuillez réessayer.");
        }
    }
}

function afficherOptions($options) {
    foreach ($options as $index => $option) {
        afficherMessage("$index. $option");
    }
}

function convertirMontant($montant, $deviseFrom, $deviseTo) {
    global $solde, $tauxDeChange;

    if ($solde[$deviseFrom] >= $montant) {
        $solde[$deviseFrom] -= $montant;
        $solde[$deviseTo] += $montant * $tauxDeChange[$deviseFrom][$deviseTo];
        return true;
    }
    return false;
}

function gestionPortefeuille() {
    global $solde, $tauxDeChange;

    $actions = [
        "Ajouter de l'argent",
        "Retirer de l'argent",
        "Consulter votre solde",
        "Convertir de l'argent",
        "Quitter"
    ];

    while (true) {
        afficherMessage("Que souhaitez-vous faire ?");
        afficherOptions($actions);

        $choix = demanderChoix("> ");

        if ($choix === '0') {
            afficherMessage("Votre solde :");
            foreach ($solde as $devise => $montant) {
                afficherMessage("$devise: $montant");
            }
        } elseif ($choix === '1') {
            $ajoutEntree = demanderChoix("Entrez le montant et l'unité que vous souhaitez ajouter (par exemple: 10 euro) : ");
            [$ajoutMontantStr, $ajoutUnite] = explode(' ', $ajoutEntree);
            $ajoutMontant = floatval($ajoutMontantStr);

            if (!$ajoutUnite || !$ajoutMontant || !is_numeric($ajoutMontantStr)) {
                afficherMessage("Veuillez entrer un montant valide avec l'unité (par exemple: 10 euro)");
            } else {
                $solde[strtolower($ajoutUnite)] += $ajoutMontant;
                afficherMessage("Votre nouveau solde en $ajoutUnite est de : " . $solde[strtolower($ajoutUnite)]);
            }
        } elseif ($choix === '2') {
            $retraitEntree = demanderChoix("Entrez le montant et l'unité que vous souhaitez retirer (par exemple: 10 euro) : ");
            [$retraitMontantStr, $retraitUnite] = explode(' ', $retraitEntree);
            $retraitMontant = floatval($retraitMontantStr);

            if (!$retraitUnite || !$retraitMontant || !is_numeric($retraitMontantStr)) {
                afficherMessage("Veuillez entrer un montant valide avec l'unité (par exemple: 10 euro)");
            } elseif ($solde[strtolower($retraitUnite)] < $retraitMontant) {
                afficherMessage("Solde insuffisant.");
            } else {
                $solde[strtolower($retraitUnite)] -= $retraitMontant;
                afficherMessage("Votre nouveau solde en $retraitUnite est de : " . $solde[strtolower($retraitUnite)]);
            }
        } elseif ($choix === '3') {
            $conversionEntree = demanderChoix("Choisissez la devise à convertir (par exemple: 10 euro dollar) : ");
            [$conversionMontantStr, $conversionFrom, $conversionTo] = explode(' ', $conversionEntree);
            $conversionMontant = floatval($conversionMontantStr);

            if (!$conversionFrom || !$conversionTo || !$conversionMontant || !is_numeric($conversionMontantStr)) {
                afficherMessage("Veuillez entrer un montant valide avec les unités à convertir (par exemple: 10 euro dollar)");
            } elseif ($solde[strtolower($conversionFrom)] < $conversionMontant) {
                afficherMessage("Solde insuffisant.");
            } elseif ($tauxDeChange[strtolower($conversionFrom)][strtolower($conversionTo)]) {
                $converted = convertirMontant($conversionMontant, strtolower($conversionFrom), strtolower($conversionTo));
                if ($converted) {
                    afficherMessage("Conversion réussie ! Votre solde en $conversionTo est maintenant de : " . $solde[strtolower($conversionTo)]);
                } else {
                    afficherMessage("Impossible de convertir.");
                }
            } else {
                afficherMessage("Conversion non prise en charge.");
            }
        } elseif ($choix === '4') {
            afficherMessage("Au revoir !");
            return;
        } else {
            afficherMessage("Choix non reconnu. Veuillez réessayer.");
        }
    }
}

function main() {
    consulterPortefeuille();
}

main();
?>
