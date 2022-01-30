import {Component, Input, OnInit} from '@angular/core';
import {Intervention} from "../model/intervention";
import {InterventionService} from "../services/intervention.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-intervention-list',
  templateUrl: './intervention-list.component.html',
  styleUrls: ['./intervention-list.component.css']
})
export class InterventionListComponent implements OnInit {

  connected : boolean;
  date : Date;
  string_date : string;
  full_string_date : string;
  list_interventions : Array<Intervention> = new Array<Intervention>();
  jour = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  mois = ['Janvier', 'Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']

  constructor(private interventionService : InterventionService, private  userService : UserService) {
    this.connected=userService.isConnected()
    this.date = new Date();
    this.string_date=this.DatetoString(this.date);
    this.list_interventions=interventionService.get_list_intervention(this.date.getDate(), this.date.getMonth(), this.date.getFullYear());
    this.full_string_date = this.FullDatetoString(this.date);
  }

  ngOnInit(): void {
  }

  PreviousDay() : void{
    this.date.setDate(this.date.getDate()-1);
    this.string_date=this.DatetoString(this.date);
    this.full_string_date = this.FullDatetoString(this.date);
    this.list_interventions=this.interventionService.get_list_intervention(this.date.getDate(), this.date.getMonth(), this.date.getFullYear());
  }
  NextDay() : void{
    this.date.setDate(this.date.getDate()+1);
    this.string_date=this.DatetoString(this.date);
    this.full_string_date = this.FullDatetoString(this.date);
    this.list_interventions=this.interventionService.get_list_intervention(this.date.getDate(), this.date.getMonth(), this.date.getFullYear());
  }
  DatetoString(date : Date) : string {
    return date.getDate()+" "+this.mois[date.getMonth()];
  }
  FullDatetoString(date : Date) : string {
    return this.jour[date.getDay()]+" "+date.getDate()+" "+this.mois[date.getMonth()]+" "+date.getFullYear();
  }
  setConnected(value : boolean) {
    this.userService.setConnected(value);
    this.connected=value;
  }
}

