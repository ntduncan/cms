import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contacts/contact.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   private contacts: Contact [] =[];
   public contactListChangedEvent = new Subject<Contact[]>();
   public maxId: number;

   constructor(public http: HttpClient) {
      this.maxId = this.getMaxId();
   }

   addContact(newContact: Contact) {
    if(!newContact) return;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
    newContact,
    { headers: headers })
    .subscribe(
      (responseData) => {
        this.contacts.push(responseData.contact);
      }
      );
    this.contactListChangedEvent.next(this.contacts.slice())
   }

   getContacts(): Contact[] {
    this.http
    .get("http://localhost:3000/contacts")
    .subscribe((response: Response) => {
      
      this.contacts = response["contacts"];

      this.maxId = this.getMaxId();

      this.contacts.sort((a, b)=> {
        return a.name > b.name ? 1: b.name > a.name ? -1 : 0;
      })
      this.contactListChangedEvent.next(this.contacts.slice());
    })
    return this.contacts;
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
    // newContact._id = originalContact._id;
    this.contacts[pos] = newContact;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          // this.sortAndSend();
        }
      );

    this.contactListChangedEvent.next(this.contacts.slice());

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