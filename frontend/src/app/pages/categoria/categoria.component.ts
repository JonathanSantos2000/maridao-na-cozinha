import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Category, Recipe } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
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
      const categoria = value.get('categoria');
      const subCategory = value.get('subCategory');
      if (categoria !== null) {
        this.titleCat = categoria;
        if (subCategory !== null) {
          this.recipes = this.recipeService.getAllRecipeBySubCategory(
            this.titleCat,
            subCategory
          );
        } else {
          this.recipes = this.recipeService.getAllRecipeByCategory(
            this.titleCat
          );
        }
        // Move a atribuição para dentro do escopo do subscribe
        this.category = this.recipeService.getAllCategoryRecipeByName(
          this.titleCat
        );
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
