import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { GET_PHOTO_URL } from 'src/app/shared/constants/urls';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-perfil-page',
  templateUrl: './perfil-page.component.html',
  styleUrl: './perfil-page.component.css',
})
export class PerfilPageComponent implements OnInit {
  userPhotos: any[] = [];
  userNewRecipes: any[] = [];
  user!: User;
  startUrl: string = `${GET_PHOTO_URL}/`;
  status: string = 'Verificando';
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
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
    if (this.user.isAdmin) {
      this.userService.getPhotosbyStatus(this.status).subscribe(
        (photos) => {
          this.userPhotos = photos;
        },
        (error) => {
          console.error('Erro ao obter fotos do usuário:', error);
        }
      );
    } else {
      this.userService.getPhotosByUser(this.user.id).subscribe(
        (photos) => {
          this.userPhotos = photos;
        },
        (error) => {
          console.error('Erro ao obter fotos do usuário:', error);
        }
      );
    }
    if (this.user.isAdmin) {
    } else {
      this.userService.getNewRecipeByUser(this.user.email).subscribe(
        (recipe) => {
          this.userNewRecipes = recipe;
        },
        (error) => {
          console.error('Erro ao obter Receitas do usuário:', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

  get isAdm() {
    return this.user.isAdmin;
  }

  approve(idPhoto: string, url: string, nomeRecipe: string, user: string) {
    console.log('btn clicado');
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

  denie() {}
}
