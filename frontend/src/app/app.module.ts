import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
