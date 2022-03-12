//model

export class Etudiant {

    id?:number;
    nom?:string;
    cin?:string;
    adresse?:string;
    telephone?:string;
    email?:string;
    //on met le constructeur
    constructor(data? : Etudiant){
        if(data){
            this.id = data.id ? data.id : null;
            this.nom = data.nom ? data.nom : null;
            this.cin = data.cin ? data.cin : null;
            this.adresse = data.adresse ? data.adresse : null;
            this.telephone = data.telephone ? data.telephone : null;
            this.email = data.email ? data.email : null;
        }
    }

}
