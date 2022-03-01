import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Message} from './messages/Messages.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message [] = [];
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) { 
    
  }

  getMessages(): Message[] {
    this.http
    .get("https://wdd430-fe5c9-default-rtdb.firebaseio.com/messages.json")
    .subscribe((messages: Message[]) => {
      this.messages = messages;


      this.messageChangedEvent.next(this.messages.slice());
    })
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
  
  addMessage(message: Message): void {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
