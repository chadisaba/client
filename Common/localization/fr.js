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

        /*** patient form***/
        "study":"Examen",
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
        "Senolog?":"Senolog?"





        }
    return translation[text]||text;
}
