import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from "@angular/forms";
import { Category } from "src/app/components/models/Category";
import { Component, Output, EventEmitter, forwardRef } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { DifficultyPipe } from "src/app/pipes/difficulty.pipe";
import { Difficulty } from "src/app/components/models/Difficulty";
import { DifficultyReversePipe } from "src/app/pipes/difficulty-reverse.pipe";

const CUSTOM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectDifficultyComponent),
    multi: true,
  };

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
        DifficultyReversePipe
    ],
    providers: [
        DifficultyPipe,
        DifficultyReversePipe,
        CUSTOM_VALUE_ACCESSOR
    ]
})
export class SelectDifficultyComponent implements ControlValueAccessor {
    @Output()
    selectedDifficulty = new EventEmitter<Difficulty | null>();

    // Recipe category selection
    categoryControl = new FormControl<Category | null>(null, Validators.required);
    selectFormControl = new FormControl('', Validators.required);

    difficulties: Difficulty [] = [
        Difficulty.EASY,
        Difficulty.MEDIUM,
        Difficulty.HARD
    ];

    constructor(private difficultyPipe: DifficultyPipe) {}
    writeValue(obj: any): void {
        this.selectedDifficulty.emit(this.difficultyPipe.transform(obj));
    }
    registerOnChange(fn: any): void {
        // TODO: figure out what this does later
    }
    registerOnTouched(fn: any): void {
        // TODO: figure out what this does later
    }
    setDisabledState?(isDisabled: boolean): void {
        // TODO: figure out what this does later
    }

    onChange(diff: Difficulty) {
        this.selectedDifficulty.emit(diff);
    }
}
