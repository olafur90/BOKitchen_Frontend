import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrService } from 'ngx-toastr';
import { Comment } from 'src/app/components/models/Comment';
import { environment } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { User } from 'src/app/components/models/User';

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
        ReactiveFormsModule,
        MatCheckboxModule,
    ]
})
/**
 * The comments component that displays and holds the logic for the comments for a recipe
 * @returns CommentsComponent
 */
export class CommentsComponent implements OnInit {

    // The recipe id
    @Input() recipeId: number = 0;

    // An array to hold the fetched comments for the recipe
	public comments: Comment[] = [];
    public errors: boolean = false;

    /****************** User Data ******************/
    // For letting a user comment anonymously
    public isAnonymous: boolean = false;
    // For checking if a user is logged in
    public authenticated: boolean = false;
    // False while checking if a user is logged in to prevent commenting without being logged in
    public initialized: boolean = false;
    /****************** End of User Data ******************/

    public user: User = {
        name: '',
        picture: '',
    };

    // The form for the comment input from the user
	public commentForm = new FormGroup({
        isAnonymous: new FormControl(false),
		commentBody: new FormControl('', Validators.minLength(3)),
	})

    /**
     * The constructor for initializing Dependency Injection
     * @param http The HTTP client
     * @param toastr The Toaster service
     * @param authService The Auth0 service
     */
    constructor(
		private http: HttpClient,
		private toastr: ToastrService,
        private authService: AuthService
	) {}

    /**
     * The lifecycle hook that fetches the comments for the recipe and sorts them when the component is loaded
     */
    async ngOnInit(): Promise<void> {
        // Fetch comments and reverse sort them to show the most recent first
        this.http.get<Comment[]>(`${environment.API_URL}/uppskriftir/recipe/${this.recipeId}/comments`).subscribe((data) => {
            this.comments = data;
            this.comments = this.comments.reverse();
        })

        // Check if a user is logged in and get their name and profile picture
        this.authService.isAuthenticated$.subscribe((authenticated) => {
            this.authenticated = authenticated;
            if (this.authenticated) {
                this.authService.user$.subscribe((user) => {
                    this.user.name = user?.name as string;
                    this.user.picture = user?.picture as string;
                });
            }
            
            this.initialized = true;
        });
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
            const isAnonymous = this.commentForm.get('isAnonymous')?.value;
            const commentBody = this.commentForm.get('commentBody')?.value;

            const comment: Comment = {
                id: 0,
                userName: isAnonymous ? 'Nafnlaust' : this.user?.name || '',
                commentBody: commentBody !== null && commentBody !== '' ? commentBody as string : '',
                dateCreated: new Date(),
                recipeID: this.recipeId,
            };

            this.http.post(`${environment.API_URL}/uppskriftir/recipe/${this.recipeId}/comments`, comment).subscribe(() => {
                this.toastr.success('Athugasemd móttekin');
                this.commentForm.reset();
                this.commentForm.markAsPristine();
                this.commentForm.updateValueAndValidity();
                this.errors = false;

                // FIXME: Keep in mind that this may not be best practice adding a delay here.
                setTimeout(() => {
                    this.refreshComments();
                }, 600);
            });
		}
        else {
            this.errors = true;
        }
	}
}