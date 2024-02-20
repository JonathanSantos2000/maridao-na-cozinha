import { Component } from '@angular/core';

@Component({
  selector: 'app-form-recipe',
  templateUrl: './form-recipe.component.html',
  styleUrl: './form-recipe.component.css',
})
export class FormRecipeComponent {
  nomeExtra: string = '';
  ingredientesExtra: string[] = [];
  modoDeFazerExtra: string = '';

  extras: any[] = [];

  openModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  saveExtra() {
    const novoExtra = {
      nome: this.nomeExtra,
      ingredientes: this.ingredientesExtra,
      modoDeFazer: this.modoDeFazerExtra,
    };

    this.extras.push(novoExtra);

    this.nomeExtra = '';
    this.ingredientesExtra = [];
    this.modoDeFazerExtra = '';

    this.closeModal();
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  removeExtra(index: number) {
    this.extras.splice(index, 1);
  }
}
