import { Component, OnInit} from '@angular/core';
import { JuegosService } from "../../services/juegos.service";

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
  mostrarOpciones : boolean = true;
  mostrarEspera : boolean = false;
  
  tacticas = [
    'PIEDRA',
    'PAPEL',
    'TIJERAS'
  ];
  constructor(private juegosService : JuegosService){

  }

  ngOnInit(){
  }

  turnoUsuario(tactica: string): void {
    this.limpiar();
    this.mostrarOpciones = false;
    this.seleccionUsuario = tactica;
    setTimeout(() => {// no anda
      const r = Math.floor(Math.random() * 3);
      this.seleccionPC = this.tacticas[r];
      this.verResultado();
      this.mostrarOpciones = true;
    }, 2000);
  }
  
  limpiar() {
      this.mostrarEspera = true;
      this.estado = '';
      this.seleccionUsuario = '';
      this.seleccionPC = '';
  }

  ganar(usuario, PC) {
    this.puntosUsuario ++;
    this.seleccionUsuario = usuario;
    this.seleccionPC = PC;
    this.accion = 'le gana a';
    this.estado = '. Ganaste! Grrr';
    this.juegosService.guardarPartidaPiedraPapelOTijera(this.seleccionUsuario, "ganado");
  }


  perder(usuario, PC) {
    this.puntosPC ++;
    this.seleccionUsuario = usuario;
    this.seleccionPC = PC;
    this.accion = 'perdio ante';
    this.estado = '. A casa malo!';
    this.juegosService.guardarPartidaPiedraPapelOTijera(this.seleccionUsuario, "perdido");
  }

  darTurno(usuario, PC) {
    this.seleccionUsuario = usuario;
    this.seleccionPC = PC;
    this.accion = ' y ';
    this.estado = ', eres perro también? Te toca';
    this.juegosService.guardarPartidaPiedraPapelOTijera(this.seleccionUsuario, "empate");
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
