import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contacts/contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   private contacts: Contact [] =[];
   public contactEmitter = new EventEmitter<Contact>();

   constructor() {
      this.contacts = MOCKCONTACTS;
   }

   getContacts(): Contact[] {
     return this.contacts
   }

   getContact(id: string): Contact {
     this.contacts.map((contact) =>{
       if (contact.id === id) {
        return contact;
       }
     })
     return null;
   }
}