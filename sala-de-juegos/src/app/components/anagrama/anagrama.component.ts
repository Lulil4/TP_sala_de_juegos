import { Component, OnInit } from '@angular/core';
import { JuegosService } from "../../services/juegos.service";

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  palabraDesordenada:string=""; 
  palabraOrdenada:string= "";
  intentoPalabra:string= "";
  gano:boolean=false;
  error:boolean=false;
  contIntentos = 0;
  palabras = new Array();
  tiempoStart = 0;
  fotoPerro = "";
  
  constructor(private juegosService : JuegosService) { }

  ngOnInit(): void {
    this.comenzarJuego();
  }

  comenzarJuego(){  
    this.palabras.push("PASTOR");
    this.palabras.push("SHARPEI");
    this.palabras.push("GALGO");
    this.palabras.push("LABRADOR");
    this.palabras.push("WEIRMARANER");
    this.palabras.push("SIMONE");
    this.palabras.push("SALCHICHA");
    this.palabras.push("PITBULL");
    this.intentoPalabra = "";
    this.error = false;
    this.gano = false;
    this.contIntentos = 0;
    let rand = Math.random() * (9 - 0) + 0;
    let iPalabra = Math.floor(rand);
    this.tiempoStart = Date.now();

    this.palabraOrdenada = this.palabras[iPalabra];
    this.palabraDesordenada = "";
    this.desordenarPalabra();
  }

  desordenarPalabra(){
    let arrPalabraDesordenada = this.palabraOrdenada.split("");
    
    let currentIndex = arrPalabraDesordenada.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = arrPalabraDesordenada[currentIndex];
      arrPalabraDesordenada[currentIndex] = arrPalabraDesordenada[randomIndex];
      arrPalabraDesordenada[randomIndex] = temporaryValue;
    }
    
    arrPalabraDesordenada.forEach(letra => {
      this.palabraDesordenada += letra;
    });
  }

  verificarIntento(){
    this.gano = false;
    this.error = false;

    if (this.intentoPalabra != ""){
      this.contIntentos++;
      let intento = this.intentoPalabra.toUpperCase();

      if(intento == this.palabraOrdenada){
        this.gano = true;
        let tiempoFin = Date.now();
        let tiempoTardado = tiempoFin - this.tiempoStart;
        this.fotoPerro = "../../../assets/img/" + intento + ".jpg";
        this.juegosService.guardarPartidaAnagrama(tiempoTardado, this.contIntentos);
      }
      else{
        this.error = true;
      }
    }
  }
}
