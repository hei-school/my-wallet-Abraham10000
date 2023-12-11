class Portefeuille:
  def __init__(self, couleur, taille, limite_stockage):
      self.couleur = couleur
      self.taille = taille
      self.limite_stockage = limite_stockage
      self.documents = {}
      self.est_vide = True
      self.est_perdu = False

  def acheter_portefeuille(self):
      print(f"Vous n'avez pas de portefeuille. Achetez-en un de couleur {self.couleur} et de taille {self.taille}.")
      self.est_vide = False

  def ajouter_argent(self, montant):
      if self.est_vide:
          print("Vous devez d'abord acheter un portefeuille.")
          return

      if 'Money' not in self.documents:
          self.documents['Money'] = montant
      else:
          self.documents['Money'] += montant

      print(f"Argent ajouté. Nouveau solde : {self.documents['Money']}")

  def ajouter_document(self, type_document, document):
      if type_document not in self.documents:
          self.documents[type_document] = []

      if len(self.documents[type_document]) < self.limite_stockage:
          self.documents[type_document].append(document)
          print(f"{document} ajouté au portefeuille.")
      else:
          print(f"Limite de stockage atteinte pour les {type_document}.")

  def retirer_document(self, type_document, document):
      if type_document not in self.documents or len(self.documents[type_document]) == 0:
          print(f"Aucun document de type {type_document} dans le portefeuille.")
          return

      if document in self.documents[type_document]:
          self.documents[type_document].remove(document)
          print(f"{document} retiré du portefeuille.")
      else:
          print(f"{document} non trouvé dans le portefeuille.")

def consulter_portefeuille(portefeuille):
  if portefeuille.est_vide:
      portefeuille.acheter_portefeuille()

  while True:
      choix = input("Voulez-vous rentrer des documents ou de l'argent ? (documents/argent/quitter) ")

      if choix == 'documents':
          type_document = input("Entrez le type de document : ")
          nom_document = input("Entrez le nom du document : ")
          portefeuille.ajouter_document(type_document, nom_document)
      elif choix == 'argent':
          montant = float(input("Entrez le montant à ajouter : "))
          portefeuille.ajouter_argent(montant)
      elif choix == 'quitter':
          print("Au revoir !")
          break
      else:
          print("Choix non reconnu. Veuillez réessayer.")

      if not portefeuille.est_vide:
          while True:
              nouvelle_operation = input("Voulez-vous effectuer une autre opération ? (oui/non) ")

              if nouvelle_operation == 'oui':
                  choix_operation = input("Que souhaitez-vous faire ? (documents/argent/quitter) ")

                  if choix_operation == 'documents':
                      type_document = input("Entrez le type de document : ")
                      nom_document = input("Entrez le nom du document : ")
                      portefeuille.ajouter_document(type_document, nom_document)
                  elif choix_operation == 'argent':
                      montant = float(input("Entrez le montant à ajouter : "))
                      portefeuille.ajouter_argent(montant)
                  elif choix_operation == 'quitter':
                      print("Au revoir !")
                      return
                  else:
                      print("Choix non reconnu. Veuillez réessayer.")
              elif nouvelle_operation == 'non':
                  print("Au revoir !")
                  return
              else:
                  print("Veuillez répondre par oui ou non.")

couleur = input("Choisissez la couleur du portefeuille : ")
taille = input("Choisissez la taille du portefeuille : ")
limite_stockage = int(input("Choisissez la limite de stockage : "))

mon_portefeuille = Portefeuille(couleur, taille, limite_stockage)
consulter_portefeuille(mon_portefeuille)
