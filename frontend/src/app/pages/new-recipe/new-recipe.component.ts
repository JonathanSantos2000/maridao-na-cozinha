import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/shared/models/recipe';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css',
})
export class NewRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl: string = '';

  user!: User;

  nomeExtra: string = '';
  ingredientesExtra: string[] = [];
  modoDeFazerExtra: string = '';
  extras: any[] = [];

  categorias: Category[] = [];
  subcategorias: string[] = [];

  fileToUpload: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      if (this.user instanceof User && Object.keys(this.user).length === 0) {
        window.location.href = '/login';
      }
    });
  }

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      nomeDaReceita: ['', Validators.required],
      quemMandou: [this.user.email, Validators.required],
      ingredientes: ['', Validators.required],
      modoDeFazer: ['', Validators.required],
      foto: ['', Validators.required],
      fotoAutor: [this.user.name, Validators.required],
      categoria: ['', Validators.required],
      extra: [this.extras],
      subcategoria: ['', Validators.required],
      tempoDePreparo: ['', Validators.required],
      porcoes: ['', Validators.required],
      nivelDeDificuldade: ['', Validators.required],
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;

    this.getAllCategories();
  }

  get fc() {
    return this.recipeForm.controls;
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files) {
      const file = files.item(0);
      if (file) {
        this.fileToUpload = new File([file], file.name, { type: file.type });
      }
    }
  }

  getAllCategories() {
    this.recipeService.getAllCategoryRecipe().subscribe(
      (categorias: Category[]) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Erro ao obter categorias:', error);
      }
    );
  }

  onCategoriaChange(event: any) {
    const valorSelecionado = event.target.value;

    this.subcategorias = [];
    this.categorias.forEach((element) => {
      if (element.nomeCategory === valorSelecionado) {
        this.subcategorias.push(
          ...element.nomeSubCategory.map((subcategoria) => subcategoria.nome)
        );
      }
    });
  }

  formatRecipeName(name: string): string {
    // Divida o nome da receita em palavras
    const words = name.toLowerCase().split(' ');

    // Capitalize a primeira letra de cada palavra
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Junte as palavras novamente em uma string
    return capitalizedWords.join(' ');
  }

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  processIngredients() {
    const ingredientes = this.recipeForm.get('ingredientes')?.value;
    const ingredientesArray = ingredientes
      .split(',')
      .map((ingrediente: string) => ingrediente.trim());
    this.recipeForm.get('ingredientes')?.setValue(ingredientesArray);
  }

  submit() {
    this.isSubmitted = true;

    if (this.recipeForm.invalid) return;

    const fv = this.recipeForm.value;
    let formattedRecipeName = this.formatRecipeName(fv.nomeDaReceita);
    formattedRecipeName = this.normalizeString(formattedRecipeName);

    const newName = `${fv.categoria}_${this.user.id}-${formattedRecipeName}_${this.fileToUpload?.name}`;

    if (this.fileToUpload) {
      this.fileToUpload = new File([this.fileToUpload], newName, {
        type: this.fileToUpload.type,
      });
    }
    
    this.processIngredients();

    this.recipeService
      .newRecipe(
        formattedRecipeName,
        fv.quemMandou,
        fv.ingredientes,
        fv.modoDeFazer,
        this.fileToUpload,
        fv.fotoAutor,
        fv.categoria,
        fv.subcategoria,
        fv.tempoDePreparo,
        fv.porcoes,
        fv.nivelDeDificuldade,
        0,
        false,
        fv.extra
      )
      .subscribe((_) => {
        window.location.reload();
      });
  }

  /* Fim Submit */
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
