import { Component, OnInit } from '@angular/core';
import { JuegosService } from "../../services/juegos.service";

//Constantes!
export const TAM_TABLERO = 18;

export const CONTROLES = {
  IZQ: 65,
  ARR: 87,
  DER: 68,
  AB: 83
};

export const COLORES = {
  GAME_OVER: '#ff3399',
  FRUTA: '#f9ff00',
  CABEZA: '#FF1493',
  CUERPO: '#FFC0CB',
  TABLERO: '#DB7093'
};
// /Constantes!

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent {
  private delegadoTeclado;
  private interval: number;
  private direccion: number;
  public perdio = false;
  public tablero = [];
  public puntos = 0;
  public jugando = false;
  private fecha;
  public mensajeWASD = true;

  private serpiente = {
    direction: CONTROLES.DER,
    partes: [
      {
        x: -1,
        y: -1
      }
    ]
  };

  private fruta = {
    x: -1,
    y: -1
  };

  time: number = 0;
  display;
  intervalTimer;

  constructor(private dbJuegos : JuegosService) {
    this.delegadoTeclado = this.manejadorTeclado.bind(this);
    document.addEventListener('keyup', this.delegadoTeclado, false);

    this.armarTablero();
    this.comenzarJuego();
  }

  manejadorTeclado(e) {
    this.mensajeWASD = false;
    if (e.keyCode === CONTROLES.IZQ && this.serpiente.direction !== CONTROLES.DER) {
      this.direccion = CONTROLES.IZQ;
    } 
    else if (e.keyCode === CONTROLES.ARR && this.serpiente.direction !== CONTROLES.AB) {
      this.direccion = CONTROLES.ARR;
    } 
    else if (e.keyCode === CONTROLES.DER && this.serpiente.direction !== CONTROLES.IZQ) {
      this.direccion = CONTROLES.DER;
    } 
    else if (e.keyCode === CONTROLES.AB && this.serpiente.direction !== CONTROLES.ARR) {
      this.direccion = CONTROLES.AB;
    }
    else{
      this.mensajeWASD = true;
    }
  }

  manejadorTecladoMobile(keyCode) {
    if (keyCode === CONTROLES.IZQ && this.serpiente.direction !== CONTROLES.DER) {
      this.direccion = CONTROLES.IZQ;
    } 
    else if (keyCode === CONTROLES.ARR && this.serpiente.direction !== CONTROLES.AB) {
      this.direccion = CONTROLES.ARR;
    } 
    else if (keyCode === CONTROLES.DER && this.serpiente.direction !== CONTROLES.IZQ) {
      this.direccion = CONTROLES.DER;
    } 
    else if (keyCode === CONTROLES.AB && this.serpiente.direction !== CONTROLES.ARR) {
      this.direccion = CONTROLES.AB;
    }
  }

  ponerColores(col: number, row: number): string {
    if (this.perdio) {
      return COLORES.GAME_OVER;
    } 
    else if (this.fruta.x === row && this.fruta.y === col) {
      return COLORES.FRUTA;
    } 
    else if (this.serpiente.partes[0].x === row && this.serpiente.partes[0].y === col) {
      return COLORES.CABEZA;
    } 
    else if (this.tablero[col][row] === true) {
      return COLORES.CUERPO;
    }

    return COLORES.TABLERO;
  };

  cambiarPosicion(): void {
    let nuevaCabeza = this.reponerCabeza();
    let jugador = this;

    this.moverse(nuevaCabeza);

    if (this.chocarCuerpo(nuevaCabeza)) {
      return this.perder();
    }
    else if (this.chocarFruta(nuevaCabeza)) {
      this.comerFruta();
    }

    let colaVieja = this.serpiente.partes.pop();
    this.tablero[colaVieja.y][colaVieja.x] = false;

    this.serpiente.partes.unshift(nuevaCabeza);
    this.tablero[nuevaCabeza.y][nuevaCabeza.x] = true;

    this.serpiente.direction = this.direccion;

    setTimeout(() => {
      jugador.cambiarPosicion();
    }, this.interval);
  }

  reponerCabeza(): any {
    let nuevaCabeza = Object.assign({}, this.serpiente.partes[0]);

    if (this.direccion === CONTROLES.IZQ) {
      nuevaCabeza.x -= 1;
    } else if (this.direccion === CONTROLES.DER) {
      nuevaCabeza.x += 1;
    } else if (this.direccion === CONTROLES.ARR) {
      nuevaCabeza.y -= 1;
    } else if (this.direccion === CONTROLES.AB) {
      nuevaCabeza.y += 1;
    }

    return nuevaCabeza;
  }

  moverse(pos: any): void {
    if (pos.x === TAM_TABLERO) {
      pos.x = 0;
    } 
    else if (pos.x === -1) {
      pos.x = TAM_TABLERO - 1;
    }

    if (pos.y === TAM_TABLERO) {
      pos.y = 0;
    } 
    else if (pos.y === -1) {
      pos.y = TAM_TABLERO - 1;
    }
  }

  chocarCuerpo(pos: any): boolean {
    return this.tablero[pos.y][pos.x] === true;
  }

  chocarFruta(pos: any): boolean {
    return pos.x === this.fruta.x && pos.y === this.fruta.y;
  }

  reiniciarFruta(): void {
    let x;
    let y;

    do{
      x = this.traerNumeroRandom();
      y = this.traerNumeroRandom();
    }
    while (this.tablero[y][x] === true);

    this.fruta = {
      x: x,
      y: y
    };
  }

  comerFruta(): void {
    this.puntos+=15;

    let cola = Object.assign({}, this.serpiente.partes[this.serpiente.partes.length - 1]);

    this.serpiente.partes.push(cola);
    this.reiniciarFruta();

    if (this.puntos % 5 === 0) {
      this.interval -= 5;
    }
  }

  perder(): void {
    this.perdio = true;
    this.jugando = false;
    let me = this;

    if(this.puntos != 0){
      let fechaTermino = Date.now();
      let tiempoTardado = fechaTermino - this.fecha;
      this.dbJuegos.guardarPartidaSnake(tiempoTardado, this.puntos);
    }

    this.pauseTimer();
    this.armarTablero();
  }

  traerNumeroRandom(): any {
    return Math.floor(Math.random() * TAM_TABLERO);
  }

  armarTablero(): void {
    this.tablero = [];

    for (let i = 0; i < TAM_TABLERO; i++) {
      this.tablero[i] = [];
      for (let j = 0; j < TAM_TABLERO; j++) {
        this.tablero[i][j] = false;
      }
    }
  }


  comenzarJuego(): void {
    console.log("entra");
    this.jugando = true;
    this.puntos = 0;
    this.direccion = CONTROLES.DER;
    this.perdio = false;
    this.interval = 200;
    this.serpiente = {
      direction: CONTROLES.DER,
      partes: []
    };

    for (let i = 0; i < 3; i++) {
      this.serpiente.partes.push({ x: 8 + i, y: 8 });
    }

    this.reiniciarFruta();
    this.cambiarPosicion();
    this.reiniciarTimer();
    this.fecha = Date.now(); 
  }

  
  reiniciarTimer(){
    this.pauseTimer();
    this.time = 0;
    this.startTimer();
  }

  startTimer() {
    this.intervalTimer = setInterval(() => {
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
    clearInterval(this.intervalTimer);
  }
}