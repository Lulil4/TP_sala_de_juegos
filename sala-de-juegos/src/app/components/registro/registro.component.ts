import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm = this.fb.group({
    correo:["", [Validators.required, Validators.email]],
    usuario:["", [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
    clave:["", [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
  })

  hide: boolean = true;
  agregado : boolean = true;
  mensaje : string = "";
  spinner : boolean = false;

  constructor(private authService : AuthService, private fb : FormBuilder) { }

  ngOnInit() {
  }

  darDeAlta(){
   let correo = this.registroForm.controls["correo"].value;
   let usuario = this.registroForm.controls["usuario"].value;
   let clave = this.registroForm.controls["clave"].value;
    
    this.agregado = true;
    this.hide = true;
    this.mensaje = "";

    if(this.mensaje != ""){
      this.hide = false;
    }
    else{
      this.hide = true;
      this.spinner = true;
      setTimeout(() => {
        this.authService.register(correo, clave, usuario)
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
        }
        });
        this.hide = false;
        this.spinner = false;
        }, 2000); 
        
    }
  }
  

  limpiar(){
    this.registroForm.reset();
    this.mensaje= "";
    this.hide= true;
  }

}
