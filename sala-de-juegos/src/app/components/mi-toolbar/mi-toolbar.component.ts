import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item';
import { ItemsToolbarService } from "../../services/items-toolbar.service";

@Component({
  selector: 'app-mi-toolbar',
  templateUrl: './mi-toolbar.component.html',
  styleUrls: ['./mi-toolbar.component.css']
})
export class MiToolbarComponent implements OnInit {

  menuItems: MenuItem[] = this.items.menuItems;

  constructor(private items : ItemsToolbarService) { 
  }

  ngOnInit(): void {
    
  }

}
