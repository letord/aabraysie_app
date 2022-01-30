export interface Intervention {
  id?: number;
  date : Date
  heure_debut : number;
  heure_fin : number;
  libelle : string;
  nom_prenom : string;
  adresse_intervention : string;
  telephone: string;
  telephone_portable:string;
  consigne: string;
  commentaire_client?:string;
  iscommented:boolean;
}

