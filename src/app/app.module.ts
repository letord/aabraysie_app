import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FicheLiaisonComponent } from './fiche-liaison/fiche-liaison.component';
import { InterventionItemComponent } from './intervention-item/intervention-item.component';
import { InterventionListComponent } from './intervention-list/intervention-list.component';
import { ConnexionComponent } from './connexion/connexion.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
    FicheLiaisonComponent,
    InterventionItemComponent,
    InterventionListComponent,
    ConnexionComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
