import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cuadro',
  template: `
  <button [disabled]="bloqueado" mat-raised-button color="accent" *ngIf="!value"></button>
  <button [disabled]="bloqueado" mat-raised-button color="accent" *ngIf="value == '1'">♥</button>
  <button [disabled]="bloqueado" mat-raised-button color="accent" *ngIf="value == '2'">★</button>
`,
styles: ['button { width: 100%; height: 100%; font-size: 10vw !important; } @media (max-width: 500px) { button{padding-left:1px;}}']
})
export class CuadroComponent {
  
  @Input() value: '1' | '2';

  @Input() bloqueado: boolean;
}
