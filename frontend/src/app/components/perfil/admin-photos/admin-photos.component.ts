import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { GET_PHOTO_URL } from 'src/app/shared/constants/urls';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-admin-photos',
  templateUrl: './admin-photos.component.html',
  styleUrl: './admin-photos.component.css',
})
export class AdminPhotosComponent implements OnInit {
  startUrl: string = `${GET_PHOTO_URL}/`;
  userPhotos: any[] = [];

  status: string = 'Verificando';

  showPhotos: boolean = false;
  showPhotoBtnShow: boolean = true;
  showPhotoBtnHide: boolean = false;

  user!: User;

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
    if (this.user.isAdmin) {
      this.userService.getPhotosByStatus(this.status).subscribe(
        (photos) => {
          this.userPhotos = photos;
        },
        (error) => {
          console.error('Erro ao obter fotos do usuário:', error);
        }
      );
    }
  }

  ngOnInit(): void {}

  showPhotoList(status: string) {
    this.status = status;

    this.userService.getPhotosByStatus(status).subscribe(
      (photos) => {
        this.userPhotos = photos;
      },
      (error) => {
        console.error('Erro ao obter fotos do usuário:', error);
      }
    );
  }

  showPhotoContent() {
    this.showPhotos = !this.showPhotos;
    this.showPhotoBtnShow = !this.showPhotoBtnShow;
    this.showPhotoBtnHide = !this.showPhotoBtnHide;
  }

  approve(idPhoto: string, url: string, nomeRecipe: string, user: string) {
    this.recipeService
      .updatePhotoStatus(idPhoto, url, 'Aprovado', nomeRecipe, user)
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          console.error('Erro ao aprovar a foto:', error);
          // Aqui você pode exibir uma mensagem de erro para o usuário, se necessário
        }
      );
  }

  denie(idPhoto: string, url: string, nomeRecipe: string, user: string) {
    this.recipeService
      .updatePhotoStatus(idPhoto, url, 'Negado', nomeRecipe, user)
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          console.error('Erro ao aprovar a foto:', error);
          // Aqui você pode exibir uma mensagem de erro para o usuário, se necessário
        }
      );
  }
}
