import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { GET_PHOTO_URL } from 'src/app/shared/constants/urls';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.component.html',
  styleUrl: './user-photos.component.css',
})
export class UserPhotosComponent implements OnInit {
  startUrl: string = `${GET_PHOTO_URL}/`;
  userPhotos: any[] = [];

  user!: User;

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };
  constructor(
    private router: Router,
    private userService: UserService,
    private recipeService: RecipeService
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;

      if (this.user instanceof User && Object.keys(this.user).length === 0) {
        window.location.href = '/login';
      }
    });
    this.userService.getPhotosByUser(this.user.id).subscribe(
      (photos) => {
        this.userPhotos = photos;
      },
      (error) => {
        console.error('Erro ao obter fotos do usuário:', error);
      }
    );
  }
  ngOnInit(): void {}
}
