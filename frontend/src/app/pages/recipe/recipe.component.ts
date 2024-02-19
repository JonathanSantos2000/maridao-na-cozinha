import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css', './recipe.responsive.component.css'],
})
export class RecipeComponent implements OnInit {
  recipes: Recipe[] = [];
  hasExtra: boolean = false;
  constructor(
    private router: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.router.paramMap.subscribe((value) => {
      let idS = value.get('id');
      let id: number;
      if (idS !== null) {
        id = parseInt(idS);
        this.recipes = this.recipeService.getRecipebyId(id);
      }
    });
  }

  ngOnInit(): void {
    if (this.recipes[0].Extra != null) {
      this.hasExtra = true;
    }
  }

  getSecondColumnIndex(n: number): number {
    return Math.floor(n / 2 + 1);
  }
}
