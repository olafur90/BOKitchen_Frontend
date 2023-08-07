import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

@Component({
    selector: "app-latest-recipes",
    standalone: true,
    templateUrl: "./latest-recipes.component.html",
    styleUrls: ["./latest-recipes.component.scss"],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule
    ]
})
export class LatestRecipesComponent {
    recipes: string[] = ["Pumpkin Pie", "Test", "Test2", "Test3", "Test4"];
}