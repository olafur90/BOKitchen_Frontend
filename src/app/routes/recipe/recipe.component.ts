import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../components/models/Recipe';
import { API_URL } from 'src/environment/environment';
import { MatTabsModule } from '@angular/material/tabs';
import { DifficultyReversePipe } from 'src/app/pipes/difficulty-reverse.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Comment } from 'src/app/components/models/Comment';

@Component({
	selector: 'app-recipe-component',
	standalone: true,
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.scss'],
	imports: [
		CommonModule, 
		MatTabsModule, 
		FormsModule,
		MatInputModule,
		DifficultyReversePipe, 
		MatFormFieldModule
	],
})
export class RecipeComponent implements OnInit {
	private id: number = 0;
	
	public recipe: Recipe = {};
	public comments: Comment[] = [];

	// TODO: Add comments

	constructor(
		private route: ActivatedRoute,
		private http: HttpClient,
	) {}

	ngOnInit(): void {
		this.id = this.route.snapshot.params['recipeId'];
		this.http
			.get<Recipe>(`${API_URL}/uppskriftir/recipe/${this.id}`)
			.subscribe((data: Recipe) => {
				this.recipe = data;
			}).add(() => {
				this.http.get<Comment[]>(`${API_URL}/uppskriftir/recipe/${this.id}/comments`).subscribe((data) => {
					this.comments = data;
					console.log('comments >> ', this.comments);
				})
			});
	}
}
