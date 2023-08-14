import { Pipe, PipeTransform } from '@angular/core';
import { Difficulty } from '../components/models/Difficulty';

@Pipe({
    name: 'difficultyReverse',
    standalone: true
})
export class DifficultyReversePipe implements PipeTransform {
    transform(value: Difficulty): string {
        console.log('value >> ', value);
        switch (value) {
            case Difficulty.HARD:
                return 'Erfitt';
            case Difficulty.MEDIUM:
                return 'Meðal';
            case Difficulty.EASY:
                return 'Auðvelt';
        }
        return 'bleh';
    }
}