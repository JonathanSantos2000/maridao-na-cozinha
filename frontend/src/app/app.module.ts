import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { FooterBoxComponent } from './components/footer-box/footer-box.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { CardRecipeComponent } from './components/card-recipe/card-recipe.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { InputGroupComponent } from './components/form/input-group/input-group.component';
import { InputValidationComponent } from './components/form/input-validation/input-validation.component';
import { TextInputComponent } from './components/form/text-input/text-input.component';
import { NewRecipeComponent } from './pages/new-recipe/new-recipe.component';
import { PerfilPageComponent } from './pages/perfil-page/perfil-page.component';
import { RequestRecipePageComponent } from './pages/request-recipe-page/request-recipe-page.component';
import { UserPhotosComponent } from './components/perfil/user-photos/user-photos.component';
import { AdminPhotosComponent } from './components/perfil/admin-photos/admin-photos.component';
import { UserRecipesComponent } from './components/perfil/user-recipes/user-recipes.component';
import { AdminRecipesComponent } from './components/perfil/admin-recipes/admin-recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuBarComponent,
    FooterBoxComponent,
    CategoriaComponent,
    CardRecipeComponent,
    RecipeComponent,
    CarouselComponent,
    LoginPageComponent,
    RegisterPageComponent,
    InputGroupComponent,
    InputValidationComponent,
    TextInputComponent,
    NewRecipeComponent,
    PerfilPageComponent,
    RequestRecipePageComponent,
    AdminRecipesComponent,
    AdminPhotosComponent,
    UserRecipesComponent,
    UserPhotosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
