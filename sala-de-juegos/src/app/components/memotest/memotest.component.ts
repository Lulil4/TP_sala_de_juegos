import { Component, OnInit } from '@angular/core';
import { TileStyler } from '@angular/material/grid-list/tile-styler';
import { count } from 'rxjs/operators';
import { JuegosService } from "../../services/juegos.service";

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {
  cartasDadasVuelta = new Array();
  paresUsuario = 0;
  paresPC = 0;
  ocultarResultado : boolean = true;
  textoResultado = "no se seteo";
  ocultarEspera : boolean = true;
  bloqueoJugar : boolean = false;
  fecha = Date.now();
  intentos : number = 0;

  time: number = 0;
  display;
  interval;
  
  breakpoint = 0;

  cartas = [
    {nombre: "felipe", foto:"../../../assets/img/memotest/felipe.jpeg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "coca", foto:"../../../assets/img/memotest/coca.jpg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "lobo", foto:"../../../assets/img/memotest/lobo.jpg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "lobo", foto:"../../../assets/img/memotest/lobo.jpg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "felipe", foto:"../../../assets/img/memotest/felipe.jpeg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "coca", foto:"../../../assets/img/memotest/coca.jpg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "simone", foto:"../../../assets/img/memotest/simone.jpeg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "nano", foto:"../../../assets/img/memotest/nano.jpeg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "simone", foto:"../../../assets/img/memotest/simone.jpeg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "nano", foto:"../../../assets/img/memotest/nano.jpeg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "floki", foto:"../../../assets/img/PITBULL.jpg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "floki", foto:"../../../assets/img/PITBULL.jpg", colorJugador : "", bloqueoPropio:false, par : false},
  ]
  
  constructor(private juegosService : JuegosService) { }

  ngOnInit(): void {
    let cols = (window.innerWidth <= 900) ? 3 : 6;
    this.breakpoint = cols;

    this.jugarOtraVez();
  }

  onResize(event) {
    let cols = (event.target.innerWidth <= 900) ? 3 : 6;

    this.breakpoint = cols;
  }
  

  jugarOtraVez(){
    this.bloqueoJugar = true;
    this.cartas.forEach(c => {
      c.colorJugador = "";
      c.par = false;
    });
    this.shuffle();
    this.mostrarCartas();
    this.cartasDadasVuelta = new Array();
    this.paresUsuario = 0;
    this.paresPC = 0;
    this.intentos = 0;
    this.ocultarResultado = true;
    this.ocultarEspera = true;
    this.fecha = Date.now();
    this.reiniciarTimer();
  }

  turnoUsuario(indexCarta){
    if(this.cartas[indexCarta].bloqueoPropio == false){
      if (this.cartasDadasVuelta.length == 0){
        this.cartas[indexCarta].colorJugador = "accent";
        this.cartas[indexCarta].bloqueoPropio = true;
        this.cartasDadasVuelta.splice(indexCarta, 1, this.cartas[indexCarta]);
       }
      else if (this.cartasDadasVuelta.length == 1){
        this.cartas[indexCarta].colorJugador = "accent";
        this.cartas[indexCarta].bloqueoPropio = true;
        this.cartasDadasVuelta.splice(indexCarta, 1, this.cartas[indexCarta]);
        this.intentos++;
        this.bloquearCartas();
        setTimeout(() => {
          if (this.verificarPar()){ 
            this.paresUsuario++; 
            if (!this.verificarSiQuedanCartas()){
              this.verResultado();
            }
            
          }
          this.desbloquearCartas();
          
          if (this.verificarSiQuedanCartas()){  
            this.bloquearCartas();
            this.ocultarEspera = false;
            setTimeout(() => {
              this.turnoPC(); 
            }, 2000);
          }
        }, 2000);
      }
    }
  }

  hacerMovimiento(indexCartaUsuario){
    this.turnoUsuario(indexCartaUsuario);
  }

  turnoPC(){
    let rand = Math.random() * (13 - 0) + 0;  
    let indexCarta = Math.floor(rand);
    let i = 0;
    for(i=0; i<1000; i++){
      rand = Math.random() * (13 - 0) + 0;  
      indexCarta = Math.floor(rand);
      if (this.cartas[indexCarta].colorJugador == ""){
        console.log(indexCarta); 
        this.cartas[indexCarta].colorJugador = "accent";
        this.cartas[indexCarta].bloqueoPropio = true;
        this.cartasDadasVuelta.push(this.cartas[indexCarta]);   
        break; 
      }
    }

    for(i=0; i<1000; i++){
      rand = Math.random() * (13 - 0) + 0;  
      indexCarta = Math.floor(rand);
      if (this.cartas[indexCarta].colorJugador == ""){
        console.log(indexCarta); 
        this.cartas[indexCarta].colorJugador = "accent";
        this.cartas[indexCarta].bloqueoPropio = true;
        this.cartasDadasVuelta.push(this.cartas[indexCarta]);
        break; 
      }
    }

    console.log("sgte");
    setTimeout(() => {
      if (this.verificarPar()){ 
        this.paresPC++;
        if (!this.verificarSiQuedanCartas()){
          this.verResultado();
        }
      }
      this.desbloquearCartas();
      this.ocultarEspera = true;
    }, 2000);
  }

  verResultado(){
    this.ocultarResultado = false;
    this.ocultarEspera = true;
    let tiempo = Date.now();
    let tiempoTardado = tiempo - this.fecha;
    
    if(this.paresUsuario > this.paresPC){
      this.textoResultado = "Ganaste!!"
      this.pauseTimer();
      this.juegosService.guardarPartidaMemotest(tiempoTardado, "ganado", this.intentos);
    }
    else if(this.paresUsuario < this.paresPC){
      this.textoResultado = "Perdiste chiquitin"
      this.pauseTimer();
      this.juegosService.guardarPartidaMemotest(tiempoTardado, "perdido", this.intentos);

    }
    else if (this.paresUsuario == this.paresPC){
      this.pauseTimer();
      this.juegosService.guardarPartidaMemotest(tiempoTardado, "empatado", this.intentos);

    }
  }

  verificarSiQuedanCartas(){
    let quedanCartas = false;

    this.cartas.forEach(c => {
      if (c.par == false){
        quedanCartas = true;
      }
    });

    return quedanCartas;
  }

  verificarPar(){
    let par = false;
    let cartaUno;
    let cartaDos;
    let count = 0;
    var iUno;
    var iDos;
   
    this.cartasDadasVuelta.forEach((c) => {
      if (c != null && count == 0){
        cartaUno = c;
        count++;
      }
      else if (c != null && count == 1){
        cartaDos = c;
        count++;
      }
    });

    if (cartaUno.nombre == cartaDos.nombre){
      par = true;
      this.cartas.forEach(c => {
        if (c.colorJugador != "" && c.par == false){
          c.par = true;
        }
      });
    }

    if (par != true){
      this.cartas.forEach(c => {
        if (c.colorJugador != "" && c.par == false){
          c.colorJugador = "";
          c.bloqueoPropio = false;
        }
      });
    }

    this.cartasDadasVuelta = new Array();
    return par;
  }

  shuffle() {
    let currentIndex = this.cartas.length;
    let temporaryValue;
    let randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = this.cartas[currentIndex];
      this.cartas[currentIndex] = this.cartas[randomIndex];
      this.cartas[randomIndex] = temporaryValue;
    }
    return this.cartas;
  }

  mostrarCartas(){
    this.cartas.forEach(c => {
      c.colorJugador = "accent";
      c.bloqueoPropio = true; 
    });
    setTimeout(() => {
      this.cartas.forEach(c => {
        c.colorJugador = ""; 
        c.bloqueoPropio = false;
        this.bloqueoJugar = false;
      });
    }, 2000);
  }

  bloquearCartas(){
    this.bloqueoJugar = true;
    this.cartas.forEach(c => {
      c.bloqueoPropio = true; 
    });
  }

  desbloquearCartas(){
    this.bloqueoJugar = false;
    this.cartas.forEach(c => {
      if (c.colorJugador == ""){
        c.bloqueoPropio = false; 
      }
    });
  }
  
  reiniciarTimer(){
    this.pauseTimer();
    this.time = 0;
    this.startTimer();
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