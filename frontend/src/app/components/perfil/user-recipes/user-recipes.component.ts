import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { GET_PHOTO_URL } from 'src/app/shared/constants/urls';
import { NewRecipe } from 'src/app/shared/models/newRecipe';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrl: './user-recipes.component.css',
})
export class UserRecipesComponent implements OnInit {
  startUrl: string = `${GET_PHOTO_URL}/`;
  userNewRecipes: NewRecipe[] = [];

  user!: User;

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

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
    });

    this.userService.getNewRecipeByUser(this.user.email).subscribe(
      (recipe) => {
        this.userNewRecipes = recipe;
      },
      (error) => {
        console.error('Erro ao obter Receitas do usuário:', error);
      }
    );
  }

  ngOnInit(): void {}
}
