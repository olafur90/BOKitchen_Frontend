import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { OnInit } from "@angular/core";
import { RouterLink, RouterModule } from "@angular/router";
import { IRecipe } from "src/app/components/models/IRecipe";
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
    recentRecipes: IRecipe[] = [];
    singleLatestRecipe: IRecipe = {}

    constructor(private http: HttpClient) { }

    async ngOnInit(): Promise<void> {
        await this.http.get<IRecipe[]>(`${API_URL}/uppskriftir/recentRecipes`)
            .subscribe((data: IRecipe[]) => {
                this.recentRecipes = data;
            })
            .add(() => {
                console.log('this.recentRecipes >> ', this.recentRecipes);
            });

            
        await this.http.get<IRecipe>(`${API_URL}/uppskriftir/latestRecipe`).subscribe((data: IRecipe) => {
            this.singleLatestRecipe = data;
        })
    }
}