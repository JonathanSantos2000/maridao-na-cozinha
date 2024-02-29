import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
