class Utilisateur {
    constructor(
        nom = null,
        adresse = null,
        codePostal = null,
        identity = null,
        password = null,
        telephone = 0,
        role = null
    ) {
        this.nom = nom;
        this.adresse = adresse;
        this.codePostal = codePostal;
        this.identity = identity;
        this.password = password;
        this.telephone = telephone;
        this.role = role;
    }
}

export default Utilisateur;

