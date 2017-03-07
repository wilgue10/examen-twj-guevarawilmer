import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {MasterUrlService} from "./services/master-url.service";
import { AppComponent } from './app.component';
import { HeroeComponent } from './heroe/heroe.component';
import { PoderComponent } from './poder/poder.component';
import { HomeComponent } from './home/home.component';
import {routing} from "./app.routes";
@NgModule({
  declarations: [
    AppComponent,
    HeroeComponent,
    PoderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    MasterUrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
