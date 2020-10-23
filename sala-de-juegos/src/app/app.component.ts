import { Component } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { ItemsToolbarService } from './services/items-toolbar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sala-de-juegos';

  constructor(private auth : AuthService, private toolbar : ItemsToolbarService){
    if (this.auth.verificarLogueo()){
      this.toolbar.cambiarToolbarLogueado();
    }
  }
}
