import { Component } from '@angular/core';
import { JuegosService } from "../../services/juegos.service";

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
  fecha = Date.now();

  constructor(private juegosService : JuegosService) { 
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
    this.fecha = Date.now();
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
      let tiempo = Date.now();
      let tiempoTardado = tiempo - this.fecha;
      this.juegosService.guardarPartidaAdivinarNumero(tiempoTardado, this.contIntentos);
    }
  } 
}