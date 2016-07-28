function translate(text)
{
    var translation={

        /***common**/
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
        "visit":"Visite",
        "patient":"Patient",
        "free":"Gratuit",
        "vitale":"Vitale",
        "consultantPh":"consultantPh",
        "drRecipient":"drRecipient",
        "dictation":"dictée",
        "report":"C.R",
        "quotation":"Cotation",
        "fT":"FT",
        "comment":"Commentaire",
        "duP":"Du. P",
        "duV":"Du. Consult",
        "visitInvoiceType":"VisitInvoiceType",
        "Hopitalized":"Hospit.",
        "urgent":"Urgence",
        "visitnumber":"N. Consults",
        "visitFtFor":"VisitFtFor",
        "visitPEC":"Prise en Charge",
        "actions":"Actions",
        "print":"Imprimer"


        }
    return translation[text]||text;
}
