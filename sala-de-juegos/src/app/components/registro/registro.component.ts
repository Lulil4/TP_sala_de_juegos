import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  email: string = "";
  clave: string = "";
  usuario: string = "";
  hide: boolean = true;
  agregado : boolean = true;
  mensaje : string = "";
  spinner : boolean = false;

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  darDeAlta(){
    this.agregado = true;
    this.hide = true;
    this.mensaje = "";

    if(this.email == "" || this.clave == "" || this.usuario == ""){
      this.mensaje = "Por favor, ingrese todos los campos!";
    }

    if(this.mensaje != ""){
      this.hide = false;
    }
    else{
      this.hide = true;
      this.spinner = true;
      setTimeout(() => {
        this.authService.register(this.email, this.clave, this.usuario)
        .then(() =>{ 
        this.agregado = false;
        this.limpiar()
        ;})
        .catch((error) => {
        if (error.code == "auth/weak-password"){
          this.mensaje = "La clave es muy corta";
        }
        else if(error.code == "auth/email-already-in-use"){
          this.mensaje = "El correo ya existe";
        }
        else if(error.code == "auth/invalid-email"){
          this.mensaje = "El correo es inválido";
        }
        else{
          this.mensaje = error;
          console.log(error.code);
        }
        });
        this.hide = false;
        this.spinner = false;
        }, 2000); 
    }
  }
  

  limpiar(){
    this.email=""; 
    this.clave= "";
    this.usuario= "";
    this.mensaje= "";
    this.hide= true;
  }

}
