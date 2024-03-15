import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NewRecipeComponent } from './pages/new-recipe/new-recipe.component';
import { PerfilPageComponent } from './pages/perfil-page/perfil-page.component';
import { RequestRecipePageComponent } from './pages/request-recipe-page/request-recipe-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'categoria/:categoria',
    component: CategoriaComponent,
  },
  {
    path: 'categoria/:categoria/recipe/:id',
    component: RecipeComponent,
  },
  {
    path: 'categoria/:categoria/subcategoria/:subCategory',
    component: CategoriaComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'registro',
    component: RegisterPageComponent,
  },
  {
    path: 'perfil',
    component: PerfilPageComponent,
  },
  {
    path: 'send/recipe',
    component: NewRecipeComponent,
  },
  {
    path: 'request/:id',
    component: RequestRecipePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
