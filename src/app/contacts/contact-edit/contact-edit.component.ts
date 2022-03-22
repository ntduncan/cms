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

  onRemoveItem(index: number){
    if(index < 0 || index > this.groupContacts?.length){
      return;
    }
    this.groupContacts.splice(index, 1);
    
  }

  addToGroup(e: any){
    const addedContact: Contact = e.dragData;
    if(this.isInvalidContact(addedContact)) return;
    this.groupContacts.push(addedContact);
    console.log(this.groupContacts)
  }

  isInvalidContact(newContact: Contact){
    if(!newContact) return true; 
    if(this.contact && newContact.id === this.contact.id) return true;
    
    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id) return true;
  }
  return false;

  }

  onCancel() {
    this.router.navigateByUrl('/contacts')
  }

  onSubmit(form: NgForm){
    const newContact = new Contact('','1', form.value.name, form.value.email, form.value.phone, form.value.imageUrl, this.groupContacts);

    if (!this.editMode) {
      this.contactService.addContact(newContact);
    } else {
      this.contactService.updateContact(this.originalContact, newContact)
    }
    
    this.router.navigateByUrl('/contacts');
  }

}
