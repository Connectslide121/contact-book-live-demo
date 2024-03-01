import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Contact } from '../../models/contacts';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css',
})
export class ContactCardComponent {
  @Input() showConfirmDelete: boolean = false;
  @Input() contact!: Contact;
  @Output() contactEdited = new EventEmitter<Contact>();
  @Output() contactDeleted = new EventEmitter<Contact>();

  form: FormGroup = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    company: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true }),
    comment: new FormControl('', { nonNullable: true }),
    contacted: new FormControl(false, { nonNullable: false }),
  });

  ngOnInit() {
    if (this.contact) {
      this.form.controls['name'].setValue(this.contact.name);
      this.form.controls['company'].setValue(this.contact.company);
      this.form.controls['email'].setValue(this.contact.email);
      this.form.controls['phone'].setValue(this.contact.phone);
      this.form.controls['comment'].setValue(this.contact.comment);
    }
  }

  changeEditing(contact: Contact, editing: boolean) {
    this.form.controls['name'].setValue(this.contact.name);
    this.form.controls['company'].setValue(this.contact.company);
    this.form.controls['email'].setValue(this.contact.email);
    this.form.controls['phone'].setValue(this.contact.phone);
    this.form.controls['comment'].setValue(this.contact.comment);

    contact.editing = editing;
  }

  editContact() {
    const updatedContact: Contact = this.form.value;
    updatedContact.id = this.contact.id;
    this.contactEdited.emit(updatedContact);
  }

  showConfirmDeleteDialog() {
    this.showConfirmDelete = true;
  }

  deleteContact() {
    this.contactDeleted.emit(this.contact);
  }
}
