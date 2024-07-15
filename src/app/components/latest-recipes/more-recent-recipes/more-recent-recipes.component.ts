import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Recipe } from '../../models/Recipe';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import { DifficultyReversePipe } from 'src/app/pipes/difficulty-reverse.pipe';

@Component({
  selector: 'app-more-recent-recipes',
  standalone: true,
  templateUrl: './more-recent-recipes.component.html',
  styleUrls: ['./more-recent-recipes.component.scss'],
  imports: [
		CommonModule,
		MatButtonModule,
		MatCardModule,
		MoreRecentRecipesComponent,
    RouterLink,
    RouterModule,
    DifficultyReversePipe
	],
})
export class MoreRecentRecipesComponent {
  @Input()
  recentRecipes: Recipe[] = [];
}
