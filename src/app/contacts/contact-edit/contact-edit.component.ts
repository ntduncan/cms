import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DragDropData } from 'ng2-dnd';
import { ContactService } from 'src/app/contact.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  
  constructor(
       private contactService: ContactService,
       private router: Router,
       private route: ActivatedRoute) {
       }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      if (id === undefined || id === null) return; //Null Check

      this.originalContact = this.contactService.getContact(id);
      if (!this.originalContact) return; //Null Check

      this.editMode = true;
      this.contact = Object.assign({}, this.originalContact);

      if(this.contact?.group.length > 0){
        this.groupContacts = this.contact.group;
      }
    });
  }

  removeOneItem(e: any){
    const data = e.dragData;
    this.groupContacts = data.filter(contact=> contact.id !== data.id)
    
  }

  addToGroup(e: any){
    const data = e.dragData;
    const addedContact = new Contact(data.id, data.name, data.email, data.phone, data.imageUrl, data?.group);
    this.groupContacts.push(addedContact);
    console.log(this.groupContacts)
  }

  onCancel() {
    this.router.navigateByUrl('/contacts')
  }

  onSubmit(form: NgForm){
    const newContact = new Contact('1', form.value.name, form.value.email, form.value.phone, form.value.imageUrl, this.groupContacts);

    if (!this.editMode) {
      this.contactService.addContact(newContact);
    } else {
      this.contactService.updateContact(this.originalContact, newContact)
    }
    
    this.router.navigateByUrl('/contacts');
  }

}
