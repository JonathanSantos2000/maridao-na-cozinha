import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { ContactComponent } from './pages/contact/contact.component';

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
    path: 'contato',
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
