import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { Comment } from 'src/app/components/models/Comment';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-comments-component',
    standalone: true,
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ]
})
/**
 * The comments component that displays and holds the logic for the comments for a recipe
 */
export class CommentsComponent implements OnInit {
    
    // The recipe id
    @Input()
    recipeId: number = 0;

    @ViewChild('formDirective') 
    private formDirective: NgForm | undefined;

    // An array to hold the fetched comments for the recipe
	public comments: Comment[] = [];

    public errors: boolean = false;

    // The form for the comment input from the user
	commentForm = new FormGroup({
		name: new FormControl('', Validators.minLength(3)),
		commentBody: new FormControl('', Validators.minLength(3)),
	})

    /**
     * The constructor
     * @param http The HTTP client
     * @param toastr The Toaster service
     */
    constructor(
		private http: HttpClient,
		private toastr: ToastrService
	) {}

    /**
     * The lifecycle hook that fetches the comments for the recipe and sorts them when the component is loaded
     */
    async ngOnInit(): Promise<void> {
        this.http.get<Comment[]>(`${environment.API_URL}/uppskriftir/recipe/${this.recipeId}/comments`).subscribe((data) => {
            this.comments = data;
            this.comments = this.comments.reverse();
        })
    }

    /**
     * Refreshes the comments component when it is called after updates have been made
     * this.ngOnInit() could be called directly, but I find the code more readable with this method name
     */
    refreshComments() {
        this.ngOnInit();
    }

    /**
     * A handler for the submit button for posting a new comment
     */
    onSubmit(): void {
		if (this.commentForm.valid) {
			const name = this.commentForm.get('name')?.value;
			const commentBody = this.commentForm.get('commentBody')?.value;
			
			const comment: Comment = {}
			comment.userName = name !== null ? name : '';
			comment.commentBody = commentBody !== null ? commentBody : '';
			comment.recipeID = this.recipeId;
			
			this.http.post(`${environment.API_URL}/uppskriftir/recipe/${this.recipeId}/comments`, comment).subscribe();
		
            this.commentForm.reset();
            this.commentForm.markAsPristine();
            this.commentForm.updateValueAndValidity();
			
			this.toastr.success('Athugasemd móttekin');
            this.errors = false;
            setTimeout(() => {
                this.refreshComments();
            }, 600);
		}
        else {
            this.errors = true;
        }
	}
}