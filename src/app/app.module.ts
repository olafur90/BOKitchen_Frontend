import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { RecipeComponent } from './routes/recipe/recipe.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './routes/search/search.component';
import { AddRecipeComponent } from './routes/addRecipe/add-recipe.component';
import { LoginComponent } from './routes/login/login.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FooterComponent,
    HeaderComponent,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    HomeComponent,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: HomeComponent
        },
        {
          path: 'uppskriftir/add',
          component: AddRecipeComponent
        },
        {
          path: 'uppskriftir/recipe/:recipeId',
          component: RecipeComponent
        },
        {
          path: 'search',
          component: SearchComponent
        },
        {
          path: 'login',
          component: LoginComponent
        }
      ]
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
