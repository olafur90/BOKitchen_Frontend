import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
        CommonModule
    ]
})
export class AllRecipesComponent implements OnInit {
    recipes: Recipe[] = [];
    initialized: boolean = false;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.http
            .get<Recipe[]>(`${environment.API_URL}/uppskriftir/`)
            .subscribe((data: Recipe[]) => {
                if (data) {
                    this.recipes = data;
                }
            }).add(() => {
                this.recipes.forEach((recipe) => {
                    if (recipe.category) {
                        this.http
                            .get<Category>(
                                `${environment.API_URL}/flokkar/` + recipe.category,
                            )
                            .subscribe((category: Category) => {
                                recipe.cat = category;
                            });
                    }
                });
                this.initialized = true;
            })
    }
}