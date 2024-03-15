import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { GET_PHOTO_URL } from 'src/app/shared/constants/urls';
import { NewRecipe } from 'src/app/shared/models/newRecipe';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-request-recipe-page',
  templateUrl: './request-recipe-page.component.html',
  styleUrls: [
    './request-recipe-page.component.css',
    './request-recipe-page.component.css',
  ],
})
export class RequestRecipePageComponent implements OnInit {
  recipes!: NewRecipe;

  user!: User;
  quemMandou!: User;
  hasExtra: boolean = false;
  startUrl: string = `${GET_PHOTO_URL}/`;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
  };

  constructor(
    private userService: UserService,
    activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    activatedRoute.params.subscribe((params) => {
      userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
        if (this.user instanceof User && Object.keys(this.user).length === 0) {
          window.location.href = '/login';
        }
      });
      if (params.id) {
        recipeService.getNewRecipeByid(params.id).subscribe((serverRecipe) => {
          this.recipes = serverRecipe;
          if (this.recipes.extra !== null) {
            this.hasExtra = true;
          }
        });
      }
    });
  }
  ngOnInit(): void {}

  getSecondColumnIndex(n: number): number {
    return Math.floor(n / 2 + 1);
  }
}
