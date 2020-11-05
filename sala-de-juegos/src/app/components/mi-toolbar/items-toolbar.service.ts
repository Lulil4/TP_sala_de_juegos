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
      texto: "Juegos",
      icono: "sports_esports",
      ruta: "juegos"
    },
    {
      texto: "Acerca de...",
      icono: "account_circle",
      ruta: "acerca-de"
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
    let itemCerrarSesion = {
      texto: "Cerrar Sesion",
      icono: "outlet",
      ruta: "logout"
    };
    this.menuItems.pop();
    this.menuItems.pop();
    this.menuItems.push(itemCerrarSesion);
  }

  cambiarToolbarSinSesion(){
    let itemIniciarSesion =     {
      texto: "Iniciar sesion",
      icono: "sentiment_satisfied_alt",
      ruta: "login"
    };
    let itemRegistro = {
      texto: "Registrarse",
      icono: "person_add_alt_1",
      ruta: "registro"
    }

    this.menuItems.pop();
    this.menuItems.push(itemIniciarSesion);
    this.menuItems.push(itemRegistro);
  }
}
