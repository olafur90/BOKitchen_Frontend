import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SelectCategoryComponent } from './select-category-component/select-category.component';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/components/models/Recipe';
import { API_URL } from 'src/environment/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { SelectServingSizeComponent } from './select-serving-size-component/select-serving-size.component';
import { SelectTimeComponent } from './select-time-component/select-time.component';
import { SelectDifficultyComponent } from './select-difficulty-component copy/select-difficulty.component';

@Component ({
    selector: 'app-add-recipe-component',
    standalone: true,
    templateUrl: './add-recipe.component.html',
    styleUrls: ['./add-recipe.component.scss'],
    imports: [
        AngularEditorModule,
        CommonModule,
        FormsModule,
        SelectTimeComponent,
        MatFormFieldModule,
        MatOptionModule,
        ReactiveFormsModule,
        SelectCategoryComponent,
        SelectDifficultyComponent,
        SelectServingSizeComponent,
    ]
})
export class AddRecipeComponent{
    public name: string = '';
    public shortDescription: string = '';
    public htmlContent = '';

    // Preview vars
    public previewName: string = '';
    public previewSummary: string = '';
    public previewContent: SafeHtml = '';
    
    // Form group for controlling the input fields
    recipeFormGroup = new FormGroup({
        name: new FormControl(''),
        summary: new FormControl(''),
        description: new FormControl('')
    });

    constructor(private sanitizer: DomSanitizer, private http: HttpClient) { }

    onNameChange(input: string) {
        this.name = input;
    }

    onSummaryChange(input: string) {
        this.previewSummary = input;
    }

    onContentChange() {
        this.previewContent = this.sanitizer.bypassSecurityTrustHtml(this.htmlContent);
    }

    onAddRecipe() {
        const recipe: Recipe = {
            name: this.name,
            instructions: this.htmlContent
        }

        console.log('recipe >> ', recipe);

        this.http.post<Recipe>(`${API_URL}/uppskriftir/add`, recipe).subscribe((data: Recipe) => {
            console.log('data >> ', data);
        })
    }
}