import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InterventionService} from "../services/intervention.service";
import {Intervention} from "../model/intervention";
import {Location} from "@angular/common";
import {FormControl} from "@angular/forms";
import { DateService } from '../services/date.service';
import { HttpUrlEncodingCodec } from '@angular/common/http';


@Component({
  selector: 'app-fiche-liaison',
  templateUrl: './fiche-liaison.component.html',
  styleUrls: ['./fiche-liaison.component.css'],
  providers : []
})
export class FicheLiaisonComponent implements OnInit {

  displayStyle="none";
  commentaireControl : FormControl = new FormControl();
  mapsLink : string = '';
  intervention_selected : Intervention = {
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
  }

  constructor(private route: ActivatedRoute, private router : Router, private interventionService : InterventionService, private dateService : DateService) {
  }

  ngOnInit(): void {
    const IdFromRoute = Number(this.route.snapshot.paramMap.get('id'));
    this.intervention_selected=this.interventionService.get_Intervention(IdFromRoute)
    console.log('intervention selected : ', this.intervention_selected)
    this.mapsLink = this.transformIntoLink(''+this.intervention_selected.adresse_intervention);
  }

  transformIntoLink(adress : string) : string{
    var link : string = "https://www.google.com/maps/search/?api=1&query=";
    var  frparam : string = "&hl=fr";
    var adressTab : string[]  = adress.split(' ');
    console.log('adressTab',adressTab)
    var adressParam : string = ""
    for (let i = 0; i < adressTab.length; i++) {
      if(adressParam.length-1!=i){
        adressParam+=adressTab[i]+'+'
      }
      else {
        adressParam+=adressTab[i]+''
      }
    }
    return  link+adressParam+frparam;
  }

  async saveCommentaire(){
    let id : number = this.intervention_selected.id;
    let  commentaire = this.commentaireControl.value;
    await this.interventionService.addCommentaire(id, commentaire).toPromise().
    then(
      response  => {
        console.log('response Commentaire : ',response)
        this.interventionService.setCommentaire(id, commentaire)
        this.closePopup();
        this.router.navigate(['/intervention/'+this.dateService.dateToString(this.intervention_selected.date)]);
      },
      error => {
        console.log('error Commentaire : ',error)
      }
    )
  }
  openPopup(){
    this.displayStyle="block";
  }
  closePopup(){
    this.displayStyle="none";
  }
  backToListIntervention(){
    this.router.navigate(['/intervention/'+this.dateService.dateToString(this.intervention_selected.date)]);
  }
}
