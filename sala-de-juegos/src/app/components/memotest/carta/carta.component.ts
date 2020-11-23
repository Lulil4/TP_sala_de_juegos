import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carta',
  template: `
  <button mat-raised-button [color]="cartaElegida.colorJugador" [disabled]="bloqueoPropio">
  <img src="https://thumbs.dreamstime.com/b/dachshund-sausage-dog-reading-newspaper-magazine-isolated-white-background-question-mark-dog-104207739.jpg" *ngIf="!cartaElegida.colorJugador" >
  <img [src]="cartaElegida.foto" *ngIf="cartaElegida.colorJugador" >
  </button>
`,
styles: ['button{pointer:click; border-radius:2vw;} img{ width: 100%; height: 80%; border-radius:2vw;} } @media (max-width: 500px) { button{padding-left:1px;}}']
})
export class CartaComponent implements OnInit{

  @Input() cartaElegida;

  @Input() bloqueoPropio : boolean;

  ngOnInit(){
  }
}
