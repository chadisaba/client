function translate(text)
{
    var translation={
        "study":"Examen",
        "allStudy":"Tous les examens",
        "Doctor":"Médecin",
        "patientIdentity":"Identité patient",
        "gender":"Sexe",
        "civility":"Civilité",
        "date":"Date",
        "hour":"Heure",
        "firstName":"Préhnom",
        "lastName":"Last name",
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
        "free":"Gratuit",
        "hospitalized":"Hospitalisé",
        "emergency":"Urgence",
        "studies":"Les examens",
        "addStudy":"Ajouter un examen",
        "price":"Prix",
        "device":"Appareil",
        "contactInformation":"Coordonnées",
        "enterAtLeast4Characters":"Enter a least 4 characters",
        "active":"Active"


    }
    return translation[text]||text;
}
