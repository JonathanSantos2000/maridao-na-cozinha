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
  NEW_RECIPE_URL,
  NEW_UPLOAD_URL,
  UPDATE_PHOTO_STATUS_URL,
  GET_NEW_RECIPE_URL,
  UPDATE_NEW_RECIPE_STATUS_URL,
} from '../shared/constants/urls';
import { NewRecipe } from '../shared/models/newRecipe';
import { Foto } from '../shared/models/photos';

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

  newRecipe(
    nomeDaReceita: string,
    quemMandou: string,
    ingredientes: string[],
    modoDeFazer: string,
    file: File | any,
    fotoAutor: string,
    categoria: string,
    subcategoria: string,
    tempoDePreparo: string,
    porcoes: string,
    nivelDeDificuldade: string,
    stars: number,
    favorite: boolean,
    extra: any
  ): Observable<NewRecipe> {
    const formData = new FormData();
    formData.append('nomeDaReceita', nomeDaReceita);
    formData.append('quemMandou', quemMandou);
    formData.append('ingredientes', JSON.stringify(ingredientes));
    formData.append('modoDeFazer', modoDeFazer);
    formData.append('file', file);
    formData.append('fotoAutor', fotoAutor);
    formData.append('categoria', categoria);
    formData.append('subcategoria', subcategoria);
    formData.append('tempoDePreparo', tempoDePreparo);
    formData.append('porcoes', porcoes);
    formData.append('nivelDeDificuldade', nivelDeDificuldade);
    formData.append('stars', stars.toString());
    formData.append('favorite', favorite.toString());
    formData.append('extra', JSON.stringify(extra));

    formData.forEach((element) => {
      console.log(element);
    });

    return this.http.post<NewRecipe>(NEW_RECIPE_URL, formData);
  }

  uploadFile(
    category: string,
    recipeName: string,
    idUserSend: string,
    userSend: string,
    file: File
  ): Observable<Foto> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('category', category);
    formData.append('recipeName', recipeName);
    formData.append('userSend', userSend);
    formData.append('idUserSend', idUserSend);

    return this.http.post<Foto>(NEW_UPLOAD_URL, formData);
  }

  updatePhotoStatus(
    idPhoto: string,
    url: string,
    status: string,
    nomeDaReceita: string,
    user: string
  ): Observable<Foto> {
    const statusData = {
      idPhoto: idPhoto,
      url: url,
      status: status,
      nomeDaReceita: nomeDaReceita,
      user: user,
    };

    // Enviando a solicitação HTTP com os dados como JSON
    return this.http.post<Foto>(UPDATE_PHOTO_STATUS_URL, statusData);
  }

  getNewRecipeByid(idRecipe: string) {
    const url = `${GET_NEW_RECIPE_URL.replace(':id', idRecipe)}`;
    return this.http.get<NewRecipe>(url);
  }

  updateNewRecipeStatus(
    idNewrecipe: string,
    status: string
  ): Observable<NewRecipe> {
    const statusData = {
      idNewrecipe: idNewrecipe,
      status: status,
    };

    // Enviando a solicitação HTTP com os dados como JSON
    return this.http.post<NewRecipe>(UPDATE_NEW_RECIPE_STATUS_URL, statusData);
  }
}
