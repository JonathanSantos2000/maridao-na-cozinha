import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-recipe',
  templateUrl: './card-recipe.component.html',
  styleUrls: ['./card-recipe.component.css'],
})
export class CardRecipeComponent implements OnInit {
  @Input()
  titleReceita: string = '';
  @Input()
  urlImg = '';
  constructor() {}

  ngOnInit(): void {}
}
