import { Component, Input, OnInit } from '@angular/core';
import { GET_PHOTO_URL } from 'src/app/shared/constants/urls';

@Component({
  selector: 'app-card-recipe',
  templateUrl: './card-recipe.component.html',
  styleUrls: [
    './card-recipe.component.css',
    './card-recipe.responsive.component.css',
  ],
})
export class CardRecipeComponent implements OnInit {
  @Input()
  titleReceita: string = '';
  @Input()
  urlImg: string = '';

  @Input()
  typeCategoria: string = '';

  @Input()
  idRecipe: string = '';

  startUrl: string = `${GET_PHOTO_URL}/`;

  constructor() {}

  ngOnInit(): void {}
}
