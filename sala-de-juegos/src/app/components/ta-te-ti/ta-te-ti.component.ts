import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ta-te-ti',
  templateUrl: './ta-te-ti.component.html',
  styleUrls: ['./ta-te-ti.component.css']
})
export class TaTeTiComponent implements OnInit {

  cuadros: string[];
  turnoUno: boolean;
  ganador: string;
  bloqueoTurnos : boolean = false; 
  cont : number = 0; 
  primerTurno : boolean = true;
  bloqueoNuevoJuego : boolean = true;

  constructor() {}

  ngOnInit() {
    this.nuevoJuego();
  }

  nuevoJuego() {
    this.cuadros = Array(9).fill(null);
    this.ganador = null;
    this.turnoUno = true;
    this.bloqueoTurnos = false;
    this.cont = 0;
    this.primerTurno = true;
    this.bloqueoNuevoJuego = true;
  }

  get jugador() {
    return this.turnoUno ? '1' : '2';
  }

  turnoPC(){
    let rand = null;
    let cuadroElegido = null;

    for (let i = 0; i<1000; i++){
      rand = Math.random() * (9 - 1) + 1;
      cuadroElegido = Math.floor(rand);
      if (this.cuadros[cuadroElegido] == null){
        this.cuadros[cuadroElegido] = "2"; 
        break;
      }
    }
  }

  turnoUsuario(iCuadro: number) {
    if (this.turnoUno){
      if (!this.cuadros[iCuadro]) {
        this.bloqueoNuevoJuego = true;
        this.bloqueoTurnos = true;
        this.cuadros.splice(iCuadro, 1, this.jugador);
        this.turnoUno = !this.turnoUno;
        this.ganador = this.verResultado();
        if (this.ganador != null){
          this.bloqueoTurnos = true;
          this.bloqueoNuevoJuego = false;
        }
        if (this.cont < 9 && this.ganador == null){
          setTimeout(() => {
            this.turnoPC();
            this.turnoUno = !this.turnoUno;
            this.bloqueoTurnos = false;
            this.bloqueoNuevoJuego = false;
            this.ganador = this.verResultado();
            if (this.ganador != null){
              this.bloqueoTurnos = true;
              this.bloqueoNuevoJuego = false;
            }
          },2000); 
        }
      }
    }

  }

  verResultado() {
    this.cont++;
    let retorno = null;
      const lineas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < lineas.length; i++) {
        const [a, b, c] = lineas[i];
        if (this.cuadros[a] && this.cuadros[a] === this.cuadros[b] && this.cuadros[a] === this.cuadros[c]) {
          retorno = this.cuadros[a];
        }
      }
    
    if (this.cont == 9 && retorno == null){
      retorno = "ninguno";
    }
    return retorno;
  }
}
