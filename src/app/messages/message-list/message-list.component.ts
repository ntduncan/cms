import { Component, OnInit, Input } from '@angular/core';
import {Message} from '../Messages.model';
import {MessageService} from '../../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() messages: Message[] = [];

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
