import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    let filterContacts: Contact[] = contacts.filter(
      (contact: Contact)=> {
        contact.name.toLowerCase().includes(term.toLowerCase())
      })

      return filterContacts.length > 0 ? filterContacts : contacts;  //IF something wasy typed in to the filter then filter
    }


}

