import { Component, OnInit } from '@angular/core';
import {Message} from "./Messages.model";

@Component({
  selector: 'cms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

 
  constructor() { }

  ngOnInit(): void {
  }

}
