import {Component, Input, OnInit} from '@angular/core';
import {Intervention} from "../model/intervention";
import {InterventionService} from "../services/intervention.service";
import {AuthService} from "../services/auth.service";
import {DateService} from "../services/date.service";
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../model/user';

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
  list_interventions : Array<Intervention> = new Array<Intervention>();

  constructor(
    private interventionService : InterventionService, private  authService : AuthService, private dateService : DateService, private route : ActivatedRoute, private router : Router) {

    const dateFromRoute : string= String( this.route.snapshot.paramMap.get('date'));
    this.date_selected = this.dateService.stringToDate(dateFromRoute)
    this.string_date=this.dateService.getDatetoString();

    this.full_string_date = this.dateService.getFullDatetoString();
    this.user = this.authService.getUser();

    this.list_interventions=this.interventionService.get_interventions_today(this.date_selected);
  }
  ngOnInit(): void {

  }

  PreviousDay() : void{
    this.date_selected= this.dateService.previousDay()
    this.string_date=this.dateService.getDatetoString();
    this.full_string_date = this.dateService.getFullDatetoString();
    this.list_interventions=this.interventionService.get_interventions_today(this.date_selected);
  }
  NextDay() : void{
    this.date_selected= this.dateService.nextDay();
    this.string_date=this.dateService.getDatetoString();
    this.full_string_date = this.dateService.getFullDatetoString();
    this.list_interventions=this.interventionService.get_interventions_today(this.date_selected);
  }
  Disconnect():void {
    this.authService.disconnect();
    this.router.navigate([''])
  }

}

