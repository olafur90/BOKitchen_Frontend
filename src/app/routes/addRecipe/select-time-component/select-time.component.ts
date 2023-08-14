import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from "@angular/forms";
import { Category } from "src/app/components/models/Category";
import { Component, Output, EventEmitter, forwardRef } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";

const CUSTOM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectTimeComponent),
    multi: true,
  };

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
    ],
    providers: [CUSTOM_VALUE_ACCESSOR]
})
export class SelectTimeComponent implements ControlValueAccessor {
    
    @Output()
    selectedTime = new EventEmitter<number | null>();

    // Recipe category selection
    timeControl = new FormControl<Category | null>(null, Validators.required);
    selectFormControl = new FormControl('', Validators.required);

    onChange(time: number) {
        this.selectedTime.emit(time);
    }

    writeValue(obj: any): void {
        this.selectedTime.emit(obj);
    }
    registerOnChange(fn: any): void {
        // TODO:
    }
    registerOnTouched(fn: any): void {
        // TODO:
    }
    setDisabledState?(isDisabled: boolean): void {
        // TODO:
    }
}
