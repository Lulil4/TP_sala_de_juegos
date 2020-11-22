import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item';

@Injectable({
  providedIn: 'root'
})
export class ItemsToolbarService {

  menuItems: MenuItem[] = [
    {
      texto: 'MISalita',
      icono: "home",
      ruta: ""
    },
    {
      texto: "Iniciar sesion",
      icono: "sentiment_satisfied_alt",
      ruta: "login"
    },
    {
      texto: "Registrarse",
      icono: "person_add_alt_1",
      ruta: "registro"
    }
  ]

  constructor() { 
  }

  cambiarToolbarLogueado(){
    let itemHome = {
      texto: 'MISalita',
      icono: "home",
      ruta: ""
    };

    let itemJuegos = {
      texto: "Juegos",
      icono: "sports_esports",
      ruta: "juegos"
    };

    let itemEst ={
      texto: "Estadisticas",
      icono: "people",
      ruta : "estadisticas"
    }

    let itemAcerca = {
      texto: "Acerca de...",
      icono: "account_circle",
      ruta: "acerca-de"
    };

    let itemCerrar = {
      texto: "Cerrar Sesion",
      icono: "outlet",
      ruta: "logout"
    };

    let length = this.menuItems.length;

    for(let i = 0; i < length; i++){
      this.menuItems.pop();
    }

    this.menuItems.push(itemHome);
    this.menuItems.push(itemJuegos);
    this.menuItems.push(itemEst);
    this.menuItems.push(itemAcerca);
    this.menuItems.push(itemCerrar);
  }

  cambiarToolbarSinSesion(){
    let itemHome = {
      texto: 'MISalita',
      icono: "home",
      ruta: ""
    };

    let itemIniciarSesion = {
      texto: "Iniciar sesion",
      icono: "sentiment_satisfied_alt",
      ruta: "login"
    };
    
    let itemRegistro = {
      texto: "Registrarse",
      icono: "person_add_alt_1",
      ruta: "registro"
    }

    let length = this.menuItems.length;

    for(let i = 0; i < length; i++){
      this.menuItems.pop();
    }

    this.menuItems.push(itemHome);
    this.menuItems.push(itemIniciarSesion);
    this.menuItems.push(itemRegistro);
  }
}
