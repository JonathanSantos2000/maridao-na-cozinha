import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { GET_PHOTO_URL } from 'src/app/shared/constants/urls';
import { NewRecipe } from 'src/app/shared/models/newRecipe';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-admin-recipes',
  templateUrl: './admin-recipes.component.html',
  styleUrls: ['./admin-recipes.component.css'],
})

export class AdminRecipesComponent implements OnInit {
  startUrl: string = `${GET_PHOTO_URL}/`;

  userNewRecipes: NewRecipe[] = [];
  status: string = 'Verificando';
  user!: User;

  hasRecipe: boolean = false;

  showRecipes: boolean = false;
  showRecipesBtnShow: boolean = true;
  showRecipesBtnHide: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private recipeService: RecipeService
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;

      if (this.user instanceof User && Object.keys(this.user).length === 0) {
        window.location.href = '/login';
      }

      this.userService.getRecipesByStatus(this.status).subscribe(
        (recipes) => {
          this.userNewRecipes = recipes;
          this.hasRecipes();
        },
        (error) => {
          console.error('Erro ao obter as recipes dos usuários:', error);
        }
      );
    });
  }
  ngOnInit(): void {}
  hasRecipes() {
    if (this.userNewRecipes.length > 0) {
      this.hasRecipe = true;
    } else {
      this.hasRecipe = false;
    }
    console.log(this.hasRecipe);
  }

  showRecipesList(status: string) {
    this.userService.getRecipesByStatus(status).subscribe(
      (recipe) => {
        this.userNewRecipes = recipe;
        this.hasRecipes();
      },
      (error) => {
        console.error('Erro ao obter fotos do usuário:', error);
      }
    );
  }

  showRecipesContent() {
    this.showRecipes = !this.showRecipes;
    this.showRecipesBtnShow = !this.showRecipesBtnShow;
    this.showRecipesBtnHide = !this.showRecipesBtnHide;
  }
}
