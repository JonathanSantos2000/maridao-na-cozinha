import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { Category, Recipe } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: [
    './categoria.component.css',
    './categoria.resposive.component.css',
  ],
})
export class CategoriaComponent implements OnInit {
  titleCat: string = '';
  recipes: Recipe[] = [];
  category: Category[] = [];

  show: boolean = true;
  hide: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.router.paramMap.subscribe((value) => {
      let recipeObservable: Observable<Recipe[]>;
      const categoria = value.get('categoria');
      const subCategory = value.get('subCategory');
      if (categoria !== null) {
        this.titleCat = categoria;

        if (subCategory !== null) {
          recipeService
            .getAllRecipeBySubCategory(this.titleCat, subCategory)
            .subscribe((serverRecipe) => {
              this.recipes = serverRecipe;
            });
        } else {
          recipeService
            .getAllRecipeByCategory(this.titleCat)
            .subscribe((serverRecipe) => {
              this.recipes = serverRecipe;
            });
        }
        recipeService
          .getAllCategoryRecipeByName(this.titleCat)
          .subscribe((serverRecipe) => {
            this.category = serverRecipe;
          });
      }
    });
  }

  ngOnInit(): void {}

  showFilter() {
    this.show = !this.show;
    this.hide = !this.hide;
  }

  getColumnIndex(
    totalItems: number,
    numColumns: number,
    columnIndex: number
  ): number {
    const itemsPerColumn = Math.ceil(totalItems / numColumns);
    return columnIndex * itemsPerColumn;
  }
}
