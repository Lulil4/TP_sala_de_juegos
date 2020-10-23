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

  constructor() {}

  ngOnInit() {
    this.nuevoJuego();
  }

  nuevoJuego() {
    this.cuadros = Array(9).fill(null);
    this.ganador = null;
    this.turnoUno = true;
    this.bloqueoTurnos = false;
  }

  get jugador() {
    return this.turnoUno ? '1' : '2';
  }

  turnoUsuario(iCuadro: number) {
    if (!this.cuadros[iCuadro]) {
      this.cuadros.splice(iCuadro, 1, this.jugador);
      this.turnoUno = !this.turnoUno;
    }

    this.ganador = this.verResultado();

    if (this.ganador != null){
      this.bloqueoTurnos = true;
    }
  }

  verResultado() {
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
      if (
        this.cuadros[a] &&
        this.cuadros[a] === this.cuadros[b] &&
        this.cuadros[a] === this.cuadros[c]
      ) {
        retorno = this.cuadros[a];
      }
    }
    return retorno;
  }
}
