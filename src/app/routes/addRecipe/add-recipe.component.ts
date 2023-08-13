import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/components/models/Recipe';
import { API_URL } from 'src/environment/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { SelectServingSizeComponent } from './select-serving-size-component/select-serving-size.component';
import { SelectTimeComponent } from './select-time-component/select-time.component';
import { SelectDifficultyComponent } from './select-difficulty-component copy/select-difficulty.component';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { Category } from 'src/app/components/models/Category';
import { SelectCategoryComponent } from './select-category-component/select-category.component';



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

    @Input()
    public cat: Category | null = null

    public name: string = '';
    public shortDescription: string = '';
    public htmlContent = '';
    public category: string = '';
    public selectedCategory: Category | null = null;

    // Preview vars
    public previewName: string = '';
    public previewSummary: string = '';
    public previewContent: SafeHtml = '';
    
    // Form group for controlling the input fields
    recipeFormGroup = new FormGroup({
        name: new FormControl(''),
        summary: new FormControl(''),
        description: new FormControl(''),
        category: new FormControl(null),
    });

    // Editor config for Rich Text editor
    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: '200px',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter text here...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
            {class: 'arial', name: 'Arial'},
            {class: 'times-new-roman', name: 'Times New Roman'},
            {class: 'calibri', name: 'Calibri'},
            {class: 'comic-sans-ms', name: 'Comic Sans MS'}
        ],
        uploadUrl: 'upload', // FIXME: Add upload later
        sanitize: true,
        toolbarHiddenButtons: [
            [
                'backgroundColor', 
                'insertVideo',
                'removeFormat',
                'strikeThrough',
                'subscript',
                'superscript',
                'insertHorizontalRule',

            ]
        ]
    }

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

    onCategoryChange(event: any): void {
        console.log(event);
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