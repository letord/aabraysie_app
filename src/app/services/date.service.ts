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
  stringToDate(val : string) : Date{
    let tab : string[] = val.split('-')
    var annee : number = Number(tab[0]);
    var mois : number = (Number(tab[1]));
    var jour : number = Number(tab[2]);
    let day : Date = new Date(annee, mois, jour);
    return day;
  }
  stringToDateJSON(val : string) : Date{
    let tab : string[] = val.split('-')
    var annee : number = Number(tab[0]);
    var mois : number = (Number(tab[1]) -1)%11;
    var jour : number = Number(tab[2]);
    let day : Date = new Date(annee, mois, jour);
    return day;
  }
  dateToString(date : Date) : string {
    var annee : number = date.getFullYear();
    var mois : number = date.getMonth();
    var jour : number = date.getDate();
    return annee+'-'+mois+'-'+jour;
  }
  equalDate(date1 : Date, date2 : Date) : boolean {
    var jourTest : boolean = date1.getDate()==date2.getDate();
    var moisTest : boolean = date1.getMonth() == date2.getMonth();
    var anneeTest : boolean = date1.getFullYear() == date2.getFullYear();
    var result : boolean = jourTest && moisTest && anneeTest;
    return result;
  }
}
