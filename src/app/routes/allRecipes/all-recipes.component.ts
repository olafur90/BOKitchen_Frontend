import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FilterRecipesComponent } from 'src/app/components/filter-recipes/filter-recipes.component';
import { Category } from 'src/app/components/models/Category';
import { Recipe } from 'src/app/components/models/Recipe';
import { ResultCardsComponent } from 'src/app/components/result-cards/result-cards-cards.component';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { firstValueFrom } from 'rxjs';

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
     * @param apiService - Dependency Injection for ApiService
     */
    constructor(private apiService: ApiService) {}

    /**
     * Initializes data from API and sets variables
     * @returns void
     */
    async ngOnInit(): Promise<void> {
        try {
            const categories = await firstValueFrom(this.apiService.get<Category[]>(`flokkar/`));
            if (categories) {
                this.availableCategories = categories;

                for (const category of this.availableCategories) {
                    const categoryRecipes = await firstValueFrom(this.apiService.get<Recipe[]>(`uppskriftir/flokkar/${category.name}`));
                    if (categoryRecipes) {
                        categoryRecipes.forEach((recipe) => {
                            recipe.cat = category;
                        });
                        this.recipes.push(categoryRecipes);
                    }
                }

                this.recipes.sort((a, b) => b.length - a.length);
                this.initialized = true;
            }
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }
}