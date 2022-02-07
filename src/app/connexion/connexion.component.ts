import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../model/user";
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  username = new FormControl();
  password = new FormControl();
  echecConnexion : boolean = false;

  constructor(
    private http : HttpClient,
    private router : Router,
    private authService : AuthService ) {}
  ngOnInit(){
  }

  async connexion(){
    await this.authService.connexion(this.username.value,this.password.value).toPromise()
   .then(
     response => {
       let user : User = {idEquipe:0,nom :'',prenom : ''};
       user.idEquipe=response.idEquipe;
       user.nom=response.contactUtilisateur.nom;
       user.prenom=response.contactUtilisateur.prenom;
       this.authService.setUser(user);
       this.echecConnexion=false;
       this.router.navigate(['/intervention']);
     },
     error => {
       if(error.status == '404'){
         console.log('error 404')
         this.echecConnexion=true;
       }
     }

   )
  }
}
