import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Category } from "src/app/components/models/Category";
import { Component } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";

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
    // Recipe category selection
    categoryControl = new FormControl<Category | null>(null, Validators.required);
    selectFormControl = new FormControl('', Validators.required);
}
