import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/components/models/Category';
import { Recipe } from 'src/app/components/models/Recipe';
import { ResultCardsComponent } from 'src/app/components/result-cards/result-cards-cards.component';
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
		private http: HttpClient,
		private activatedRoute: ActivatedRoute,
	) {}

	ngOnInit(): void {
		const paramCategory = this.activatedRoute.snapshot.params['category'];

		// Fetch the category object
		this.http
			.get<Category>(`${environment.API_URL}/flokkar/${paramCategory}`)
			.subscribe((category) => {
				this.currentCategory = category;
			})
			.add(() => {
				// Get the recipes for the category after fetching the category object
				this.http
					.get<Recipe[]>(
						`${environment.API_URL}/uppskriftir/flokkar/${paramCategory}`,
					)
					.subscribe((recipes) => {
						if (recipes) {
							this.recipes = recipes;
						}
					});
			});
	}
}
