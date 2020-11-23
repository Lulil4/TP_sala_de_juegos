import { Component } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { ItemsToolbarService } from './services/items-toolbar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Corre Coscacha';

  constructor(private auth : AuthService, private toolbar : ItemsToolbarService){
      this.auth.verificarLogueo().then(res=>{
        if (res){
        this.toolbar.cambiarToolbarLogueado();
        }
      });
  }
}

