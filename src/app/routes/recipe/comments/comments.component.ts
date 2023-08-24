import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
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
export class CommentsComponent implements OnInit {
    @Input()
    recipeId: number = 0;

    
	public comments: Comment[] = [];

	commentForm = new FormGroup({
		name: new FormControl(''),
		commentBody: new FormControl(''),
	})

    constructor(
		private http: HttpClient,
		private toastr: ToastrService
	) {}

    async ngOnInit(): Promise<void> {
        this.http.get<Comment[]>(`${environment.API_URL}/uppskriftir/recipe/${this.recipeId}/comments`).subscribe((data) => {
            this.comments = data;
            this.comments = this.comments.reverse();
        })
    }

    refreshComments() {
        this.ngOnInit();
    }

    onSubmit() {
		if (this.commentForm.valid) {
			const name = this.commentForm.get('name')?.value;
			const commentBody = this.commentForm.get('commentBody')?.value;
			
			const comment: Comment = {}
			comment.userName = name !== null ? name : '';
			comment.commentBody = commentBody !== null ? commentBody : '';
			comment.recipeID = this.recipeId;
			
			this.http.post(`${environment.API_URL}/uppskriftir/recipe/${this.recipeId}/comments`, comment).subscribe();
		
			this.commentForm.reset();
			
			this.toastr.success('Athugasemd móttekin');

            setTimeout(() => {
                this.refreshComments();
            }, 600);
		}
	}
}