import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() navOptionSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  routeSelection(selection: string){
    this.navOptionSelected.emit(selection)
  }
}
