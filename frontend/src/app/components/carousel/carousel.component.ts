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
  @Input()
  Type: string = '';

  isRecipe: boolean = false;
  recipesCarne: Recipe[] = [];

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  constructor(private recipeService: RecipeService) {
    let recipesCarneObservable: Observable<Recipe[]>;
    recipesCarneObservable = this.recipeService.getAllRecipeByCategory('Carne');

    recipesCarneObservable.subscribe((serverRecipe) => {
      this.recipesCarne = serverRecipe;
    });
  }

  ngOnInit(): void {
    if (this.Type === 'RecipeSend') {
      this.isRecipe = true;
    }
  }
}
