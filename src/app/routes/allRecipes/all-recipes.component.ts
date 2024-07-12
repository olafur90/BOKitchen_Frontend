import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FilterRecipesComponent } from 'src/app/components/filter-recipes/filter-recipes.component';
import { Category } from 'src/app/components/models/Category';
import { Recipe } from 'src/app/components/models/Recipe';
import { ResultCardsComponent } from 'src/app/components/result-cards/result-cards-cards.component';
import { environment } from 'src/environments/environment';

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
    recipes: Recipe[][] = [];
    initialized: boolean = false;
    availableCategories: Category[] = [];

    constructor(private http: HttpClient) {}

    async ngOnInit(): Promise<void> {
        await this.http.get<Category[]>(`${environment.API_URL}/flokkar/`).subscribe(async (data) => {
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