import { Injectable, resolveForwardRef } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { ItemsToolbarService } from "../services/items-toolbar.service";
import { AngularFirestore } from "@angular/fire/firestore";

import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = null;
  
  constructor(private auth: AngularFireAuth, private router : Router, private toolbar : ItemsToolbarService,  private db:AngularFirestore) {
    this.auth.authState.subscribe(state => {
      this.authState = state;
    });

    if (this.verificarLogueo()){
      this.toolbar.cambiarToolbarLogueado();
    }
  }

  getToken(){
    return this.auth.idToken;
  }

  getUser(){
    return this.authState ? this.authState.email : null;
  }

  iniciarSesion(email : string, password : string){
    return new Promise((resolve, rejected)=>{
      this.auth.signInWithEmailAndPassword(email,password)
      .then(user=>{
        resolve(user)
        this.toolbar.cambiarToolbarLogueado();
      })
      .catch(error=>rejected(error));
    });
  }

  signOut() {
    this.router.navigate(['login']);
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

  isLoggedInPromise() {
    return new Promise((resolve, rejected) => {
      this.auth.authState.pipe(first()).toPromise()
      .then(user =>{
        console.log(user);
        let logged = false;
        if (user != null){
          logged = true;
        }
        resolve(logged);
      })
      .catch(error => rejected(error));
    });
  }

  async verificarLogueo(){
    let logged: boolean = false;

    await this.isLoggedInPromise()
    .then((user: any) => {
      logged = user;
    })
    .catch((error: any) => {
      console.log(error)
    });
    
    return logged;
  }
}
