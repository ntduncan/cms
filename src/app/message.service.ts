import { Injectable, EventEmitter } from '@angular/core';
import {MOCKMESSAGES} from './MOCKMESSAGES';
import {Message} from './messages/Messages.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message [] = [];
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    this.messages.map((message) => {
      if(message.id === id){
        return message;
      }
    })
    return null;
  }
  
  addMessage(message: Message): void {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
