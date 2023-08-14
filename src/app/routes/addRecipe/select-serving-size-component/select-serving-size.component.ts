import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from "@angular/forms";
import { Component, forwardRef } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

const CUSTOM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectServingSizeComponent),
    multi: true,
  };

@Component({
    selector: 'app-select-serving-size-component',
    standalone: true,
    templateUrl: './select-serving-size.component.html',
    styleUrls: ['./select-serving-size.component.scss'],
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
export class SelectServingSizeComponent implements ControlValueAccessor {
    
    @Output()
    selectedServingSize = new EventEmitter<number | null>();
    
    // Recipe category selection
    servingSizeControl = new FormControl<number | null>(null, Validators.required);
    selectFormControl = new FormControl('', Validators.required);

    onChange(cat: number) {
        this.selectedServingSize.emit(cat);
    }

    writeValue(obj: any): void {
        this.selectedServingSize.emit(obj);
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
