export interface Intervention {
  id : number;
  date : Date;
  heure_debut : string; //type Time
  heure_fin : string; //type Time
  libelle : string;
  nom_prenom : string;
  adresse_intervention : string;
  telephone: string;
  consigne: string;
  commentaire_client?:string;
  iscommented:boolean;
}

/*
{
  "id": 35,
  "date": "2016-02-23",
  "heure_debut": "09:02:00",
  "heure_fin": "10:15:00",
  "libelle": "nettoyage",
  "nom_prenom": "John Doe [ login: joe2]",
  "adresse_intervention": "",
  "telephone": "0412488432",
  "consigne": "Signature client no need"
}
*/

