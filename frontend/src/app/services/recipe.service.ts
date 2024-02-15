import { Injectable } from '@angular/core';
import { Category, Recipe } from '../shared/models/recipe';
import { recipe_foods } from '../data/recipe';
import { category_recipe } from '../data/category';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}
  getAll(): Recipe[] {
    return recipe_foods;
  }
  getRecipebyId(id: number): Recipe[] {
    return this.getAll().filter((recipe) => recipe.id == id);
  }

  getAllRecipeByCategory(category: string): Recipe[] {
    return this.getAll().filter((recipe) =>
      recipe.Categoria.toLocaleLowerCase().includes(
        category.toLocaleLowerCase()
      )
    );
  }
  getAllCategoryRecipe() {
    return category_recipe;
  }

  getAllCategoryRecipeByName(category: string): Category[] {
    return this.getAllCategoryRecipe().filter((recipeCategory) =>
      recipeCategory.nomeCategory
        .toLocaleLowerCase()
        .includes(category.toLocaleLowerCase())
    );
  }

  getAllRecipeBySubCategory(category: string, subCategory: string): Recipe[] {
    return this.getAll().filter(
      (recipe) =>
        recipe.Categoria.toLocaleLowerCase() === category.toLocaleLowerCase() &&
        recipe.Subcategoria.toLocaleLowerCase() ===
          subCategory.toLocaleLowerCase()
    );
  }
}
