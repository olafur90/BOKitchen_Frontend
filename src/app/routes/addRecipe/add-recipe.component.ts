import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SelectCategoryComponent } from './select-category-component/select-category.component';

@Component ({
    selector: 'app-add-recipe-component',
    standalone: true,
    templateUrl: './add-recipe.component.html',
    styleUrls: ['./add-recipe.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularEditorModule,
        SelectCategoryComponent
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

    constructor(private sanitizer: DomSanitizer) { }

    onNameChange(input: string) {
        this.previewName = input;
    }

    onSummaryChange(input: string) {
        this.previewSummary = input;
    }

    onContentChange() {
        this.previewContent = this.sanitizer.bypassSecurityTrustHtml(this.htmlContent);
    }

    onAddRecipe() {
        console.log(this.recipeFormGroup.value);
    }
}