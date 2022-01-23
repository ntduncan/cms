import { Component, OnInit, Input } from '@angular/core';
import {Message} from '../Messages.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() messages: Message[] = [
    new Message('1', 'Test Message', "This is a test message", "Nate"),
    new Message('2', 'Test Message', "This is another test message", "Charles"),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
