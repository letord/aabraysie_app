export interface User {
  idEquipe: number;
  nom: string;
  prenom: string;
  //connected?:boolean;
}

/*
objet reçu via la requete GET/
{
  "id": 7,
  "loginUtilisateur": {
    "login": "toto"
  },
  "contactUtilisateur": {
    "nom": "Doe",
    "prenom": "John",
    "telephone": "0543231232",
    "email": "john.doe@gmail.com"
  },
  "idEquipe": 51
}
*/
