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
import { FormRecipeComponent } from './components/form-recipe/form-recipe.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { InputGroupComponent } from './components/form/input-group/input-group.component';
import { InputValidationComponent } from './components/form/input-validation/input-validation.component';
import { TextInputComponent } from './components/form/text-input/text-input.component';
import { NewRecipeComponent } from './pages/new-recipe/new-recipe.component';

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
    FormRecipeComponent,
    LoginPageComponent,
    RegisterPageComponent,
    InputGroupComponent,
    InputValidationComponent,
    TextInputComponent,
    NewRecipeComponent,
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
