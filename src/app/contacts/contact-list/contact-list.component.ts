import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Contact } from '../contact.model';
import {ContactService} from '../../contact.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Input() contacts: Contact[];


  constructor(private contactService: ContactService, private subscription: Subscription) { 
    this.contacts = contactService.getContacts();
  }

  ngOnInit(): void {
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelected = (contact) => {
    this.contactService.contactListChangedEvent.emit(contact);
  }
}
