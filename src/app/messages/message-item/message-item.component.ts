import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../Messages.model';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contact.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    // console.log(this.contactService.getContact(this.message.sender.id))
    const contact: Contact = this.contactService.getContact(this.message.sender?.id);
    this.messageSender = contact?.name;
  }
}
