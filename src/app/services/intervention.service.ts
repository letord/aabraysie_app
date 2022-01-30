import { Injectable } from '@angular/core';
import { Intervention} from "../model/intervention";

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  interventions : Array<Intervention> = new Array<Intervention>();

  constructor() {
    this.addIntervention({
      id:0,
      date : new Date(),
      heure_debut : 8,
      heure_fin : 11,
      libelle : 'Tonte' ,
      iscommented : false,
      nom_prenom: "Daudet Jean Marc",
      adresse_intervention : "92 Rue de la Bediniere 45800 ST JEAN DE BRAYE",
      telephone: '0609675469',
      telephone_portable: '',
      consigne : 'prendre une tondeuse'
    });
    this.addIntervention({
      id:1,
      date : new Date(),
      heure_debut : 8,
      heure_fin : 11,
      libelle : 'Tonte 2' ,
      iscommented : false,
      nom_prenom: "Daudet Jean Marc",
      adresse_intervention : "92 Rue de la Bediniere 45800 ST JEAN DE BRAYE",
      telephone: '0609675469',
      telephone_portable: '',
      consigne : 'prendre une tondeuse'
    });
  }


  getAll(): Array<Intervention> {
    return this.interventions;
  }
  addIntervention(i: Intervention){
    this.interventions.push(i);
  }
  get_list_intervention(jour : number, month : number, year : number) : Array<Intervention> {
    let list: Array<Intervention> = new Array<Intervention>();
    console.log("jour : "+jour+" month : "+month+" year : "+year)
    for (let i = 0; i < this.interventions.length; i++) {
      if(this.interventions[i].date.getDate()===jour && this.interventions[i].date.getMonth()===month && this.interventions[i].date.getFullYear()===year){
        list.push(this.interventions[i])
      }
    }
    return list;
  }
  // @ts-ignore
  get(id:number) : Intervention{
    for (let i = 0; i < this.interventions.length; i++) {
      if(this.interventions[i].id===id){
        return this.interventions[i];
      }
    }
    Error()
  }
}
