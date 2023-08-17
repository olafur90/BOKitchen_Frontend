import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { OnInit } from "@angular/core";
import { RouterLink, RouterModule } from "@angular/router";
import { Recipe } from "src/app/components/models/Recipe";
import { API_URL } from "src/environment/environment";
import { DifficultyReversePipe } from "src/app/pipes/difficulty-reverse.pipe";
import { Category } from "src/app/components/models/Category";

@Component({
    selector: "app-latest-recipes",
    standalone: true,   
    templateUrl: "./latest-recipes.component.html",
    styleUrls: ["./latest-recipes.component.scss"],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        RouterLink,
        RouterModule,
        DifficultyReversePipe
    ],
    providers: [
        DifficultyReversePipe
    ]
})
export class LatestRecipesComponent implements OnInit {
    recentRecipes: Recipe[] = [];
    singleLatestRecipe: Recipe = {}

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get<Recipe[]>(`${API_URL}/uppskriftir/recentRecipes`)
            .subscribe((data: Recipe[]) => {
                if (data) {
                    this.recentRecipes = data;
                }
            }).add(() => {
                this.recentRecipes.forEach(recipe => {
                    if (recipe.category) {
                        this.http.get<Category>(`${API_URL}/flokkar/` + recipe.category).subscribe((category: Category) => {
                            recipe.cat = category;
                        });
                    }
                });
                this.recentRecipes.reverse();
                this.singleLatestRecipe = this.recentRecipes[0];
                this.recentRecipes = this.recentRecipes.slice(1);
            }
        );
        
    }
}