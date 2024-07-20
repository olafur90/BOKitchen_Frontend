import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FilterRecipesComponent } from 'src/app/components/filter-recipes/filter-recipes.component';
import { Category } from 'src/app/components/models/Category';
import { Recipe } from 'src/app/components/models/Recipe';
import { ResultCardsComponent } from 'src/app/components/result-cards/result-cards-cards.component';
import { environment } from 'src/environments/environment';

/**
 * Component for all recipes - Allar Uppskriftir
 */
@Component({
    selector: 'app-all-recipes-component',
    standalone: true,
    templateUrl: './all-recipes.component.html',
    styleUrls: ['./all-recipes.component.scss'],
    imports: [
        ResultCardsComponent,
        CommonModule,
        FilterRecipesComponent
    ]
})
export class AllRecipesComponent implements OnInit {
    // Initialized is false while data is being fetched from API - Loading state while !initialized
    initialized: boolean = false;

    // All recipes from API
    recipes: Recipe[][] = [];

    // Available categories from API
    availableCategories: Category[] = [];

    /**
     * The constructor - Initializes DI
     * @param http - Dependency Injection for Angular HttpClient
     */
    constructor(private http: HttpClient) {}

    /**
     * Initializes data from API and sets variables
     * @returns a promise of void
     */
    ngOnInit(): void {
        this.http.get<Category[]>(`${environment.API_URL}/flokkar/`).subscribe(async (data) => {
            if (data) {
                this.availableCategories = data;
    
                for (const category of this.availableCategories) {
                    const categoryRecipes = await this.http.get<Recipe[]>(`${environment.API_URL}/uppskriftir/flokkar/${category.name}`).toPromise();
                    if (categoryRecipes) {
                        categoryRecipes.forEach((recipe) => {
                            recipe.cat = category;
                        });
                        this.recipes.push(categoryRecipes);
                    }
                }
                
                this.recipes.sort((a, b) => {
                    return b.length - a.length;
                });
    
                this.initialized = true;
            }
        });
    }
}