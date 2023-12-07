import readline from 'readline-sync';


interface Solde {
    [key: string]: number;
  }

  interface TauxDeChange {
    [key: string]: {
      [key: string]: number;
    };
  }

  const solde: Solde = {
    euro: 0,
    dollar: 0,
    ariary: 0,
  };

  const tauxDeChange: TauxDeChange = {
    euro: { dollar: 1.12, ariary: 4582.95 },
    dollar: { euro: 0.89, ariary: 4106.5 },
    ariary: { euro: 0.00022, dollar: 0.00024 },
  };

  function demanderChoix(message: string): string {
    console.log(message);
    return readline.question('> ');
  }

  function consulterPortefeuille() {
    while (true) {
      const choix = demanderChoix(
        'Que souhaitez-vous faire ?\n1. Consulter votre portefeuille\n0. Quitter'
      );

      if (choix === '1') {
        afficherSolde();
        gererPortefeuille();
      } else if (choix === '0') {
        console.log('Au revoir !');
        break;
      } else {
        console.log('Choix non reconnu. Veuillez réessayer.');
      }
    }
  }

  function afficherSolde() {
    console.log('Votre solde :');
    Object.entries(solde).forEach(([devise, montant]) => {
      console.log(`${devise}: ${montant}`);
    });
  }

  function gererPortefeuille() {
    while (true) {
      afficherSolde();

      const entree = demanderChoix(
        "Veuillez entrer le montant et l'unité (par exemple : 10 euro) ou 0 pour quitter."
      );

      if (entree === '0') {
        console.log('Au revoir !');
        break;
      } else {
        const [montantStr, unite] = entree.split(' ');
        const montant = parseFloat(montantStr);

        if (isNaN(montant) || !unite || !solde[unite]) {
          console.log('Veuillez entrer un montant valide avec l\'unité (par exemple : 10 euro)');
          continue;
        }

        solde[unite] += montant;
        console.log(`Votre nouveau solde en ${unite} est de : ${solde[unite]}`);
      }
    }
  }

  consulterPortefeuille();
