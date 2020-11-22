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
  partidasAnagrama = new Array();
  est_anagrama = new Array();
  partidasAgilidadAritmetica = new Array();
  est_agilidadAritmetica = new Array();
  partidasSnake = new Array();
  est_snake = new Array();

  listaEmails = new Array();
  spinner: boolean;

  constructor(private juegosService: JuegosService) { }

  ngOnInit(): void {
    this.traerUsuarios();
    this.traerPartidasPiedraPapelOTijeras();
    this.traerPartidasTateti();
    this.traerPartidasMemotest();
    this.traerPartidasAdivinarElNumero();
    this.traerPartidasAnagrama();
    this.traerPartidasAgilidadAritmetica();
    this.traerPartidasSnake();

    this.spinner = true;
    setTimeout(() => {
      this.traerEstSnake();
      this.traerEstPiedraPapelOTijeras();
      this.traerEstTaTeTi();
      this.traerEstMemotest();
      this.traerEstAdivinarElNumero();
      this.traerEstAnagrama();
      this.traerEstAgilidadAritmetca();
      this.spinner = false;
    }, 2000);

    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
    }, 3000);
  }

  traerPartidasSnake(){
    this.juegosService.traerPartidasSnake().subscribe(res => {
      res.forEach((p: any) => {
        this.partidasSnake.push(p);
      });
    });
  }

  traerEstSnake(){
    this.listaEmails.forEach(e => {
      let est: any = new Object();
      est.puntajeM = 0;

      this.partidasSnake.forEach(p => {
        if (e == p.email && p.puntaje > est.puntajeM) {
          est.user = p.user;
          est.tiempo = p.tiempo;
          est.puntajeM = p.puntaje;
        }
      });

      if(est.puntajeM != 0){
        est.tiempo = this.millisToMinutesAndSeconds(est.tiempo);
        this.est_snake.push(est);
      }
    });
  }

  traerEstAdivinarElNumero() {

    this.listaEmails.forEach(e => {
      let est: any = new Object();
      est.email = e;

      let contIntentos = 0;
      let tiempo = 0;
      let cantPartidas = 0;

      this.partidasAdivinarElNumero.forEach(p => {
        if (e == p.email) {
          est.user = p.user;
          contIntentos += p.intentos;
          tiempo += p.tiempo;
          cantPartidas++;
        }
      });

      if (contIntentos != 0) {
        est.tiempo = tiempo / cantPartidas;
        est.tiempo = this.millisToMinutesAndSeconds(est.tiempo);
        est.intentos = contIntentos / cantPartidas;
        est.intentos = est.intentos.toFixed(2)
        this.est_adivinarelnumero.push(est);
      }
    });
  }

  traerPartidasAdivinarElNumero() {
    this.juegosService.traerPartidasAdivinarElNumero().subscribe(res => {
      res.forEach((p: any) => {
        this.partidasAdivinarElNumero.push(p);
      });
    });
  }

  traerEstMemotest() {
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
          est.user = p.user;

          if (p.resultado == "ganado") {
            contResultado[0]++;
          }
          else if (p.resultado == "perdido") {
            contResultado[1]++;
          }

          tiempo += p.tiempo;
        }
      });

      if (contResultado[0] != 0 || contResultado[1] != 0) {
        let cantPartidas = contResultado[0] + contResultado[1];
        est.resultado = contResultado[0] * 100 / cantPartidas;
        est.resultado = est.resultado.toFixed(2)

        est.tiempo = tiempo / cantPartidas;
        est.tiempo = this.millisToMinutesAndSeconds(est.tiempo);

        est.intentos = contIntentos / cantPartidas;
        est.intentos = est.intentos.toFixed(2)
      }

      if (est.resultado != null) {
        this.est_memotest.push(est);
      }

    });
  }

  traerPartidasMemotest() {
    this.juegosService.traerPartidasMemotest().subscribe(res => {
      res.forEach((p: any) => {
        this.partidasMemotest.push(p);
      });
    });
  }

  traerEstTaTeTi() {
    this.listaEmails.forEach(e => {
      let est: any = new Object();
      est.resultado = null;
      est.email = e;

      let contResultado = [0, 0];
      let tiempo = 0;

      this.partidasTateti.forEach(p => {
        if (e == p.email) {

          est.user = p.user;
          if (p.resultado == "ganado") {
            contResultado[0]++;
          }
          else if (p.resultado == "perdido") {
            contResultado[1]++;
          }

          tiempo += p.tiempo;
        }
      });

      if (contResultado[0] != 0 || contResultado[1] != 0) {
        let cantPartidas = contResultado[0] + contResultado[1];
        est.resultado = contResultado[0] * 100 / cantPartidas;
        est.resultado = est.resultado.toFixed(2)

        est.tiempo = tiempo / cantPartidas;
        est.tiempo = this.millisToMinutesAndSeconds(est.tiempo);
      }

      if (est.resultado != null) {
        this.est_tateti.push(est);
      }

    });
  }

  millisToMinutesAndSeconds(ms) {
    ms = 1000 * Math.round(ms / 1000); // round to nearest second
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

  traerEstPiedraPapelOTijeras() {
    this.listaEmails.forEach(e => {
      let est: any = new Object();
      est.arma = "TIJERAS";
      est.resultado = null;
      est.email = e;


      let contArma = [0, 0, 0];
      let contResultado = [0, 0];

      this.partidasPiedrapapelotijeras.forEach(p => {
        if (e == p.email) {
          est.user = p.user;
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

      if (contResultado[0] != 0 || contResultado[1] != 0) {
        let cantPartidas = contResultado[0] + contResultado[1];
        est.resultado = contResultado[0] * 100 / cantPartidas;
        est.resultado = est.resultado.toFixed(2)
      }

      if (est.resultado != null) {
        this.est_piedrapapelotijeras.push(est);
      }

    });
  }

  traerPartidasTateti() {
    this.juegosService.traerPartidasTateti().subscribe(res => {
      res.forEach((p: any) => {
        this.partidasTateti.push(p);
      });
    });
  }

  traerPartidasAnagrama() {
    this.juegosService.traerPartidasAnagrama().subscribe(res => {
      res.forEach((p: any) => {
        this.partidasAnagrama.push(p);
      });
    });
  }

  traerPartidasAgilidadAritmetica() {
    this.juegosService.traerPartidasAgilidadAritmetica().subscribe(res => {
      res.forEach((p: any) => {
        this.partidasAgilidadAritmetica.push(p);
      });
    });
  }

  traerEstAnagrama() {
    this.listaEmails.forEach(e => {
      let est: any = new Object();
      est.email = e;

      let contIntentos = 0;
      let tiempo = 0;
      let cantPartidas = 0;

      this.partidasAnagrama.forEach(p => {
        if (e == p.email) {
          contIntentos += p.intentos;
          tiempo += p.tiempo;
          cantPartidas++;
          est.user = p.user;
        }
      });

      if (contIntentos != 0) {
        est.tiempo = tiempo / cantPartidas;
        est.tiempo = this.millisToMinutesAndSeconds(est.tiempo);
        est.intentos = contIntentos / cantPartidas;
        est.intentos = est.intentos.toFixed(2)
        this.est_anagrama.push(est);
      }
    });
  }

  traerEstAgilidadAritmetca() {
    this.listaEmails.forEach(e => {
      let est: any = new Object();
      est.email = e;

      let contIntentos = 0;
      let tiempo = 0;
      let cantPartidas = 0;

      this.partidasAgilidadAritmetica.forEach(p => {
        if (e == p.email) {
          contIntentos += p.intentos;
          tiempo += p.tiempo;
          cantPartidas++;
          est.user = p.user;
        }
      });

      if (contIntentos != 0) {
        est.tiempo = tiempo / cantPartidas;
        est.tiempo = this.millisToMinutesAndSeconds(est.tiempo);
        est.intentos = contIntentos / cantPartidas;
        est.intentos = est.intentos.toFixed(2)
        this.est_agilidadAritmetica.push(est);
      }
    });
  }

  async traerUsuarios() {
    let usersRef = this.juegosService.traerUsuarios();

    await usersRef.subscribe(res => {
      res.forEach((u: any) => {
        this.listaEmails.push(u.correo);
      });
    });
  }
}
