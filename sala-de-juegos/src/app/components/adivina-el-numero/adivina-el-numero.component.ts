import { Component } from '@angular/core';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent{
  desviacion: number; 
  contIntentos: number; 
  numeroSecreto: number; 
  numeroIngresado: number; 
  mensajeCasi : string;
  ganador : boolean = false;
  casi : boolean = false;
  mostrarChequear : boolean = true;

  constructor() { 
    this.iniciar(); 
  } 

  iniciar() { 
    this.contIntentos = 0; 
    this.numeroSecreto = Math.floor((Math.random() * 100) + 1); 
    this.numeroIngresado = null; 
    this.desviacion = null; 
    this.casi = false;
    this.ganador = false;
    this.mostrarChequear = true;
  } 

  verificarIntento() { 
    this.desviacion = this.numeroSecreto - this.numeroIngresado; 
    this.contIntentos = this.contIntentos + 1; 

    if (this.desviacion < 0){
      this.mensajeCasi = "Muy alto! Bajate del pony";
      this.casi = true; 
    }
    else if(this.desviacion > 0){
      this.mensajeCasi = "Muy chico, dale más";
      this.casi = true; 
    }
    else{
      this.casi = false;
      this.ganador = true;
      this.mostrarChequear = false;
    }
  } 
}