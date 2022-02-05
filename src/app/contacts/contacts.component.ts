import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import {Contact } from './contact.model'

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  selectedContact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.contactEmitter.subscribe((contact: Contact) => { //you have to subscribe to recieve the emission
      this. selectedContact = contact;
    })
  }

}
