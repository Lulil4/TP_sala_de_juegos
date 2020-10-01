import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item';

@Component({
  selector: 'app-mi-toolbar',
  templateUrl: './mi-toolbar.component.html',
  styleUrls: ['./mi-toolbar.component.css']
})
export class MiToolbarComponent implements OnInit {

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
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
