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
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';

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
		MatProgressSpinnerModule,
		MatPaginatorModule
		
	],
	providers: [DifficultyReversePipe, MatPaginatorIntl],
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

	/*	Paginator variables */
	pageSize = 6;
	pageIndex = 0;
	length = 18;
	pageEvent: PageEvent | undefined;

	/**
	 * The constructor
	 * @param http The HTTP Client Service
	 */
	constructor(private http: HttpClient, private apiService: ApiService, private authService: AuthService) {}

	/**
	 * Checks if the user is authenticated
	 */
	checkIfAuthenticated(): void {
		this.authService.isAuthenticated$.pipe().subscribe((authenticated) => {
			this.authenticated = authenticated;
		});
	}

	/**
	 * Fetches the newest recipe from the backend
	 */
	async getLatestRecipe(): Promise<void> {
		await this.apiService.get<Recipe>(
			'uppskriftir/mostRecentRecipe'
		).subscribe((data: Recipe) => {
			this.singleLatestRecipe = data;
		});
	}

	/**
	 * Fetches more recipes from the backend based on the page number
	 */
	async getMoreRecipes(): Promise<void> {
		await this.apiService.get<number>(
			'uppskriftir/recipeCount'
		).subscribe((count: number) => {
			this.length = count;
		}).add(() => {
			this.apiService
				.get<Recipe[]>('uppskriftir/recentRecipes', {
					pageIndex: this.pageIndex, 
					requestedNumberOfRecipes: this.pageSize
				})
				.subscribe((data: Recipe[]) => {
					if (data) {
						this.recentRecipes = data;
					}
				})
				.add(() => {
					this.recentRecipes.forEach((recipe) => {
						if (recipe.category) {
							this.apiService
								.get<Category>(
									`flokkar/${recipe.category}`,
								)
								.subscribe((category: Category) => {
									recipe.cat = category;
								});
						}
					});
					this.initialized = true;
				});
		});
	}

	/**
	 * Fetches the components from the API and sets the variables
	 */
	ngOnInit(): void {
		this.checkIfAuthenticated();
		this.getLatestRecipe();
		this.getMoreRecipes();
	}

	/**
	 * Handles the page changing in paginator
	 * @param e the event from the paginator
	 */
	handlePageEvent(e: PageEvent) {
		this.pageIndex = e.pageIndex;
		this.getMoreRecipes();
	}
}
