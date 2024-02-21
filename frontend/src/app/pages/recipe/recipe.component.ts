import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css', './recipe.responsive.component.css'],
})
export class RecipeComponent implements OnInit {
  recipes!: Recipe | any;
  hasExtra: boolean = false;

  constructor(
    activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        recipeService.getRecipebyId(params.id).subscribe((serverRecipe) => {
          this.recipes = serverRecipe;
        });
    });
  }

  ngOnInit(): void {}

  getSecondColumnIndex(n: number): number {
    return Math.floor(n / 2 + 1);
  }
}
