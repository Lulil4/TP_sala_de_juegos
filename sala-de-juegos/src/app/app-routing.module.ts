import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegosComponent } from './components/juegos/juegos.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path:"juegos",
    component: JuegosComponent,
  },
  {
    path:"acerca-de",
    component: AcercaDeComponent,
  },
  {
    path:"",
    component: HomeComponent,
  },
  {
    path:"**",
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
