import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { MainBoxComponent } from './components/home/main-box/main-box.component';
import { FooterBoxComponent } from './components/footer-box/footer-box.component';
import { CardRecipeComponent } from './components/home/card-recipe/card-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuBarComponent,
    MainBoxComponent,
    FooterBoxComponent,
    CardRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
