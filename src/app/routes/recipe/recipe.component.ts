import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../components/models/Recipe';
import { API_URL } from 'src/environment/environment';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-recipe-component',
    standalone: true,
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss'],
    imports: [
        CommonModule,
        MatTabsModule
    ]
})
export class RecipeComponent implements OnInit{
    private id: number = 0;
    public recipe: Recipe = {};

    constructor(private route: ActivatedRoute, private http: HttpClient) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['recipeId'];
        this.http.get<Recipe>(`${API_URL}/uppskriftir/recipe/${this.id}`).subscribe((data: Recipe) => {
            this.recipe = data;
        });
    }
}