solde = {
  'euro': 0,
  'dollar': 0,
  'ariary': 0
}

taux_de_change = {
  'euro': {'dollar': 1.12, 'ariary': 4582.95},
  'dollar': {'euro': 0.89, 'ariary': 4106.5},
  'ariary': {'euro': 0.00022, 'dollar': 0.00024}
}

def demander_choix(message):
  print(message)
  return input("> ")

def afficher_message(message):
  print(message)

def consulter_portefeuille():
  while True:
      choix = demander_choix("Voulez-vous consulter votre portefeuille ? (Tapez 1 pour Oui, 0 pour Non)")

      if choix == '1':
          afficher_message("Votre solde :")
          for devise, montant in solde.items():
              afficher_message(f"{devise}: {montant}")

          entree = demander_choix("Veuillez entrer le montant et l'unité (par exemple: 10 euro) ou 0 pour fermer votre portefeuille.")
          if entree == '0':
              afficher_message("Au revoir !")
              return
          else:
              montant_str, unite = entree.split(' ')
              montant = float(montant_str)

              if not unite or not montant or not montant_str.isdigit():
                  afficher_message("Veuillez entrer un montant valide avec l'unité (par exemple: 10 euro)")
              else:
                  solde[unite.lower()] += montant
                  afficher_message(f"Votre nouveau solde en {unite} est de : {solde[unite.lower()]}")

          gestion_portefeuille()
      elif choix == '0':
          afficher_message("Au revoir !")
          return
      else:
          afficher_message("Choix non reconnu. Veuillez réessayer.")

def afficher_options(options):
  for index, option in enumerate(options):
      afficher_message(f"{index}. {option}")

def convertir_montant(montant, devise_from, devise_to):
  if solde[devise_from] >= montant:
      solde[devise_from] -= montant
      solde[devise_to] += montant * taux_de_change[devise_from][devise_to]
      return True
  return False

def gestion_portefeuille():
  actions = [
      "Ajouter de l'argent",
      "Retirer de l'argent",
      "Consulter votre solde",
      "Convertir de l'argent",
      "Quitter"
  ]

  while True:
      afficher_message("Que souhaitez-vous faire ?")
      afficher_options(actions)

      choix = demander_choix("> ")

      if choix == '0':
          afficher_message("Votre solde :")
          for devise, montant in solde.items():
              afficher_message(f"{devise}: {montant}")
      elif choix == '1':
          ajout_entree = demander_choix("Entrez le montant et l'unité que vous souhaitez ajouter (par exemple: 10 euro) : ")
          ajout_montant_str, ajout_unite = ajout_entree.split(' ')
          ajout_montant = float(ajout_montant_str)

          if not ajout_unite or not ajout_montant or not ajout_montant_str.isdigit():
              afficher_message("Veuillez entrer un montant valide avec l'unité (par exemple: 10 euro)")
          else:
              solde[ajout_unite.lower()] += ajout_montant
              afficher_message(f"Votre nouveau solde en {ajout_unite} est de : {solde[ajout_unite.lower()]}")
      elif choix == '2':
          retrait_entree = demander_choix("Entrez le montant et l'unité que vous souhaitez retirer (par exemple: 10 euro) : ")
          retrait_montant_str, retrait_unite = retrait_entree.split(' ')
          retrait_montant = float(retrait_montant_str)

          if not retrait_unite or not retrait_montant or not retrait_montant_str.isdigit():
              afficher_message("Veuillez entrer un montant valide avec l'unité (par exemple: 10 euro)")
          elif solde[retrait_unite.lower()] < retrait_montant:
              afficher_message("Solde insuffisant.")
          else:
              solde[retrait_unite.lower()] -= retrait_montant
              afficher_message(f"Votre nouveau solde en {retrait_unite} est de : {solde[retrait_unite.lower()]}")
      elif choix == '3':
          conversion_entree = demander_choix("Choisissez la devise à convertir (par exemple: 10 euro dollar) : ")
          conversion_montant_str, conversion_from, conversion_to = conversion_entree.split(' ')
          conversion_montant = float(conversion_montant_str)

          if not conversion_from or not conversion_to or not conversion_montant or not conversion_montant_str.isdigit():
              afficher_message("Veuillez entrer un montant valide avec les unités à convertir (par exemple: 10 euro dollar)")
          elif solde[conversion_from.lower()] < conversion_montant:
              afficher_message("Solde insuffisant.")
          elif taux_de_change[conversion_from.lower()][conversion_to.lower()]:
              converted = convertir_montant(conversion_montant, conversion_from.lower(), conversion_to.lower())
              if converted:
                  afficher_message(f"Conversion réussie ! Votre solde en {conversion_to} est maintenant de : {solde[conversion_to.lower()]}")
              else:
                  afficher_message("Impossible de convertir.")
          else:
              afficher_message("Conversion non prise en charge.")
      elif choix == '4':
          afficher_message("Au revoir !")
          return
      else:
          afficher_message("Choix non reconnu. Veuillez réessayer.")

def main():
  consulter_portefeuille()

if __name__ == "__main__":
  main()
