function translate(text)
{
    var translation={

        /***commun**/
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
        "path":"Appareil"


    }
    return translation[text]||text;
}
