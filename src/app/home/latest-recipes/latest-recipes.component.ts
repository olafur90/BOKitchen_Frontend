import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { OnInit } from "@angular/core";
import { RouterLink, RouterModule } from "@angular/router";
import { Recipe } from "src/app/components/models/Recipe";
import { API_URL } from "src/environment/environment";

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
        RouterModule
    ]
})
export class LatestRecipesComponent implements OnInit {
    recentRecipes: Recipe[] = [];
    singleLatestRecipe: Recipe = {}

    constructor(private http: HttpClient) { }

    async ngOnInit(): Promise<void> {
        await this.http.get<Recipe[]>(`${API_URL}/uppskriftir/recentRecipes`)
            .subscribe((data: Recipe[]) => {
                this.recentRecipes = data;
            })
            
        await this.http.get<Recipe>(`${API_URL}/uppskriftir/latestRecipe`).subscribe((data: Recipe) => {
            this.singleLatestRecipe = data;
        })
    }
}