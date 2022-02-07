import {Component, Input, OnInit} from '@angular/core';
import {Intervention} from "../model/intervention";
import {InterventionService} from "../services/intervention.service";
import {AuthService} from "../services/auth.service";
import {DateService} from "../services/date.service";
import { Router } from '@angular/router';
import { User } from '../model/user';
import { SimpleDate } from '../model/simpleDate';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-intervention-list',
  templateUrl: './intervention-list.component.html',
  styleUrls: ['./intervention-list.component.css']
})
export class InterventionListComponent implements OnInit {

  date_selected : Date;
  user :User={idEquipe:0,nom :'',prenom : ''}
  string_date : string;
  full_string_date : string;
  complete_list_interventions : Array<Intervention> = new Array<Intervention>();
  list_interventions : Array<Intervention> = new Array<Intervention>();

  constructor(
    private interventionService : InterventionService,
    private  authService : AuthService,
    private dateService : DateService,
    private router : Router) {

    this.date_selected = new Date();
    this.string_date=this.dateService.getDatetoString();
    this.full_string_date = this.dateService.getFullDatetoString();
  }

  ngOnInit(): void {
   this.user = this.authService.getUser();
   this.get_list_intervention(this.user.idEquipe, this.date_selected.getFullYear());
   this.interventionService.setInterventions(this.complete_list_interventions)
  }

  async get_list_intervention(id:number,annee : number) {
    let list_interventions : Array<Intervention> = []
    await this.interventionService.getInterventions(id, annee).subscribe(
      response => {
        console.log(response)
        this.complete_list_interventions=response
      }
    );
  }
  get_interventions_today (date : Date): Array<Intervention>{
    let interventions :Array<Intervention> = new Array<Intervention>();
    for (let i = 0; i < this.complete_list_interventions.length; i++) {
      let intervention : Intervention = this.complete_list_interventions[i];

      if(date.getDay()==intervention.date.getDay() && date.getMonth() == intervention.date.getMonth() && date.getFullYear() == intervention.date.getFullYear()){
        interventions.push(intervention)
      }
    }
    return interventions;
  }

  PreviousDay() : void{
    this.date_selected= this.dateService.previousDay()
    this.string_date=this.dateService.getDatetoString();
    this.full_string_date = this.dateService.getFullDatetoString();
    this.list_interventions=this.get_interventions_today(this.date_selected);
  }
  NextDay() : void{
    this.date_selected.setDate(this.date_selected.getDate()+1);
    this.string_date=this.dateService.getDatetoString();
    this.full_string_date = this.dateService.getFullDatetoString();
    this.list_interventions=this.get_interventions_today(this.date_selected);
  }
  Disconnect():void {
    this.authService.disconnect();
    this.router.navigate([''])
  }
}

