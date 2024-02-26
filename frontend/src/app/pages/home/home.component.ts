import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.responsive.component.css'],
})
export class HomeComponent implements OnInit {
  numberOfRecipes: number[] = [1, 2, 3];
  recipes: Recipe[] = [];
  recipesAll: Recipe[] = [];
  recipebyId!: Recipe | any;

  constructor(
    activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    let recipeObservable: Observable<Recipe[]>;
    recipeObservable = this.recipeService.getAll();
    recipeObservable.subscribe((serverRecipe) => {
      this.recipesAll = serverRecipe;
      this.randomRecipes(this.recipesAll.length);
    });
  }

  ngOnInit(): void {}

  fetchRecipesByIds() {
    this.numberOfRecipes.forEach((id) => {
      console.log(this.recipesAll);
      this.recipes.push(this.recipesAll[id]);
    });
  }

  randomRecipes(maxNumber: number) {
    const selectedRecipes = new Set<number>();

    while (selectedRecipes.size < 8) {
      let randomNumber: number = Math.floor(Math.random() * maxNumber);
      selectedRecipes.add(randomNumber);
    }
    this.numberOfRecipes = Array.from(selectedRecipes);
    this.fetchRecipesByIds();
  }
}
