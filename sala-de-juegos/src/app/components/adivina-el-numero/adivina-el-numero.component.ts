import { Component } from '@angular/core';
import { JuegosService } from "../../services/juegos.service";

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent {
  desviacion: number;
  contIntentos: number;
  numeroSecreto: number;
  numeroIngresado: number;
  mensajeCasi: string;
  ganador: boolean = false;
  casi: boolean = false;
  mostrarChequear: boolean = true;
  fecha = Date.now();

  time: number = 0;
  display;
  interval;

  constructor(private juegosService: JuegosService) {
    this.iniciar();
  }

  iniciar() {
    this.contIntentos = 0;
    this.numeroSecreto = Math.floor((Math.random() * 200) + 1);
    this.numeroIngresado = null;
    this.desviacion = null;
    this.casi = false;
    this.ganador = false;
    this.mostrarChequear = true;
    this.fecha = Date.now();
    this.reiniciarTimer();
  }

  verificarIntento() {
    let num =  Number(this.numeroIngresado);
    console.log(num);
    if (num > 1 && num < 200){
      this.desviacion = this.numeroSecreto - this.numeroIngresado;
      this.contIntentos = this.contIntentos + 1;
  
      if (this.desviacion < 0) {
        this.mensajeCasi = "Muy alto! Bajate del pony";
        this.casi = true;
      }
      else if (this.desviacion > 0) {
        this.mensajeCasi = "Muy chico, dale más";
        this.casi = true;
      }
      else {
        this.pauseTimer();
        this.casi = false;
        this.ganador = true;
        this.mostrarChequear = false;
        let tiempo = Date.now();
        let tiempoTardado = tiempo - this.fecha;
        this.juegosService.guardarPartidaAdivinarNumero(tiempoTardado, this.contIntentos);
      }
    }
    else{
      this.mensajeCasi = "El numero está entre 1 y 200!";
      this.casi = true;
    }
  }

  reiniciarTimer() {
    this.pauseTimer();
    this.time = 0;
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.display = this.transform(this.time)
    }, 1000);
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}