import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
import { Difficulty } from 'src/app/components/models/Difficulty';
import { DifficultyPipe } from 'src/app/pipes/difficulty.pipe';
import { DifficultyReversePipe } from 'src/app/pipes/difficulty-reverse.pipe';
import { ToastrService } from 'ngx-toastr';



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
        DifficultyReversePipe
    ],
    providers: [
        DifficultyPipe,
        DifficultyReversePipe
    ]
})
export class AddRecipeComponent {

    public name: string = '';
    public shortDescription: string = '';
    public htmlContent = '';
    
    public selectedCategory: Category | null = null;
    public selectedServingSize: number = 0;
    public selectedTime: number = 0;
    public selectedDifficulty: Difficulty = Difficulty.EASY;
    public selectedDifficultyAsText: string = '';

    public previewContent: SafeHtml = '';
    
    // Form group for controlling the input fields
    recipeFormGroup = new FormGroup({
        name: new FormControl(''),
        summary: new FormControl(''),
        description: new FormControl(''),
        category: new FormControl(null),
        servingSize: new FormControl(null),
        time: new FormControl(null),
        difficulty: new FormControl(null)
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

    constructor(
        private sanitizer: DomSanitizer, 
        private http: HttpClient, 
        private diffPipe: DifficultyReversePipe,
        private toastService: ToastrService
    ) { }

    onNameChange(input: string) {
        this.name = input;
    }

    onContentChange() {
        this.previewContent = this.sanitizer.bypassSecurityTrustHtml(this.htmlContent);
    }

    onCategoryChange(event: any): void {
        this.selectedCategory = event as Category;
    }

    onSelectServingSize(event: any): void {
        this.selectedServingSize = event as number;
    }

    onSelectTime(event: any): void {
        this.selectedTime = event as number;
    }

    onSelectDifficulty(event: any): void {
        this.selectedDifficulty = event as Difficulty;
        this.selectedDifficultyAsText = this.diffPipe.transform(this.selectedDifficulty);
    }

    onAddRecipe() {
        const recipe: Recipe = {
            name: this.name,
            instructions: this.htmlContent,
            category: this.selectedCategory ? this.selectedCategory.name : undefined,
            timeToCookInMinutes: this.selectedTime,
            forNumberOfPeople: this.selectedServingSize,
            difficulty: this.selectedDifficulty
        }

        this.http.post<HttpResponse<string>>(`${API_URL}/uppskriftir/add`, recipe).subscribe((data: HttpResponse<string>) => {
            if (data.toString() === "CREATED") {
                // FIXME: This is no bueno, check better way for response codes
                this.toastService.success("Recipe added", "Success");
            }
            else {
                this.toastService.error("Recipe not added", "Error");
            }
        })
    }
}