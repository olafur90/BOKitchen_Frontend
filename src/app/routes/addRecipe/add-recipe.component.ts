import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
	FormsModule,
	ReactiveFormsModule,
	FormControl,
	FormGroup,
} from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Recipe } from 'src/app/components/models/Recipe';
import { environment } from 'src/environments/environment';
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
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
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
		DifficultyReversePipe,
	],
	providers: [DifficultyPipe, DifficultyReversePipe],
})
export class AddRecipeComponent implements OnInit {
	public name: string = '';
	public shortDescription: string = '';
	public htmlContent = '';

	public selectedCategory: Category | null = null;
	public selectedServingSize: number = 0;
	public selectedTime: number = 0;
	public selectedDifficulty: Difficulty = Difficulty.EASY;
	public selectedDifficultyAsText: string = '';

	public previewContent: SafeHtml = '';

	private user: User = {
		name: '-',
		picture: '-',
	};

	// Form group for controlling the input fields
	recipeFormGroup = new FormGroup({
		name: new FormControl(''),
		summary: new FormControl(''),
		description: new FormControl(''),
		category: new FormControl(null),
		servingSize: new FormControl(null),
		time: new FormControl(null),
		difficulty: new FormControl(null),
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
			{ class: 'arial', name: 'Arial' },
			{ class: 'times-new-roman', name: 'Times New Roman' },
			{ class: 'calibri', name: 'Calibri' },
			{ class: 'comic-sans-ms', name: 'Comic Sans MS' },
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
			],
		],
	};

	/**
	 * The constructor for the component - Initialize services
	 * @param sanitizer The sanitizer service for sanitizing HTML
	 * @param http The http client
	 * @param diffPipe The difficulty pipe
	 * @param toastService The toast service
	 * @param authService The Auth0 auth service
	 */
	constructor(
		private sanitizer: DomSanitizer,
		private http: HttpClient,
		private diffPipe: DifficultyReversePipe,
		private toastService: ToastrService,
		private authService: AuthService
	) {}

	/**
	 * Called when the component is initialized
	 */
	ngOnInit(): void {
		this.authService.user$.subscribe((user) => {
			this.user = user ? user : this.user;
		});
	}

	/**
	 * Called when the name input is changed
	 * @param input The name input
	 */
	onNameChange(input: string) {
		this.name = input;
	}

	/**
	 * Called when the content of the editor is changed
	 */
	onContentChange() {
		this.previewContent = this.sanitizer.bypassSecurityTrustHtml(
			this.htmlContent,
		);
	}

	/**
	 * Called when a category is selected in the form.
	 * @param event The selected category
	 */
	onCategoryChange(event: any): void {
		this.selectedCategory = event as Category;
	}

	/**
	 * Called when a serving size is selected in the form.
	 * @param event The selected serving size
	 */
	onSelectServingSize(event: any): void {
		this.selectedServingSize = event as number;
	}

	/**
	 * Called when a time is selected in the form.
	 * @param event The selected time
	 */
	onSelectTime(event: any): void {
		this.selectedTime = event as number;
	}

	/**
	 * Called when a difficulty is selected in the form.
	 * @param event The selected difficulty
	 */
	onSelectDifficulty(event: any): void {
		this.selectedDifficulty = event as Difficulty;
		this.selectedDifficultyAsText = this.diffPipe.transform(
			this.selectedDifficulty,
		);
	}

	/**
	 * The handler for sending the recipe to the backend when the add button is clicked
	 */
	onAddRecipe() {
		// Create a local recipe to send with the POST request
		const recipe: Recipe = {
			name: this.name,
			instructions: this.htmlContent,
			timeToCookInMinutes: this.selectedTime,
			forNumberOfPeople: this.selectedServingSize,
			cat: this.selectedCategory
				? this.selectedCategory
				: undefined,
			difficulty: this.selectedDifficulty,
			user: this.user,
			category: this.selectedCategory?.name
		};

		// Send the POST request to the API with the local recipe
		// Then show a success or error message depending on the response from the API
		this.http
			.post<HttpResponse<string>>(`${environment.API_URL}/uppskriftir/add`, recipe)
			.subscribe((data: HttpResponse<string>) => {
				if (data.toString() === 'CREATED') {
					this.toastService.success('Uppskrift móttekin.', 'Success');
				} else {
					this.toastService.error('Villa kom upp.', 'Error');
				}
			});
	}
}
