import { Component, OnInit, OnDestroy, Input, Pipe } from '@angular/core';
import { Contact } from '../contact.model';
import {ContactService} from '../../contact.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
// @Pipe({}) 
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  subscription: Subscription;
  term: string;


  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();

      this.subscription = this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelected = (contact) => {
    // this.contactService.contactListChangedEvent.emit(contact);
  }

  search(value: string){
    this.term = value;
  }
}
