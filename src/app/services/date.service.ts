import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  jour = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  mois = ['Janvier', 'Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
  date : Date= new Date();
  constructor() { }

  getDate() : Date{
    return this.date;
  }
  setDate(date: Date) {
    this.date=date;
  }
  previousDay() : Date{
    this.date.setDate(this.date.getDate()-1);
    return this.date
  }
  nextDay() : Date{
    this.date.setDate(this.date.getDate()+1);
    return this.date
  }
  getDatetoString() : string {
    return this.date.getDate()+" "+this.mois[this.date.getMonth()];
  }
  getFullDatetoString() : string {
    return this.jour[this.date.getDay()]+" "+this.date.getDate()+" "+this.mois[this.date.getMonth()]+" "+this.date.getFullYear();
  }
}
