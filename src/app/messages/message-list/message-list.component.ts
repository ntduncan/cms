import { Component, OnInit, Input } from '@angular/core';
import {Message} from '../Messages.model';
import {MessageService} from '../../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {

    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    })
    this.messages = this.messageService.getMessages();
  }
}
