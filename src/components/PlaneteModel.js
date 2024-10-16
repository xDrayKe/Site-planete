export class PlaneteModel {
    constructor(nom, taille, position, texture, titre, rayon, vitesse) {
        this.nom = nom;
        this.taille = taille;
        this.position = position;
        this.texture = texture;
        this.titre = titre;
        this.rayon = rayon; //par rapport au centre
        this.vitesse = vitesse;
    }
}
