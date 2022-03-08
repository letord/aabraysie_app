import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators'
import {Intervention} from '../model/intervention'
import {DateService} from "./date.service";

@Injectable({
  providedIn: 'root'
})

export class InterventionService {

  private map_interventions : Map<number,Intervention>= new Map<number,Intervention>();
  private list_interventions : Array<Intervention>  = new Array<Intervention>();

  constructor(private http: HttpClient, private dateService : DateService) {
  }

  getInterventions(id : number, annee : number) : Observable<Intervention[]> {
    let HttpOptions = { headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : ''+localStorage.getItem('token')
    })}
    //let URL : string = 'https://dillxpbackend.herokuapp.com/interventions/'+'/'+annee;
    let URL : string = 'http://localhost:8080/interventions/'+id+'/'+annee;

    return this.http.get<any>(URL, HttpOptions).pipe(
      map(response => {
        let interventions : Array<Intervention> = [];
        for (let i = 0; i < response.length; i++) {
          let id = response[i].id;
          let date = this.dateService.stringToDateJSON(response[i].date);
          let heure_debut = response[i].heure_debut;
          let heure_fin = response[i].heure_fin;
          let libelle = response[i].libelle;
          let nom_prenom = response[i].nom_prenom;
          let adresse_intervention = response[i].adresse_intervention;
          let telephone = response[i].telephone;
          let consigne = response[i].consigne;
          let commentaire_client = ''//response.array[i].commentaire_client;
          let iscommented = false;
          let intervention : Intervention = {
            id:id,
            date :date,
            heure_debut:heure_debut,
            heure_fin:heure_fin,
            libelle:libelle,
            nom_prenom:nom_prenom,
            adresse_intervention:adresse_intervention,
            telephone:telephone,
            consigne : consigne,
            commentaire_client : commentaire_client,
            iscommented : iscommented
          }
          interventions.push(intervention);
          this.list_interventions.push(intervention);
          this.map_interventions.set(intervention.id,intervention);
        }
        return interventions;
      })
    );
  }

  get_Interventions() : Array<Intervention>{
    return this.list_interventions;
  }

  get_Intervention(id : number) : Intervention{
    // @ts-ignore
    return this.map_interventions.get(id)
  }

  get_interventions_today (date : Date): Array<Intervention>{
    let interventions : Array<Intervention> = new Array<Intervention>();
    for (let i = 0; i < this.list_interventions.length; i++) {
      let intervention : Intervention = this.list_interventions[i];
      if(this.dateService.equalDate(date, intervention.date)){
        interventions.push(intervention)
      }
    }
    return interventions;
  }
  getPositionIntervention(id : number) : number{
    for (let i = 0; i< this.list_interventions.length; i++) {
      if(this.list_interventions[i].id == id){
        return i;
      }
    }
    return 0;
  }

  addCommentaire(id : number, commentaire_client : string) : Observable<any>{
    let HttpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})}
    //let URL : string = 'https://dillxpbackend.herokuapp.com/interventions/fiche';
    let URL : string = 'https://localhost:8080/interventions/fiche';
    var commentaire = {
      id: id,
      commentaire_client:commentaire_client
    }
    return this.http.post(URL, commentaire, HttpOptions);
  }
  setCommentaire(id : number, com : string){
    let i = this.getPositionIntervention(id);
    this.list_interventions[i].commentaire_client = com;
    this.list_interventions[i].iscommented=true;
  }

}
