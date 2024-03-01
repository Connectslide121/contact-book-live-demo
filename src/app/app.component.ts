import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { NewContactFormComponent } from './components/new-contact-form/new-contact-form.component';
import { Contact } from './models/contacts';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { contacts } from './sampleData';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ContactCardComponent,
    NewContactFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  contactList = signal<Contact[]>(contacts);
  filteredContacts = signal<Contact[]>(this.contactList());
  count: number = this.filteredContacts().length;

  addContact(newContact: Contact) {
    this.contactList.set([newContact, ...this.contactList()]);
    this.filteredContacts.set(this.contactList());
    this.count = this.filteredContacts().length;
  }

  changeEditing(contact: Contact, editing: boolean) {
    contact.editing = editing;
  }

  editContact(updatedContact: Contact) {
    this.contactList.set(
      this.contactList().map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    this.filteredContacts.set(this.contactList());
  }

  deleteContact(contact: Contact) {
    this.contactList.set(this.contactList().filter((c) => c.id !== contact.id));
    this.filteredContacts.set(this.contactList());
    this.count = this.filteredContacts().length;
  }

  filter: FormControl = new FormControl('', { nonNullable: true });

  filterContacts() {
    this.filteredContacts.set(
      this.contactList().filter((contact) =>
        Object.values(contact).some((value) =>
          String(value).toLowerCase().includes(this.filter.value.toLowerCase())
        )
      )
    );
    this.count = this.filteredContacts().length;
    return this.filteredContacts;
  }
}
