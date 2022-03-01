import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contacts/contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   private contacts: Contact [] =[];
   public contactListChangedEvent = new Subject<Contact[]>();
   public maxId: number;

   constructor() {
      this.contacts = MOCKCONTACTS;
      this.maxId = this.getMaxId();
   }

   addContact(newContact: Contact) {
    if(!newContact) return;

    this.maxId += 1;
    newContact.id = this.maxId.toString();
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone)
   }

   getContacts(): Contact[] {
     return this.contacts//.sort((a,b) => { return a.name > b.name > 1 : b.name ? a.name ? -1 : 0})
   }

   getContact(id: string): Contact {
     const contact = this.contacts.find(contact => contact.id === id)
     return contact !== undefined ? contact : null;
   }

   updateContact(originalContact: Contact, newContact: Contact){
     if(!originalContact || !newContact) return;

    const pos = this.contacts.indexOf(originalContact);
    if(pos < 0) return; //Null check

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;

    const contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);

   }

   deleteContact(contact: Contact) {
     if(this.contacts.includes(contact)){
       this.contacts.splice(this.contacts.indexOf(contact), 1);
       const contactListClone = this.contacts.slice();
       this.contactListChangedEvent.next(contactListClone); //This is super important

     }
   }

   getMaxId(): number {
    let maxId = 0;

    this.contacts.map((contact: Contact) => {
      const currentId = parseInt(contact.id);
      if (currentId > maxId) maxId = currentId;
    });
    return maxId;
  }
}