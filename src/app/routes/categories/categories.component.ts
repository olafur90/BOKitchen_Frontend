import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/components/models/Category';
import { Recipe } from 'src/app/components/models/Recipe';
import { ResultCardsComponent } from 'src/app/components/result-cards/result-cards-cards.component';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-categories',
	standalone: true,
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss'],
	imports: [CommonModule, ResultCardsComponent],
})
export class CategoriesComponent implements OnInit {
	public recipes: Recipe[] = [];
	public currentCategory: Category | undefined;

	constructor(
		private apiService: ApiService,
		private activatedRoute: ActivatedRoute,
	) {}

	async ngOnInit(): Promise<void> {
		const paramCategory = this.activatedRoute.snapshot.params['category'];

		try {
			// Fetch the category object
			const category = await this.apiService.get<Category>(`${environment.API_URL}/flokkar/${paramCategory}`).toPromise();
			this.currentCategory = category;

			// Get the recipes for the category
			const recipes = await this.apiService.get<Recipe[]>(`${environment.API_URL}/uppskriftir/flokkar/${paramCategory}`).toPromise();
			if (recipes) {
				this.recipes = recipes;
			}
		} catch (error) {
			console.error('Error fetching category or recipes', error);
		}
	}
}
