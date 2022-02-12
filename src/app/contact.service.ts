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
    //  .sort((a,b) => { return a.name > b.name > 1 : b.name ? a.name ? -1 : 0})
   }

   getContact(id: string): Contact {
     const contact = this.contacts.find(contact => contact.id === id)
     return contact !== undefined ? contact : null;
   }

   deleteContact(contact: Contact) {
     if(this.contacts.includes(contact)){
       this.contacts.splice(this.contacts.indexOf(contact), 1);
     }
   }
}