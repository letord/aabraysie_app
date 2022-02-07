import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {InterventionService} from "../services/intervention.service";
import {Intervention} from "../model/intervention";
import {Location} from "@angular/common";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-fiche-liaison',
  templateUrl: './fiche-liaison.component.html',
  styleUrls: ['./fiche-liaison.component.css'],
  providers : []
})
export class FicheLiaisonComponent implements OnInit {

  displayStyle="none";
  commentaire = new FormControl();
  intervention_selected : Intervention = {
    id : 0,
    date : new Date(),
    heure_debut : 8,
    heure_fin : 11,
    libelle : 'Tonte' ,
    iscommented : false,
    nom_prenom: "Daudet Jean Marc",
    adresse_intervention : "92 Rue de la Bediniere 45800 ST JEAN DE BRAYE",
    telephone: '0609675469',
    consigne : 'prendre une tondeuse'
  }

  constructor(private route: ActivatedRoute, private interventionService : InterventionService, private _location : Location) {
  }

  ngOnInit(): void {
    const IdFromRoute = Number(this.route.snapshot.paramMap.get('id'));
    console.log(IdFromRoute)
    this.intervention_selected=this.interventionService.get_Intervention(IdFromRoute)
  }
  openPopup(){
    this.displayStyle="block";
  }
  closePopup(){
    this.displayStyle="none";
  }
  backToListIntervention(){
    this._location.back();
  }
  saveCommentaire(){
    this.interventionService.addCommentaire(this.intervention_selected.id, this.commentaire.value);
    this.intervention_selected.commentaire_client=this.commentaire.value;
    this.intervention_selected.iscommented=true;
  }
}
