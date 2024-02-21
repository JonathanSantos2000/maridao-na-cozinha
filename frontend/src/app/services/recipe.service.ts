import { Injectable } from '@angular/core';
import { Category, Recipe } from '../shared/models/recipe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importar o operador map
import {
  CATEGORY_NAME_URL,
  CATEGORY_URL,
  RECIPE_CATEGORY_SUBCATEGORY_URL,
  RECIPE_CATEGORY_URL,
  RECIPE_ID_URL,
  RECIPE_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  /* Pegar todas as receitas */
  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(RECIPE_URL);
  }

  /* Filtrar por id */
  getRecipebyId(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(
      `${RECIPE_ID_URL.replace(':id', id.toString())}`
    );
  }

  /* Filtrar por categoria */
  getAllRecipeByCategory(category: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${RECIPE_CATEGORY_URL.replace(':categoria', category)}`
    );
  }

  /* Pegar todas as categorias */
  getAllCategoryRecipe(): Observable<Category[]> {
    return this.http.get<Category[]>(CATEGORY_URL);
  }

  /* Filtrar categorias pelo nome */
  getAllCategoryRecipeByName(category: string): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${CATEGORY_NAME_URL.replace(':categoria', category)}`
    );
  }

  /* Filtrar receita por categoria e sub categoria */
  getAllRecipeBySubCategory(
    category: string,
    subCategory: string
  ): Observable<Recipe[]> {
    const url = `${RECIPE_CATEGORY_SUBCATEGORY_URL.replace(
      ':categoria',
      category
    ).replace(':subcategoria', subCategory)}`;  

    return this.http.get<Recipe[]>(url);
  }

  /* Filtrar 5 receitas aleatorias de uma categoria */
  getFiveRecipes(category: string): Observable<Recipe[]> {
    return this.getAllRecipeByCategory(category).pipe(
      map((recipes: Recipe[]) => this.shuffleArray(recipes).slice(0, 5))
    );
  }

  // Função para embaralhar um array
  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
