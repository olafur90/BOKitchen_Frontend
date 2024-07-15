import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { DifficultyReversePipe } from 'src/app/pipes/difficulty-reverse.pipe';
import { DifficultyPipe } from 'src/app/pipes/difficulty.pipe';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-most-recent-recipe',
  standalone: true,
  templateUrl: './most-recent-recipe.component.html',
  styleUrls: ['./most-recent-recipe.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    DifficultyReversePipe,
    DifficultyPipe
  ],
  providers: [DifficultyReversePipe],
})
export class MostRecentRecipeComponent {
  @Input()
  singleLatestRecipe: Recipe = {} as Recipe;
  constructor() {}
}
