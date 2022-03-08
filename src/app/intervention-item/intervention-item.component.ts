import { Component, OnInit } from '@angular/core';
import {Input} from "@angular/core";
import {Intervention} from "../model/intervention";

@Component({
  selector: 'app-intervention-item',
  templateUrl: './intervention-item.component.html',
  styleUrls: ['./intervention-item.component.css']
})
export class InterventionItemComponent implements OnInit {

  @Input() intervention : Intervention = {
    id : 0,
    date : new Date(),
    heure_debut : "08:00",
    heure_fin : "11:00",
    libelle : 'Tonte' ,
    iscommented : false,
    nom_prenom: "Daudet Jean Marc",
    adresse_intervention : "92 Rue de la Bediniere 45800 ST JEAN DE BRAYE",
    telephone: '0609675469',
    consigne : 'prendre une tondeuse'
  };

  constructor() { }
  ngOnInit(): void {
  }
}
