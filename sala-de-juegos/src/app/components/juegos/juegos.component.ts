import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  hide : boolean = false;

  constructor() { 
    this.hide = false;}

  ngOnInit(): void {
    this.hide = false;

  }

  ocultarGrid(){
    this.hide = true;
  }
}
