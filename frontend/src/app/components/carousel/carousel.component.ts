import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  recipesCarne: Recipe[] = [];
  recipesAves: Recipe[] = [];
  recipesDoMar: Recipe[] = [];
  recipesDoces: Recipe[] = [];
  recipesMassas: Recipe[] = [];
  recipesBebidas: Recipe[] = [];
  recipesSopas: Recipe[] = [];
  recipesTemMais: Recipe[] = [];

  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
  };

  constructor(private recipeService: RecipeService) {
    let recipesCarneObservable: Observable<Recipe[]>;
    let recipesAvesObservable: Observable<Recipe[]>;
    let recipesDoMarObservable: Observable<Recipe[]>;
    let recipesDocesObservable: Observable<Recipe[]>;
    let recipesMassasObservable: Observable<Recipe[]>;
    let recipesBebidasObservable: Observable<Recipe[]>;
    let recipesSopasObservable: Observable<Recipe[]>;
    let recipesTemMaisObservable: Observable<Recipe[]>;

    recipesCarneObservable = this.recipeService.getFiveRecipes('Carne');
    recipesAvesObservable = this.recipeService.getFiveRecipes('Aves');
    recipesDoMarObservable = this.recipeService.getFiveRecipes('Do Mar');
    recipesDocesObservable = this.recipeService.getFiveRecipes('Doces');
    recipesMassasObservable = this.recipeService.getFiveRecipes('Massas');
    recipesBebidasObservable = this.recipeService.getFiveRecipes('Bebidas');
    recipesSopasObservable = this.recipeService.getFiveRecipes('Sopas');
    recipesTemMaisObservable = this.recipeService.getFiveRecipes('Tem +');

    recipesCarneObservable.subscribe((serverRecipe) => {
      this.recipesCarne = serverRecipe;
    });
    recipesAvesObservable.subscribe((serverRecipe) => {
      this.recipesCarne = serverRecipe;
    });
    recipesDoMarObservable.subscribe((serverRecipe) => {
      this.recipesCarne = serverRecipe;
    });
    recipesDocesObservable.subscribe((serverRecipe) => {
      this.recipesCarne = serverRecipe;
    });
    recipesMassasObservable.subscribe((serverRecipe) => {
      this.recipesCarne = serverRecipe;
    });
    recipesBebidasObservable.subscribe((serverRecipe) => {
      this.recipesCarne = serverRecipe;
    });
    recipesSopasObservable.subscribe((serverRecipe) => {
      this.recipesCarne = serverRecipe;
    });
    recipesTemMaisObservable.subscribe((serverRecipe) => {
      this.recipesCarne = serverRecipe;
    });
  }

  ngOnInit(): void {}
}
