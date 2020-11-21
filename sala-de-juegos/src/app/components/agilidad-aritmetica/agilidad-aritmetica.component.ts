import { Component, OnInit } from '@angular/core';
import { JuegosService } from "../../services/juegos.service";

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
  cuentas = new Array();
  cuenta = "";
  resultado = "";
  intento;
  gano:boolean=false;
  error:boolean=false;
  tiempoStart = 0;
  contIntentos = 0;

  time: number = 0;
  display;
  interval;

  constructor(private juegosService : JuegosService) { }

  ngOnInit(): void {
    this.comenzarJuego();
  }

  comenzarJuego(){
    this.resultado = "";
    this.cuenta = "";
    this.intento = "";
    this.error = false;
    this.gano = false;
    this.contIntentos = 0;

    let cuenta0 = {
      cuenta: "29 x 2",
      resultado: 58,
    }

    let cuenta1 = {
      cuenta: "43 + 97",
      resultado: 140,
    }

    let cuenta2 = {
      cuenta: "144 - 39",
      resultado: 105,
    }

    let cuenta3 = {
      cuenta: "128 / 8",
      resultado: 16,
    }

    this.cuentas.push(cuenta0);
    this.cuentas.push(cuenta1);
    this.cuentas.push(cuenta2);
    this.cuentas.push(cuenta3);

    this.elegirCuenta();
    this.reiniciarTimer();
    this.tiempoStart = Date.now();
  }

  reiniciarTimer(){
    this.pauseTimer();
    this.time = 0;
    this.startTimer();
  }

  elegirCuenta(){
    let rand = Math.random() * (4 - 0) + 0;
    let iCuenta = Math.floor(rand);
    this.cuenta = this.cuentas[iCuenta].cuenta;
    this.resultado = this.cuentas[iCuenta].resultado;
  }

  verificarIntento(){
    this.gano = false;
    this.error = false;
    if (this.intento != ""){
      this.contIntentos++;
      if (this.intento == this.resultado){
        this.gano = true;
        this.pauseTimer();
        let tiempoFin = Date.now();
        let tiempoTardado = tiempoFin - this.tiempoStart;
        this.juegosService.guardarPartidaAgilidadAritmetica(tiempoTardado, this.contIntentos);
      }
      else{
        this.error = true;
      }
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.time === 0){
        this.time++;
      }else
      {
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
