import { Component, Input } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { DifficultyReversePipe } from 'src/app/pipes/difficulty-reverse.pipe';


@Component({
	selector: 'app-result-cards-component',
	standalone: true,
	templateUrl: './result-cards.component.html',
	styleUrls: ['./result-cards.component.scss'],
	imports: [CommonModule, MatCardModule, RouterModule, DifficultyReversePipe],
})
export class ResultCardsComponent {
	// Input from parent FIXME: I have no idea from looking at code what this is
	@Input()
	public recipes: Recipe[] = [];

	// Input from parent FIXME: I have no idea from looking at code what this is
	@Input()
	public recipeCategories: Recipe[][] = [];
}
