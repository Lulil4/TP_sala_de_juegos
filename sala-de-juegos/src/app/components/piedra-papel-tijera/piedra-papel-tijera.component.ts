import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit{

  puntosUsuario = 0;
  puntosPC = 0;
  seleccionUsuario: string;
  seleccionPC: string;
  accion: string;
  estado: string;

  tacticas = [
    'PIEDRA',
    'PAPEL',
    'TIJERAS'
  ];

  ngOnInit(){
  }

  turnoUsuario(tactica: string): void {
    this.seleccionUsuario = tactica;
    setTimeout( () => {
      const r = Math.floor(Math.random() * 3);
      this.seleccionPC = this.tacticas[r];
      this.verResultado();
    }, 1500);
  }

  limpiar() {
    setTimeout(() => {
      this.estado = '';
      this.seleccionUsuario = '';
      this.seleccionPC = '';
    }, 3000);
  }

  ganar(usuario, PC) {
    this.puntosUsuario ++;
    this.seleccionUsuario = usuario;
    this.seleccionPC = PC;
    this.accion = 'le gana a';
    this.estado = '. Ganaste!';
    this.limpiar();
  }


  perder(usuario, PC) {
    this.puntosPC ++;
    this.seleccionUsuario = usuario;
    this.seleccionPC = PC;
    this.accion = 'perdio ante';
    this.estado = '. Perdiste!';
    this.limpiar();
  }

  darTurno(usuario, PC) {
    this.seleccionUsuario = usuario;
    this.seleccionPC = PC;
    this.accion = ' y ';
    this.estado = ', eligieron lo mismo. Te toca';
    this.limpiar();
  }

  verResultado() {
    const seleccionUsuario = this.seleccionUsuario;
    const seleccionPC = this.seleccionPC;
    switch (seleccionUsuario + seleccionPC) {
      case 'PIEDRATIJERAS':
      case 'PAPELPIEDRA':
      case 'TIJERASPAPEL':
        this.ganar(seleccionUsuario, seleccionPC);
        break;
      case 'PIEDRAPAPEL':
      case 'TIJERASPIEDRA':
      case 'PAPELTIJERAS':
        this.perder(seleccionUsuario, seleccionPC);
        break;
      default:
        this.darTurno(seleccionUsuario, seleccionPC);
        break;
    }

  }

}
