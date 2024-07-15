import { Component } from '@angular/core';
import {
	FormControl,
	FormGroupDirective,
	NgForm,
	Validators,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
	selector: 'app-login-component',
	standalone: true,
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		CommonModule,
		MatButtonModule
	]
})
export class LoginComponent {
	emailFormControl = new FormControl('', [Validators.required, Validators.email]);
	passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  	matcher = new MyErrorStateMatcher();

	authenticated = false;

	constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

	async login() {
		this.authService.loginWithRedirect();
		/*
		this.authService.logout({
			logoutParams: {
				returnTo: window.location.origin
			}
		})
		*/
	}
}
