import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  username = new FormControl();
  password = new FormControl();
  @Output() resultat_connexion = new EventEmitter<boolean>();

  constructor(private userService : UserService) {


  }
  ngOnInit(){
  }

  onSubmit(){
    console.log(this.username.value);
    console.log(this.password.value);
    this.userService.setConnected(true);
    this.resultat_connexion.emit(true);
  }
}
