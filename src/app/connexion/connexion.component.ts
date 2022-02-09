import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {User} from "../model/user";
import { Router } from '@angular/router';
import {InterventionService} from "../services/intervention.service";
import {DateService} from "../services/date.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  username = new FormControl();
  password = new FormControl();
  echecConnexion : boolean = false;
  date : Date;

  constructor(
    private router : Router,
    private authService : AuthService ,
    private interventionService : InterventionService,
    private dateService : DateService) {
    this.date = new Date();
  }

  ngOnInit(){

  }

  async connexion(){
    await this.authService.connexion(this.username.value,this.password.value).toPromise()
   .then(
     response => {
       let user : User = {idEquipe : 0, nom : '', prenom : ''};
       user.idEquipe=response.idEquipe;
       user.nom=response.contactUtilisateur.nom;
       user.prenom=response.contactUtilisateur.prenom;
       this.authService.setUser(user);
       this.echecConnexion=false;
       this.download_interventions(response.idEquipe,this.date.getFullYear());
     },
     error => {
       if(error.status == '404'){
         console.log('error 404')
         this.echecConnexion=true;
       }
     }
   )
  }
  async download_interventions(id:number,annee : number){
    await this.interventionService.getInterventions(id, annee).toPromise()
      .then(
        response => {
          this.interventionService.setInterventions(response);
          console.log('this date ',this.date)
          this.router.navigate(['/intervention/'+this.dateService.dateToString(this.date)]);
        }
      )
  }
}
