import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = "";
  pwd:string = "";
  err:string;
  hide:boolean;
  spinner:boolean;
  constructor(private authService : AuthService, public router : Router) { 
  }

  ngOnInit() {
  }

  onSubmitLogin(){
    this.err = "";
    if(this.email == "" && this.pwd == ""){
      this.err = "Por favor, ingrese correo y contraseña!"
    }
    else if(this.email == "")
    {
      this.err = "Por favor, ingrese su correo!";
    }
    else if(this.pwd == "")
    {
      this.err = "Por favor, ingrese su contraseña!";
    }

      
    if(this.err != ""){
      this.hide = false;
    }
    else{
      this.authService.iniciarSesion(this.email, this.pwd).then(res =>{
        this.hide = true;
        this.spinner=true;
        setTimeout(() => {
          this.router.navigate([""], {state : {email: this.email}});
          this.clean();
          this.spinner=false;
        },4000);
      }).catch(error =>{
        console.log(error.code);
        if(error.code == "auth/invalid-email")
        {
          this.err = "Ingrese un correo válido!";
        }
        else if(error.code == "auth/user-not-found")
        {
          this.err = "No existe un usuario con dicho correo electrónico.";
        }
        else if(error.code == "auth/wrong-password")
        {
          this.err = "Contraseña incorrecta.";
        }
        else{
          this.err = error;
        }
        this.hide = false;
      });
    }
  }

  clean(){
    this.email="";
    this.pwd="";
    this.hide = true;
  }

  loginAdmin(){
    this.email = "admin@admin.com";
    this.pwd = "123456";
    this.onSubmitLogin();
  }
}
