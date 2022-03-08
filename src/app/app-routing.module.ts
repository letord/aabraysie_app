import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import {FicheLiaisonComponent} from "./fiche-liaison/fiche-liaison.component";
import { AuthGuard } from './guards/auth.guard';
import {InterventionListComponent} from "./intervention-list/intervention-list.component";

const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  {path:'connexion', component : ConnexionComponent},
  {path:'intervention/:date', component : InterventionListComponent, canActivate : [AuthGuard]},
  {path: 'intervention/:date/fiche-liaison/:id', component : FicheLiaisonComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
