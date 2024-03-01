import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../../models/contacts';

@Component({
  selector: 'app-new-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-contact-form.component.html',
  styleUrl: './new-contact-form.component.css',
})
export class NewContactFormComponent {
  @Output() contactAdded = new EventEmitter<Contact>();

  form: FormGroup = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    company: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true }),
    comment: new FormControl('', { nonNullable: true }),
    contacted: new FormControl(false, { nonNullable: false }),
  });

  addContact() {
    var newContact: Contact = this.form.value;
    newContact.id = Math.random().toString(36).substring(2, 15);
    this.contactAdded.emit(newContact);
    this.form.reset();
  }
}
