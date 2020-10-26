import { Component, OnInit } from '@angular/core';
import { TileStyler } from '@angular/material/grid-list/tile-styler';
import { count } from 'rxjs/operators';

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

  cartas = [
    {nombre: "felipe", foto:"../../../assets/img/memotest/felipe.jpeg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "coca", foto:"../../../assets/img/memotest/coca.jpg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "lobo", foto:"../../../assets/img/memotest/lobo.jpg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "lobo", foto:"../../../assets/img/memotest/lobo.jpg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "felipe", foto:"../../../assets/img/memotest/felipe.jpeg", colorJugador : "", bloqueoPropio:false, par : false},
    {nombre: "coca", foto:"../../../assets/img/memotest/coca.jpg", colorJugador : "", bloqueoPropio:false, par : false},
  ]
  
  constructor() { }

  ngOnInit(): void {
    this.jugarOtraVez();
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
    this.ocultarResultado = true;
    this.ocultarEspera = true;

  }

  turnoUsuario(indexCarta){
    if (this.cartasDadasVuelta.length == 0){
      this.cartas[indexCarta].colorJugador = "accent";
      this.cartas[indexCarta].bloqueoPropio = true;
      this.cartasDadasVuelta.splice(indexCarta, 1, this.cartas[indexCarta]);
     }
    else if (this.cartasDadasVuelta.length == 1){
      this.cartas[indexCarta].colorJugador = "accent";
      this.cartas[indexCarta].bloqueoPropio = true;
      this.cartasDadasVuelta.splice(indexCarta, 1, this.cartas[indexCarta]);
      this.bloquearCartas();
      setTimeout(() => {
        if (this.verificarPar()){ //aca
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

  hacerMovimiento(indexCartaUsuario){
    this.turnoUsuario(indexCartaUsuario);
  }

  turnoPC(){
    let rand = Math.random() * (6 - 0) + 0;  
    let indexCarta = Math.floor(rand);
    let i = 0;
    for(i=0; i<1000; i++){
      rand = Math.random() * (6 - 0) + 0;  
      indexCarta = Math.floor(rand);
      if (this.cartas[indexCarta].colorJugador == ""){
        this.cartas[indexCarta].colorJugador = "accent";
        this.cartas[indexCarta].bloqueoPropio = true;
        this.cartasDadasVuelta.push(this.cartas[indexCarta]);    
        break; 
      }
    }

    for(i=0; i<1000; i++){
      rand = Math.random() * (6 - 0) + 0;  
      indexCarta = Math.floor(rand);
      if (this.cartas[indexCarta].colorJugador == ""){
        this.cartas[indexCarta].colorJugador = "accent";
        this.cartas[indexCarta].bloqueoPropio = true;
        this.cartasDadasVuelta.push(this.cartas[indexCarta]);
        break; 
      }
    }

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
    console.log(this.paresUsuario);
    console.log(this.paresPC);
    if(this.paresUsuario > this.paresPC){
      this.textoResultado = "Ganaste!!"
    }
    else if(this.paresUsuario < this.paresPC){
      this.textoResultado = "Perdiste chiquitin"
    }
    else if (this.paresUsuario == this.paresPC){
      this.textoResultado = "Empate!!"
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
}