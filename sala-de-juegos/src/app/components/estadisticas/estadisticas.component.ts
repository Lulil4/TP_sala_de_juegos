import { Component, OnInit } from '@angular/core';
import { JuegosService } from "../../services/juegos.service";

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  partidasPiedrapapelotijeras = new Array(); 
  est_piedrapapelotijeras = new Array();
  partidasTateti = new Array();
  est_tateti = new Array();
  partidasMemotest = new Array();
  est_memotest = new Array();
  partidasAdivinarElNumero = new Array();
  est_adivinarelnumero = new Array();
  listaEmails = new Array();
  spinner:boolean;

  constructor(private juegosService : JuegosService) { }

  ngOnInit(): void {
    this.traerUsuarios();
    this.traerPartidasPiedraPapelOTijeras();
    this.traerPartidasTateti();
    this.traerPartidasMemotest();
    this.traerPartidasAdivinarElNumero();
    this.spinner = true;
    setTimeout(() => {
    this.traerEstPiedraPapelOTijeras();
    this.traerEstTateti();
    this.traerEstMemotest();
    this.traerEstAdivinarElNumero();
    this.spinner = false;
    }, 2000);
  }

  traerEstAdivinarElNumero(){

    this.listaEmails.forEach(e => {
      let est: any = new Object();
      est.email = e;
      
      let contIntentos = 0; 
      let tiempo = 0;
      let cantPartidas = 0;

      this.partidasAdivinarElNumero.forEach(p => {
        if (e == p.email) {
          contIntentos += p.intentos;
          tiempo += p.tiempo;
          cantPartidas++;
        }
      });

      if (contIntentos != 0){
        est.tiempo = tiempo / cantPartidas;
        est.tiempo = this.millisToMinutesAndSeconds(est.tiempo);
        est.intentos = contIntentos / cantPartidas;
        this.est_adivinarelnumero.push(est);
      }
    });
  }

  traerPartidasAdivinarElNumero(){
      this.juegosService.traerPartidasAdivinarElNumero().subscribe(res => {
        res.forEach((p: any) => {
          this.partidasAdivinarElNumero.push(p);
        });
      });
  }

  traerEstMemotest(){
    this.listaEmails.forEach(e => {
      let est: any = new Object();
      est.resultado = null;
      est.email = e;
      
      let contIntentos = 0; 
      let contResultado = [0, 0];
      let tiempo = 0;

      this.partidasMemotest.forEach(p => {
        if (e == p.email) {
          contIntentos += p.intentos;

          if (p.resultado == "ganado") {
            contResultado[0]++;
          }
          else if (p.resultado == "perdido") {
            contResultado[1]++;
          }

          tiempo += p.tiempo;
        }
      });

      if (contResultado[0] != 0 || contResultado[1] != 0){
        let cantPartidas = contResultado[0] + contResultado[1];
        est.resultado = contResultado[0] * 100/ cantPartidas;

        est.tiempo = tiempo / cantPartidas;
        est.tiempo = this.millisToMinutesAndSeconds(est.tiempo);

        est.intentos = contIntentos / cantPartidas;
      }

      if (est.resultado != null) {
        this.est_memotest.push(est);
      }

    });
  }

  traerPartidasMemotest(){
      this.juegosService.traerPartidasMemotest().subscribe(res => {
        res.forEach((p: any) => {
          this.partidasMemotest.push(p);
        });
      });
  }

  traerEstPiedraPapelOTijeras() {
    this.listaEmails.forEach(e => {
      let est: any = new Object();
      est.resultado = null;
      est.email = e;

      let contResultado = [0, 0];
      let tiempo = 0;

      this.partidasTateti.forEach(p => {
        if (e == p.email) {
          if (p.resultado == "ganado") {
            contResultado[0]++;
          }
          else if (p.resultado == "perdido") {
            contResultado[1]++;
          }

          tiempo += p.tiempo;
        }
      });

      if (contResultado[0] != 0 || contResultado[1] != 0){
        let cantPartidas = contResultado[0] + contResultado[1];
        est.resultado = contResultado[0] * 100/ cantPartidas;

        est.tiempo = tiempo / cantPartidas;
        est.tiempo = this.millisToMinutesAndSeconds(est.tiempo);
      }

      if (est.resultado != null) {
        this.est_tateti.push(est);
      }

    });
  }

  millisToMinutesAndSeconds(ms) {
    ms = 1000*Math.round(ms/1000); // round to nearest second
    var d = new Date(ms);
    return (d.getUTCMinutes().toString() + ':' + d.getUTCSeconds().toString());
  }

  
  traerPartidasPiedraPapelOTijeras() {
      this.juegosService.traerPartidasPiedraPapelOTijeras().subscribe(res => {
        res.forEach((p: any) => {
          this.partidasPiedrapapelotijeras.push(p);
        });
      });
  }

  traerEstTateti() {
    this.listaEmails.forEach(e => {
      let est: any = new Object();
      est.arma = "TIJERAS";
      est.resultado = null;
      est.email = e;


      let contArma = [0, 0, 0];
      let contResultado = [0, 0];

      this.partidasPiedrapapelotijeras.forEach(p => {
        if (e == p.email) {
          if (p.arma == "PIEDRA") {
            contArma[0]++;
          }
          else if (p.arma == "PAPEL") {
            contArma[1]++;
          }
          else {
            contArma[2]++;
          }

          if (p.resultado == "ganado") {
            contResultado[0]++;
          }
          else if (p.resultado == "perdido") {
            contResultado[1]++;
          }

          if (contArma[0] > contArma[1] && contArma[0] > contArma[2]) {
            est.arma = "PIEDRA";
          }
          else if (contArma[1] > contArma[0] && contArma[1] > contArma[2]) {
            est.Arma = "PAPEL"
          }

        }
      });

      if (contResultado[0] != 0 || contResultado[1] != 0){
        let cantPartidas = contResultado[0] + contResultado[1];
        est.resultado = contResultado[0] * 100/ cantPartidas;
      }

      if (est.resultado != null) {
        this.est_piedrapapelotijeras.push(est);
      }

    });
  }

  traerPartidasTateti(){
    this.juegosService.traerPartidasTateti().subscribe(res => {
      res.forEach((p: any) => {
        this.partidasTateti.push(p);
      });
    });
  }

  async traerUsuarios(){
    let usersRef = this.juegosService.traerUsuarios();

    await usersRef.valueChanges().subscribe(res=>{
      res.forEach((u:any) => {
        this.listaEmails.push(u.correo);
      });
    });
  }
}
