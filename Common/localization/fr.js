function translate(text)
{
    var translation={

        /***common**/
        "Filter":"Filtre",
        "active":"Actif",
        "save":"Enregistrer",
        "cancel":"Annuler",
        "quit":"Quitter",
        "edit":"Editer",
        "modify":"Modifier",
        "delete":"Supprimer",
        "add":"Ajouter",
        "name":"Nom",
        "saveError":"le formulaire n'a pas été enregistré correctement",
        "enterAtLeast4Characters":"Saisir au moins 4 caractères",
        "site":"Site",
        "type":"Type",
        "pdf":"PDF",
        "doctor":"Médecin",
        "time":"Heure",
        "comment":"Commentaire",
        "clickToSavePreference":"Cliquer pour sauvegarder vos préférences",
        "first name":"Prénom",
        "last name":"Nom",
        "gender":"Sexe",
        "title":"Civilité",
        "city":"Ville",
        "zip code":"C.P",
        "phone":"Tél.",
        "fax":"Fax",
        "email":"E-mail",
        "yes":"Oui",
        "no":"Non",
        "add form":"Formulaire d'ajout",
        "edit form":"Formulaire de modification",

        "the referring physicians":"Les Prescripteurs",

        "clickToAddNewRow":"Ajouter une nouvelle ligne",
        "clickToDuplicateRow":"Dupliquer les lignes sélectionnées",
        "clickToDeleteTheSelection":"Supprimer les lignes sélectionnées",
        "clickToModifySelection":"Modifier la ligne sélectionnée",
        "modificationsHistory":"Voir l'historique des modifications",
        "clickToSaveModifications":"Enregistrer les modifications",
        "clickToCancelModifications":"Annuler les modifications",
        "gridEdit.quitEditionTitle":"Quitter l'édition",
        "gridEdit.quitEditionMsg":"Voulez vous quittez le mode d'édition?",
        "displayModifiedRows":"Afficher seulement les modifications",
        "applyChTitle":"Confirmation",
        "ApplyModification":"Appliquer les modifications?",
        "submitMsg":"Enregistrer",
        "msg.comment":"Commentaire",
        "liveSearch":"Recherche rapide",

        /**** menu**/
        "home":"Accueil",
        "menu.settings":"Paramétrage",

        "menu.users":"Utilisateurs",
        "menu.devices":"Appareils",
        "menu.studies":"Examens",
        "menu.favorite":"Favoris",
        "menu.sites":"Sites",
        "menu.referring physicians":"Prescripteurs",


        /**** Errors********/
        'error':"Erreur",
        'siteConfigIsNotFound':"La configuration du site n'a pas été trouvée",
        'restorePreferenceError':"Vos préférences n'ont pas été récupérées",
        'InvalidLoginOrPassword':"Nom d'utilisateur ou mot de passe invalide",


        /**** waiting messages********/

        'VerificationEnCours':"Vérification en cours, veuillez patienter....",
        'Saving':"Enregistrement en cours...",
        'loadingIndexedDB':"Chargement des données en cache,veuillez patienter....",


        /*******Confirm messages*****/

            'infoMsg':"Information",
            'preferenceSavedSuccessfully':"Vos préférences ont été  enregistrées",
            'ApplyModification?':"Voulez vous enregistrer les modifications?",
            'cancelTitle':"Annulation",
            'cancelMsg':"Souhaitez vous annuler les modifications?",

        /*** patient form***/

        "study":"Examen",
        "invalidSocialNumber":"Numéro de sécurité sociale invalide",
        "invalidKey":"Clé invalide",
        "allStudy":"Tous les examens",
        "Doctor":"Médecin",
        "patientIdentity":"Identité patient",
        "gender":"Sexe",
        "civility":"Civilité",
        "recieving": "Accueil de ",

        "firstName":"Prénom",
        "lastName":"Nom",
        "birthday":"Date de naissance",
        "birthname":"Nom de naissance",
        "referringDoctor":"Méd.Traitant",
        "InsNumber":"N°Sécu I.N.S",
        "secuNumber":"N°Sécu",
        "pregnant":"Enceinte",
        "address":"Adresse",
        "zipCode":"Code postal",
        "city ":"Commune",
        "phone":"Tél",
        "mobile":"Portable",
        "email":"E-mail",
         "contactInformation":"Coordonnées",


        /*** visit form***/
        "visitInformation":"Informations consultation",
        "date":"Date",
        "hour":"Heure",
        "addStudy":"Ajouter un examen",
        "free":"Gratuit",
        "hospitalized":"Hospitalisé",
        "emergency":"Urgence",
        "studies":"Les examens",
        "price":"Prix",
        "device":"Appareil",
        "hospitVisitNumber":"N° séjour",

        /*** patient history***/
        "history":"Historique",
        "path":"Appareil",

        /*** Work list***/


        "By Social Card":"C.V",
        "C. Info":"C.info",
        "P.Info":"P.Info",

        "birthday":"Naissance",
        "studies":"Examens",
        "worklistDoctor":"Méd.",
        "consultant Ph.":"Traitant",

        "worklistMedPresc":"Presc.",
        "worklistMedRecipient":"Correspondants",
        "dictation":"Dictée",
        "worklist Report":"C.R.",
        "worklist quotation":"Cot.",
        "P. due":"Dû P.",
        "visit":"Consultation",
        "patient":"Patient",
        "free":"Gratuit",
        "hospit.":"Hospit.",
        "urgent":"Urgence",
        "Visit Numbers":"N.consults",
        "Invoice type":"Type facture",

        "duV":"Du. Consult",

        "actions":"Actions",
        "print":"Imprimer",

        /**** device component****/

        "All Studies":"Tous les examens",
        "Studies associated to selected device":"Les examens associés à l'appreil selectionné",
        "Select Study":"Choisir un examen",
        "Device":"Appareil",
        "Device Type":"Type appareil",
        "Device & Studies":"Appareil & examens",
        "modality":"Modalité",
        "A.E.T":"A.E.T",
        "agreement number":"N°Agrément",
        "agreement date":"Date Agr.",
        "marque":"Marque",
        "installation":"Installation",
        "power":"Puissance",
        "Support":"Support",
        "Lecture?":"Lecture?",
        "Senolog?":"Senolog?",

        /******* Referring physicina*****/
        "identifying referring physician":"Identification  prescripteur",
        "referring physician form":"Formulaire des préscripteurs"







        };
    return translation[text]||text;
}
