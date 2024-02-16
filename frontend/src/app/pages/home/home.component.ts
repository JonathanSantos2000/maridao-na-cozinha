import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.responsive.component.css'],
})
export class HomeComponent implements OnInit {
  numberOfRecipes: number[] = [];
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {
    this.randomRecipes(recipeService.getAll().length);

    this.numberOfRecipes.forEach((id) => {
      this.recipes.push(...this.recipeService.getRecipebyId(id));
    });
  }

  ngOnInit(): void {}
  randomRecipes(maxNumber: number) {
    while (this.numberOfRecipes.length < 8) {
      let randomNumber: number = Math.floor(Math.random() * maxNumber) + 1;

      if (!this.numberOfRecipes.includes(randomNumber)) {
        this.numberOfRecipes.push(randomNumber);
      }
    }
  }
}
