import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegosComponent } from './components/juegos/juegos.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AnagramaComponent } from './components/anagrama/anagrama.component';
import { PiedraPapelTijeraComponent } from './components/piedra-papel-tijera/piedra-papel-tijera.component';
import { AgilidadAritmeticaComponent } from './components/agilidad-aritmetica/agilidad-aritmetica.component';
import { AdivinaElNumeroComponent } from './components/adivina-el-numero/adivina-el-numero.component';
import { TaTeTiComponent } from './components/ta-te-ti/ta-te-ti.component';
import { MemotestComponent } from './components/memotest/memotest.component';

const routes: Routes = [
  {
    path:"juegos",
    component: JuegosComponent,
    children:[
      {
        path: "anagrama",
        component: AnagramaComponent,
      },
      {
        path: "piedra-papel-tijera",
        component: PiedraPapelTijeraComponent,
      },
      {
        path: "agilidad-aritmetica",
        component: AgilidadAritmeticaComponent,
      },
      {
        path: "adivina-el-numero",
        component: AdivinaElNumeroComponent,
      },
      {
        path: "ta-te-ti",
        component: TaTeTiComponent,
      },
      {
        path: "memotest",
        component: MemotestComponent,
      }    
    ]
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
