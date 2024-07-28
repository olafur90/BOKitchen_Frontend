import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { OnInit } from '@angular/core';
import { Recipe } from 'src/app/components/models/Recipe';
import { environment } from 'src/environments/environment';
import { DifficultyReversePipe } from 'src/app/pipes/difficulty-reverse.pipe';
import { Category } from 'src/app/components/models/Category';
import { MostRecentRecipeComponent } from './most-recent-recipe/most-recent-recipe.component';
import { MoreRecentRecipesComponent } from "./more-recent-recipes/more-recent-recipes.component";
import { AuthService } from '@auth0/auth0-angular';

@Component({
	selector: 'app-latest-recipes',
	standalone: true,
	templateUrl: './latest-recipes.component.html',
	styleUrls: ['./latest-recipes.component.scss'],
	imports: [
		CommonModule,
		MatButtonModule,
		MatCardModule,
		MostRecentRecipeComponent,
		MoreRecentRecipesComponent,
		MatProgressSpinnerModule
	],
	providers: [DifficultyReversePipe],
})
/**
 * The latest recipes component, for displaying the most recent recipes on the front page of the website
 */
export class LatestRecipesComponent implements OnInit {
	// The 7 most recent recipes fetched from backend
	recentRecipes: Recipe[] = [];

	// The single most recent recipe to be displayed at the top of the page
	singleLatestRecipe: Recipe = {};

	// Whether or not the recipes have been initialized
	initialized: boolean = false;

	// Whether or not the user is logged in
	authenticated: boolean = false;

	/**
	 * The constructor
	 * @param http The HTTP Client Service
	 */
	constructor(private http: HttpClient, private authService: AuthService) {}

	/**
	 * Fetches the components from the API and sets the variables
	 */
	ngOnInit(): void {
		this.authService.isAuthenticated$.pipe().subscribe((authenticated) => {
			this.authenticated = authenticated;
		});
		
		this.http
			.get<Recipe[]>(`${environment.API_URL}/uppskriftir/recentRecipes`)
			.subscribe((data: Recipe[]) => {
				if (data) {
					this.recentRecipes = data;
				}
			})
			.add(() => {
				this.recentRecipes.forEach((recipe) => {
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
				this.singleLatestRecipe = this.recentRecipes[this.recentRecipes.length - 1];
				this.recentRecipes = this.recentRecipes.slice(0, this.recentRecipes.length - 1);
				this.initialized = true;
			});
	}
}
