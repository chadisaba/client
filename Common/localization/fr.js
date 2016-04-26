function translate(text)
{
    var translation={
        "Study":"Examen",
        "AllStudy":"Tous les examens",
        "Doctor":"Médecin"
    }
    return translation[text]||text;
}
