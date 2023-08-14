import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Category } from "src/app/components/models/Category";
import { Component, Output, EventEmitter } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { DifficultyPipe } from "src/app/pipes/difficulty.pipe";
import { Difficulty } from "src/app/components/models/Difficulty";

@Component({
    selector: 'app-select-difficulty-component',
    standalone: true,
    templateUrl: './select-difficulty.component.html',
    styleUrls: ['./select-difficulty.component.scss'],
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        DifficultyPipe,
    ],
    providers: [
        DifficultyPipe
    ]
})
export class SelectDifficultyComponent {
    @Output()
    selectedDifficulty = new EventEmitter<Difficulty | null>();

    // Recipe category selection
    categoryControl = new FormControl<Category | null>(null, Validators.required);
    selectFormControl = new FormControl('', Validators.required);

    difficulties: string[] = ['Auðvelt', 'Meðal', 'Erfitt'];

    constructor(private difficultyPipe: DifficultyPipe) {}

    onChange(diff: string) {
        console.log('diff >> ', diff);
        this.selectedDifficulty.emit(this.difficultyPipe.transform(diff));
    }
}
