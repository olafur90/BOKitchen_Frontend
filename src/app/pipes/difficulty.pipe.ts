import { Pipe, PipeTransform } from '@angular/core';
import { Difficulty } from '../components/models/Difficulty';

@Pipe({
    name: 'difficulty',
    standalone: true
})
export class DifficultyPipe implements PipeTransform {
    transform(value: string): Difficulty {
        switch (value) {
            case 'Erfitt':
                return Difficulty.HARD;
            case 'Meðal':
                return Difficulty.MEDIUM;
            case 'Auðvelt':
                return Difficulty.EASY;
        }
        return Difficulty.EASY;
    }
}