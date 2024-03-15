import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { GET_PHOTO_URL } from 'src/app/shared/constants/urls';
import { Recipe } from 'src/app/shared/models/recipe';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css', './recipe.responsive.component.css'],
})
export class RecipeComponent implements OnInit {
  recipes!: Recipe;
  hasExtra: boolean = false;
  showForm: boolean = false;
  showBtnShow: boolean = true;
  showBtnHide: boolean = false;
  startUrl: string = `${GET_PHOTO_URL}/`;

  user!: User;

  fileToUpload: File | null = null;
  subscription: Subscription | undefined;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
  };

  constructor(
    private userService: UserService,
    activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    activatedRoute.params.subscribe((params) => {
      userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
      });
      if (params.id)
        recipeService.getRecipebyId(params.id).subscribe((serverRecipe) => {
          this.recipes = serverRecipe;
          if (this.recipes?.foto && this.recipes.foto.length > 1) {
            // Se houver mais de uma foto, ajuste a configuração do carrossel
            this.slideConfig = {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
              arrows: true,
            };
          }
        });
    });
  }

  ngOnInit(): void {}

  getSecondColumnIndex(n: number): number {
    return Math.floor(n / 2 + 1);
  }

  showFormContent() {
    this.showForm = !this.showForm;
    this.showBtnShow = !this.showBtnShow;
    this.showBtnHide = !this.showBtnHide;
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files && this.recipes) {
      const file = files.item(0);
      if (file) {
        const category = this.recipes.categoria;
        const userSend = this.user.id;
        let recipeName = this.recipes.nomeDaReceita;
        recipeName = this.normalizeString(recipeName); // Normalizando o nome da receita
        const fileName = `${category}_${userSend}-${recipeName}_${file.name}`; // Modificando o nome do arquivo
        this.fileToUpload = new File([file], fileName, { type: file.type });
      }
    }
  }

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  uploadFile() {
    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      if (this.user instanceof User && Object.keys(this.user).length === 0) {
        window.location.href = '/login';
      } else {
        if (this.fileToUpload) {
          const category = this.recipes.categoria;
          const recipeName = this.recipes.nomeDaReceita;
          // Movendo esta parte do código para dentro do bloco subscribe
          if (this.user) {
            // Certifique-se de que this.user não é nulo
            const idUserSend = this.user.id;
            const userSend = this.user.name;

            this.subscription = this.recipeService
              .uploadFile(
                category,
                recipeName,
                idUserSend,
                userSend,
                this.fileToUpload
              )
              .subscribe({
                next: (response) => {
                  console.log('File uploaded successfully:', response);
                  // Aqui você pode lidar com a resposta do servidor, como atualizar a interface do usuário com a nova imagem carregada
                },
                error: (error) => {
                  console.error('Error uploading file:', error);
                  // Aqui você pode lidar com erros, como exibir uma mensagem de erro para o usuário
                },
              });
          } else {
            console.error('User information is not available');
            // Aqui você pode lidar com o caso em que as informações do usuário não estão disponíveis
          }
        } else {
          console.error('No file selected');
          // Aqui você pode lidar com o caso em que nenhum arquivo é selecionado
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
