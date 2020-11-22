import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { DateAdapter } from '@angular/material/core';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  constructor(private db : AngularFirestore, private auth : AuthService) { }

  guardarPartidaPiedraPapelOTijera(arma, resultado){
    let email = this.auth.getUser();
    this.traerUsuario(email).subscribe((u : any)=>{
      if (u[0].correo == email){
        this.db.collection("piedrapapelotijera").doc(this.auth.getUser() + Date.now()).set({
          user: u[0].usuario,
          arma: arma,
          resultado: resultado,
          email : this.auth.getUser(),
          fecha: Date.now()
        });
      }
    });
  }

  traerUsuario(email){
    return this.db.collection("Usuarios", ref => ref.where("correo", "==", email)).valueChanges();
  }

  guardarPartidaTaTeTi(tiempo, resultado){
    let email = this.auth.getUser();
    this.traerUsuario(email).subscribe((u : any)=>{
      if (u[0].correo == email){
        this.db.collection("tateti").doc(this.auth.getUser() + Date.now()).set({
          user: u[0].usuario,
          tiempo : tiempo,
          resultado : resultado,
          email : this.auth.getUser(),
          fecha: Date.now()
        });
      }
    });
  }

  guardarPartidaMemotest(tiempo, resultado, intentos){
    let email = this.auth.getUser();
    this.traerUsuario(email).subscribe((u : any)=>{
      if (u[0].correo == email){
        this.db.collection("memotest").doc(this.auth.getUser() + Date.now()).set({
          user: u[0].usuario,
          tiempo : tiempo,
          intentos : intentos,
          resultado : resultado,
          email : this.auth.getUser(),
          fecha: Date.now()
        });
      }
    });
  }

  guardarPartidaAdivinarNumero(tiempo, intentos){
    let email = this.auth.getUser();
    this.traerUsuario(email).subscribe((u : any)=>{
      if (u[0].correo == email){
        this.db.collection("adivinarelnumero").doc(this.auth.getUser() + Date.now()).set({
          user: u[0].usuario,
          tiempo : tiempo,
          intentos : intentos,
          email : this.auth.getUser(),
          fecha: Date.now()
        });
      }
    });
  }

  guardarPartidaAnagrama(tiempo, intentos){
    let email = this.auth.getUser();
    this.traerUsuario(email).subscribe((u : any)=>{
      if (u[0].correo == email){
        this.db.collection("anagrama").doc(this.auth.getUser() + Date.now()).set({
          user: u[0].usuario,
          tiempo : tiempo,
          intentos : intentos,
          email : this.auth.getUser(),
          fecha: Date.now()
        });
      }
    });
  }

  guardarPartidaAgilidadAritmetica(tiempo, intentos){
    let email = this.auth.getUser();
    this.traerUsuario(email).subscribe((u : any)=>{
      if (u[0].correo == email){
        this.db.collection("agilidad-aritmetica").doc(this.auth.getUser() + Date.now()).set({
          user: u[0].usuario,
          tiempo : tiempo,
          intentos : intentos,
          email : this.auth.getUser(),
          fecha: Date.now()
        });
      }
    });
  }

  guardarPartidaSnake(tiempo, puntaje){
    let email = this.auth.getUser();
    this.traerUsuario(email).subscribe((u : any)=>{
      if (u[0].correo == email){
        this.db.collection("snake").doc(this.auth.getUser() + Date.now()).set({
          user: u[0].usuario,
          tiempo : tiempo,
          puntaje : puntaje,
          email : this.auth.getUser(),
          fecha: Date.now()
        });
      }
    });
  }

  traerPartidaSnakeEmail(email){
    return this.db.collection("snake", ref => ref.where("email", "==", email)).valueChanges();
  }

  traerPartidasSnake(){
    return this.db.collection("snake").valueChanges();
  }

  traerPartidasAnagramaEmail(email){
    return this.db.collection("anagrama", ref => ref.where("email", "==", email)).valueChanges();
  }

  traerPartidasAgilidadAritmeticaEmail(email){
    return this.db.collection("agilidad-aritmetica", ref => ref.where("email", "==", email)).valueChanges();
  }
  
  traerPartidasAnagrama(){
    return this.db.collection("anagrama").valueChanges();
  }

  traerPartidasAgilidadAritmetica(){
    return this.db.collection("agilidad-aritmetica").valueChanges();
  }

  traerPartidasPiedraPapelOTijerasEmail(email){
    return this.db.collection("piedrapapelotijera", ref => ref.where("email", "==", email)).valueChanges();
  }

  traerPartidasTaTeTiEmail(email){
    return this.db.collection("tateti", ref => ref.where("email", "==", email)).valueChanges();
  }

  traerPartidasMemotestEmail(email){
    return this.db.collection("memotest", ref => ref.where("email", "==", email)).valueChanges();
  }

  traerPartidasAdivinaElNumeroEmail(email){
    return this.db.collection("adivinarelnumero", ref => ref.where("email", "==", email)).valueChanges();
  }

  traerPartidasPiedraPapelOTijeras(){
    return this.db.collection("piedrapapelotijera").valueChanges();
  }

  traerUsuarios(){
    return this.db.collection("Usuarios").valueChanges();
  }

  traerPartidasTateti(){
    return this.db.collection("tateti").valueChanges();
  }

  traerPartidasMemotest(){
    return this.db.collection("memotest").valueChanges();
  }

  traerPartidasAdivinarElNumero(){
    return this.db.collection("adivinarelnumero").valueChanges();
  }
}
