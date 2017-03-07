import {Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import {HeroeComponent} from "./heroe/heroe.component";
import {PoderComponent} from "./poder/poder.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'poder', component: PoderComponent },
  {path:'heroe',component: HeroeComponent}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
