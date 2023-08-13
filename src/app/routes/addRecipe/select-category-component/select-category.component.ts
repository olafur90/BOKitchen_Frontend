import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Category } from "src/app/components/models/Category";
import { Component } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-select-category-component',
    standalone: true,
    templateUrl: './select-category.component.html',
    styleUrls: ['./select-category.component.scss'],
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class SelectCategoryComponent {
    // Recipe category selection
    categoryControl = new FormControl<Category | null>(null, Validators.required);
    selectFormControl = new FormControl('', Validators.required);
    categories: Category[] = [
        {name: 'meat', icelandicName: 'Kjöt', imageUri: ''},
        {name: 'ground_beef', icelandicName: 'Hakk', imageUri: ''},
        {name: 'fish', icelandicName: 'Fisk', imageUri: ''},
        {name: 'other', icelandicName: 'Annað', imageUri: ''},
    ]
}
