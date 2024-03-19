import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  recipesAll: Recipe[] = [];
  recipebyId!: Recipe | any;

  constructor(private recipeService: RecipeService) {
    let recipeObservable: Observable<Recipe[]>;
    recipeObservable = this.recipeService.getHomeRecipes();

    recipeObservable.subscribe((serverRecipe) => {
      this.recipes = serverRecipe;
    });
  }

  ngOnInit(): void {}
}
