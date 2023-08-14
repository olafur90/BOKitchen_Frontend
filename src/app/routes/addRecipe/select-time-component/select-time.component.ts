import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Category } from "src/app/components/models/Category";
import { Component, Output, EventEmitter } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-select-time-component',
    standalone: true,
    templateUrl: './select-time.component.html',
    styleUrls: ['./select-time.component.scss'],
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class SelectTimeComponent {
    @Output()
    selectedTime = new EventEmitter<number | null>();

    // Recipe category selection
    timeControl = new FormControl<Category | null>(null, Validators.required);
    selectFormControl = new FormControl('', Validators.required);

    onChange(time: number) {
        this.selectedTime.emit(time);
    }
}
