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
    this.db.collection("piedrapapelotijera").doc(this.auth.getUser() + Date.now()).set({
      arma: arma,
      resultado: resultado,
      email : this.auth.getUser(),
      fecha: Date.now()
    });
  }

  guardarPartidaTaTeTi(tiempo, resultado){
    this.db.collection("tateti").doc(this.auth.getUser() + Date.now()).set({
      tiempo : tiempo,
      resultado : resultado,
      email : this.auth.getUser(),
      fecha: Date.now()
    });
  }

  guardarPartidaMemotest(tiempo, resultado, intentos){
    this.db.collection("memotest").doc(this.auth.getUser() + Date.now()).set({
      tiempo : tiempo,
      intentos : intentos,
      resultado : resultado,
      email : this.auth.getUser(),
      fecha: Date.now()
    });
  }

  guardarPartidaAdivinarNumero(tiempo, intentos){
    this.db.collection("adivinarelnumero").doc(this.auth.getUser() + Date.now()).set({
      tiempo : tiempo,
      intentos : intentos,
      email : this.auth.getUser(),
      fecha: Date.now()
    });
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
    return this.db.collection("Usuarios");
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
