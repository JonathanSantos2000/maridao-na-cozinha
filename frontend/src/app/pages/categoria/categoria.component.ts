import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  titleCat: string = '';
  recipes: Recipe[] = [];

  constructor(
    private router: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.router.paramMap.subscribe((value) => {
      const categoria = value.get('categoria');
      if (categoria !== null) {
        this.titleCat = categoria;
        this.recipes = this.recipeService.getAllRecipeByCategory(this.titleCat);
      }
    });
    console.log(this.recipes[0].id);
  }

  ngOnInit(): void {}
}
