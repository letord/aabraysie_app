import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FicheLiaisonComponent} from "./fiche-liaison/fiche-liaison.component";
import {InterventionListComponent} from "./intervention-list/intervention-list.component";

const routes: Routes = [
  {path:'', component : InterventionListComponent},
  {path: 'fiche-liaison/:id', component : FicheLiaisonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
