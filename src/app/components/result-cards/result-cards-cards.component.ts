import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { DifficultyReversePipe } from 'src/app/pipes/difficulty-reverse.pipe';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
	selector: 'app-result-cards-component',
	standalone: true,
	templateUrl: './result-cards.component.html',
	styleUrls: ['./result-cards.component.scss'],
	imports: [
		CommonModule, 
		MatCardModule, 
		RouterModule, 
		DifficultyReversePipe,
		MatExpansionModule
	],
})
export class ResultCardsComponent implements OnInit {

	/* Input from parent FIXME: I have no idea from looking at code what this is
	@Input()
	public recipes: Recipe[] = [];
	*/

	// Input from parent FIXME: I have no idea from looking at code what this is
	@Input()
	public recipeCategories: Recipe[][] = [];

	// An array to keep the state of the panels for each food type
    panelOpenState: boolean[] = [];

	setPanelState(index: number, state: boolean): void {
		this.panelOpenState[index] = state;
	}

	isPanelOpen(index: number): boolean {
		return this.panelOpenState[index];
	}

	ngOnInit(): void {
		console.log(this.recipeCategories);
	}
}
