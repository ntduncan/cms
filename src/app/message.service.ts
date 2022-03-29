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
    .get("http://localhost:3000/messages")
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
    if (!message) {
      return;
    }

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // add to database
    this.http.post<{ message: Message }>('http://localhost:3000/messages',
    message,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.messages.push(responseData.message);
        // this.sortAndSend();
      }
      );
    // this.messages.push(message);
    this.messageChangedEvent.next(this.messages.slice());
  }
}
