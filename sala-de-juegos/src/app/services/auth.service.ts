import { Injectable, resolveForwardRef } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { ItemsToolbarService } from "../services/items-toolbar.service";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = null;
  logged : boolean;
  
  constructor(private auth: AngularFireAuth, private router : Router, private toolbar : ItemsToolbarService,  private db:AngularFirestore) {
    this.auth.authState.subscribe(state => {
      this.authState = state;
    });
  }

  getToken(){
    return this.auth.idToken;
  }

  getUser(){
    return this.authState ? this.authState.email : null;
  }

  iniciarSesion(email : string, password : string){
    this.logged = false;
    return new Promise((resolve, rejected)=>{
      this.auth.signInWithEmailAndPassword(email,password)
      .then(user=>{
        resolve(user)
        this.logged = true;
        this.toolbar.cambiarToolbarLogueado();
      })
      .catch(error=>rejected(error));
    });
  }

  signOut() {
    this.router.navigate(['login']);
    this.logged = false;
    this.auth.signOut();
    this.toolbar.cambiarToolbarSinSesion();
  }
  
  register(correo:string, clave:string, usuario:string){
    return new Promise((resolve, rejected) => {
      this.auth.createUserWithEmailAndPassword(correo, clave).then(res => {
        this.db.collection("Usuarios").doc(res.user.uid).set({
          id: res.user.uid,
          correo: correo,
          clave: clave,
          usuario: usuario
        });
        resolve(res);
      }).catch(error => rejected(error));
    });
  }
}
