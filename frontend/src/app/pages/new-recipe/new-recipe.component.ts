import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { INewRecipe } from 'src/app/shared/interfaces/INewRecipe';
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
  }

  get fc() {
    return this.recipeForm.controls;
  }

  submit() {
    this.isSubmitted = true;

    if (this.recipeForm.invalid) return;

    const fv = this.recipeForm.value;
    const newRecipe: INewRecipe = {
      nomeDaReceita: fv.nomeDaReceita,
      quemMandou: fv.quemMandou,
      ingredientes: fv.ingredientes,
      modoDeFazer: fv.modoDeFazer,
      foto: fv.foto,
      fotoAutor: fv.fotoAutor,
      categoria: fv.categoria,
      subcategoria: fv.subcategoria,
      tempoDePreparo: fv.tempoDePreparo,
      porcoes: fv.porcoes + 'porções',
      nivelDeDificuldade: fv.nivelDeDificuldade,
      stars: 0,
      favorite: false,
      extra: fv.extra,
    };

    this.recipeService.newRecipe(newRecipe).subscribe((_) => {
      this.router.navigateByUrl(this.returnUrl);
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
