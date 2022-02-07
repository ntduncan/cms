import { Injectable } from '@angular/core';
import {MOCKMESSAGES} from './MOCKMESSAGES';
import {Message} from './messages/Messages.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message [] = [];

  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    return this.messages;
  }

  getMessage(id: string): Message {
    this.messages.map((message) => {
      if(message.id === id){
        return message;
      }
    })
    return null;
  }
}
