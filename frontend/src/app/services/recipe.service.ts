import { Injectable } from '@angular/core';
import { Recipe } from '../shared/models/recipe';
import { recipe_foods } from '../data/recipe';

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
    return this.getAll().filter((recipe) => recipe.Categoria.toLocaleLowerCase().includes(category.toLocaleLowerCase()));
  }
}
