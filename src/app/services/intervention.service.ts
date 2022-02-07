import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators'
import {Intervention} from '../model/intervention'
import {SimpleDate} from "../model/simpleDate";

@Injectable({
  providedIn: 'root'
})

export class InterventionService {

  private map_interventions : Map<number,Intervention>= new Map<number,Intervention>();

  constructor(private http: HttpClient) {

  }

  getInterventions(id : number, annee : number) : Observable<Intervention[]> {
    let HttpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})}
    //let URL : string = 'http://localhost:8080/interventions/'+id+'/'+annee;
    let URL : string = 'http://localhost:8080/interventions/5/2016';
    console.log('url : ',URL)
    return this.http.get<any>(URL, HttpOptions).pipe(
      map(response => {
        console.log('response : ',response)
        let interventions : Array<Intervention> = [];
        for (let i = 0; i < response.length; i++) {
          let id = response[i].id;
          let date = this.stringToDate(response[i].date);
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
           console.log(intervention)
           interventions.push(intervention)
        }

        return interventions;
      })
    );
  }
  stringToDate(val : string) : Date{
    let tab : string[] = val.split('-')
    console.log(tab)
    let day : Date = new Date(Number(tab[0]),Number(tab[1]),Number(tab[2]));
    return day;
  }

  addCommentaire(id : number, commentaire_client : string) {
    let HttpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json'})}
    let URL : string = 'http://localhost:8080/interventions/fiche';
    var commentaire = {
      id: id,
      commentaire_client:commentaire_client
    }
    this.http.post(URL, commentaire, HttpOptions)
  }
  setInterventions(list : Array<Intervention>){
    for (let i = 0; i <list.length ; i++) {
      this.map_interventions.set(list[i].id, list[i])
    }
  }
  get_Intervention(id : number) : Intervention{
    // @ts-ignore
    return this.map_interventions.get(id)
  }
}
