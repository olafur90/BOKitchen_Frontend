import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../components/models/Recipe';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ResultCardsComponent } from 'src/app/components/result-cards/result-cards-cards.component';

@Component({
	selector: 'app-search-component',
	standalone: true,
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
	imports: [CommonModule, MatCardModule, RouterModule, ResultCardsComponent],
})
export class SearchComponent implements OnInit {
	searchResults: Recipe[] = [];
	searchTerm: string = '';

	constructor(
		private http: HttpClient,
		private route: ActivatedRoute,
	) {}

	async ngOnInit(): Promise<void> {
		const searchParam: string = (this.searchTerm =
			this.route.snapshot.queryParams['query']);
		await this.http
			.get<Recipe[]>(`${environment.API_URL}/uppskriftir/search`, {
				params: { query: searchParam },
			})
			.subscribe((data: Recipe[]) => {
				this.searchResults = data;
			});
	}
}
