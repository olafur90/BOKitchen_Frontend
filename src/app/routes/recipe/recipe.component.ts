import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../components/models/Recipe';
import { environment } from 'src/environments/environment';
import { MatTabsModule } from '@angular/material/tabs';
import { DifficultyReversePipe } from 'src/app/pipes/difficulty-reverse.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommentsComponent } from './comments/comments.component';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/services/api.service';

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
		MatFormFieldModule,
		ReactiveFormsModule,
		MatButtonModule,
		CommentsComponent
	],
})
export class RecipeComponent implements OnInit {
	public id: number = 0;
	
	public recipe: Recipe | undefined;

	authenticated = false;

	constructor(
		private route: ActivatedRoute,
		private apiService: ApiService,
		private authService: AuthService
	) {}

	async ngOnInit(): Promise<void> {
		this.id = this.route.snapshot.params['recipeId'];

		try {
			// Fetch the recipe data
			this.recipe = await this.apiService.get<Recipe>(`${environment.API_URL}/uppskriftir/recipe/${this.id}`).toPromise();
		} catch (error) {
			console.error('Error fetching recipe', error);
		}

		// Handle authentication status
		this.authService.isAuthenticated$.subscribe((authenticated) => {
			this.authenticated = authenticated;
		});
	}
}
