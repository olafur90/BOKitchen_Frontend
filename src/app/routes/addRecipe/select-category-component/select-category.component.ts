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
export class SelectCategoryComponent implements OnInit {
    @Output()
    selectedCategory = new EventEmitter<Category | null>();
    
    // Recipe category selection
    categoryControl = new FormControl<Category | null>(null, Validators.required);
    selectFormControl = new FormControl('', Validators.required);
    categories: Category[] = [];

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get<Category[]>(`${API_URL}/flokkar/`).subscribe((data) => {
            if (data) {
                this.categories = data;
            }
        });
    }

    onChange(cat: Category) {
        this.selectedCategory.emit(cat);
    }
}
