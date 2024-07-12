import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category } from '../models/Category';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-recipes',
  standalone: true,
  templateUrl: './filter-recipes.component.html',
  styleUrls: ['./filter-recipes.component.scss'],
  imports: [
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})

export class FilterRecipesComponent implements OnInit {
  @Output() filterChange = new EventEmitter<string[]>();

  allCategories: Category[] = [];
  filteredCategories: Category[] = [];
  filterForm: FormGroup = new FormGroup<CategoryFormControls>({} as CategoryFormControls);
  checkedFilters: string[] = [];

  constructor(private http: HttpClient) { }
  
  async ngOnInit(): Promise<void> {
    this.http.get<Category[]>(`${environment.API_URL}/flokkar/`).subscribe(data => {
      if (data) {
        this.allCategories = data;
        this.filteredCategories = data;

        this.filterForm.addControl('all', new FormControl(false));
        this.filteredCategories.forEach(category => {
          if (category.name) {
            const control = new FormControl(false);
            this.filterForm.addControl(category.name, control);

            control.valueChanges.subscribe(() => {
                this.updateSelectedCategories();
            });
          }
        });
      }
    });
  }

  updateSelectedCategories(): void {
    const selectedCategories = Object.keys(this.filterForm.controls)
      .filter(key => this.filterForm.controls[key].value);
    this.filterChange.emit(selectedCategories);
  }

  onChange(event: boolean, category: Category) {
    if (event) {
      this.filterForm.controls[category.name].setValue(true);
      this.checkedFilters.push(category.name);
    } else {
      this.filterForm.controls[category.name].setValue(false);
      const index = this.checkedFilters.indexOf(category.name);
      if (index > -1) {
        this.checkedFilters.splice(index, 1);
      }
    }

    // Check 'all' if nothing is checked
    if (this.checkedFilters.length === 0) {
      this.filterForm.controls['all'].setValue(true);
    } else {
      this.filterForm.controls['all'].setValue(false);
    }
    console.log(this.checkedFilters);
  }
}

type CategoryFormControls = {
  [key: string]: FormControl;
};
