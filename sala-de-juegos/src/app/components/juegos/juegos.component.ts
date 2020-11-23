import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  hide : boolean = false;
  breakpoint = 0;

  constructor() { 
    this.hide = false;}

  ngOnInit(): void {
    let cols = (window.innerWidth <= 400) ? 2 : 6;
    if (cols == 6){
      cols = (window.innerWidth <= 800) ? 3 : 7;
    }
    this.breakpoint = cols;
    this.hide = false;

  }

  ocultarGrid(){
    this.hide = true;
  }

  scrollTop(){
    window.scroll(0,0);
  }
  
  onResize(event) {
    let cols = (event.target.innerWidth <= 400) ? 2 : 6;

    if (cols == 6){
      cols = (window.innerWidth <= 800) ? 3 : 7;
    }

    this.breakpoint = cols;
  }

}
