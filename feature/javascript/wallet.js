const prompt = require('prompt-sync')();

let solde = {
  euro: 0,
  dollar: 0,
  ariary: 0
};

const tauxDeChange = {
  euro: {
    dollar: 1.12,
    ariary: 4582.95
  },
  dollar: {
    euro: 0.89,
    ariary: 4106.5
  },
  ariary: {
    euro: 0.00022,
    dollar: 0.00024
  }
};

function demanderChoix(message) {
  console.log(message);
  return prompt("> ");
}

function afficherMessage(message) {
  console.log(message);
}

function consulterPortefeuille() {
  while (true) {
    const choix = demanderChoix("Voulez-vous consulter votre portefeuille ? (Tapez 1 pour Oui, 0 pour Non)");

    if (choix === '1') {
      afficherMessage(`Votre solde :`);
      Object.keys(solde).forEach((devise) => {
        afficherMessage(`${devise}: ${solde[devise]}`);
      });

      afficherMessage("Veuillez entrer le montant et l'unité (par exemple: 10 euro) ou 0 pour fermer votre portefeuille.");
      const entree = demanderChoix("> ");

      if (entree === '0') {
        afficherMessage("Au revoir !");
        return;
      } else {
        const [montantStr, unite] = entree.split(' ');
        const montant = parseFloat(montantStr);

        if (!unite || !montant || isNaN(montant)) {
          afficherMessage("Veuillez entrer un montant valide avec l'unité (par exemple: 10 euro)");
        } else {
          solde[unite.toLowerCase()] += montant;
          afficherMessage(`Votre nouveau solde en ${unite} est de : ${solde[unite.toLowerCase()]}`);
        }
      }

      gestionPortefeuille();
    } else if (choix === '0') {
      afficherMessage("Au revoir !");
      return;
    } else {
      afficherMessage("Choix non reconnu. Veuillez réessayer.");
    }
  }
}

function afficherOptions(options) {
  options.forEach((option, index) => {
    afficherMessage(`${index}. ${option}`);
  });
}

function convertirMontant(montant, from, to) {
  if (solde[from] >= montant) {
    solde[from] -= montant;
    solde[to] += montant * tauxDeChange[from][to];
    return true;
  }
  return false;
}

function gestionPortefeuille() {
  const actions = [
    "Ajouter de l'argent",
    "Retirer de l'argent",
    "Consulter votre solde",
    "Convertir de l'argent",
    "Quitter"
  ];

  while (true) {
    afficherMessage("Que souhaitez-vous faire ?");
    afficherOptions(actions);

    const choix = demanderChoix("> ");

    switch (choix) {
      case '0':
        afficherMessage(`Votre solde :`);
        Object.keys(solde).forEach((devise) => {
          afficherMessage(`${devise}: ${solde[devise]}`);
        });
        break;
      case '1':
        afficherMessage("Entrez le montant et l'unité que vous souhaitez ajouter (par exemple: 10 euro) : ");
        const ajoutEntree = demanderChoix("> ");
        const [ajoutMontantStr, ajoutUnite] = ajoutEntree.split(' ');
        const ajoutMontant = parseFloat(ajoutMontantStr);

        if (!ajoutUnite || !ajoutMontant || isNaN(ajoutMontant)) {
          afficherMessage("Veuillez entrer un montant valide avec l'unité (par exemple: 10 euro)");
        } else {
          solde[ajoutUnite.toLowerCase()] += ajoutMontant;
          afficherMessage(`Votre nouveau solde en ${ajoutUnite} est de : ${solde[ajoutUnite.toLowerCase()]}`);
        }
        break;
      case '2':
        afficherMessage("Entrez le montant et l'unité que vous souhaitez retirer (par exemple: 10 euro) : ");
        const retraitEntree = demanderChoix("> ");
        const [retraitMontantStr, retraitUnite] = retraitEntree.split(' ');
        const retraitMontant = parseFloat(retraitMontantStr);

        if (!retraitUnite || !retraitMontant || isNaN(retraitMontant)) {
          afficherMessage("Veuillez entrer un montant valide avec l'unité (par exemple: 10 euro)");
        } else if (solde[retraitUnite.toLowerCase()] < retraitMontant) {
          afficherMessage("Solde insuffisant.");
        } else {
          solde[retraitUnite.toLowerCase()] -= retraitMontant;
          afficherMessage(`Votre nouveau solde en ${retraitUnite} est de : ${solde[retraitUnite.toLowerCase()]}`);
        }
        break;
      case '3':
        afficherMessage("Choisissez la devise à convertir (par exemple: 10 euro dollar) : ");
        const conversionEntree = demanderChoix("> ");
        const [conversionMontantStr, conversionFrom, conversionTo] = conversionEntree.split(' ');
        const conversionMontant = parseFloat(conversionMontantStr);

        if (!conversionFrom || !conversionTo || !conversionMontant || isNaN(conversionMontant)) {
          afficherMessage("Veuillez entrer un montant valide avec les unités à convertir (par exemple: 10 euro dollar)");
        } else if (solde[conversionFrom.toLowerCase()] < conversionMontant) {
          afficherMessage("Solde insuffisant.");
        } else if (tauxDeChange[conversionFrom.toLowerCase()][conversionTo.toLowerCase()]) {
          const converted = convertirMontant(conversionMontant, conversionFrom.toLowerCase(), conversionTo.toLowerCase());
          if (converted) {
            afficherMessage(`Conversion réussie ! Votre solde en ${conversionTo} est maintenant de : ${solde[conversionTo.toLowerCase()]}`);
          } else {
            afficherMessage("Impossible de convertir.");
          }
        } else {
          afficherMessage("Conversion non prise en charge.");
        }
        break;
      case '4':
        afficherMessage("Au revoir !");
        return;
      default:
        afficherMessage("Choix non reconnu. Veuillez réessayer.");
    }
  }
}

function main() {
  consulterPortefeuille();
}

main();
