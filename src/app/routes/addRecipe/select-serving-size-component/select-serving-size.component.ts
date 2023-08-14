import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Category } from "src/app/components/models/Category";
import { Component, OnInit } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "src/environment/environment";

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
    ]
})
export class SelectServingSizeComponent {
    @Output()
    selectedServingSize = new EventEmitter<number | null>();
    
    // Recipe category selection
    servingSizeControl = new FormControl<number | null>(null, Validators.required);
    selectFormControl = new FormControl('', Validators.required);
    
    onChange(cat: number) {
        this.selectedServingSize.emit(cat);
    }
}
