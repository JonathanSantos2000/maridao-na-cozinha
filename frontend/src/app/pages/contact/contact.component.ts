import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  formContact: boolean = false;
  formRecipe: boolean = false;

  ngOnInit(): void {}

  showHideFormContact() {
    this.formContact = !this.formContact;
  }

  showHideFormRecipe() {
    this.formRecipe = !this.formRecipe;
  }
}
