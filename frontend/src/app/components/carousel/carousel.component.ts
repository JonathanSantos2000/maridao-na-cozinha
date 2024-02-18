import { Component, Input, OnInit } from '@angular/core';
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
    this.recipesCarne = this.recipeService.getFiveRecipes('Carne');
    this.recipesAves = this.recipeService.getFiveRecipes('Aves');
    this.recipesDoMar = this.recipeService.getFiveRecipes('Do Mar');
    this.recipesDoces = this.recipeService.getFiveRecipes('Doces');
    this.recipesMassas = this.recipeService.getFiveRecipes('Massas');
    this.recipesBebidas = this.recipeService.getFiveRecipes('Bebidas');
    this.recipesSopas = this.recipeService.getFiveRecipes('Sopas');
    this.recipesTemMais = this.recipeService.getFiveRecipes('Tem +');
  }

  ngOnInit(): void {}
}
