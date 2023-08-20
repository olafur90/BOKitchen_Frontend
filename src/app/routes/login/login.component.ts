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
import { API_URL } from 'src/environment/environment';
import { AuthService } from 'src/app/services/AuthService';
import { Router } from '@angular/router';

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

	async onLogin() {
		const email = this.emailFormControl.value;
		// const password = bcrypt.hashSync(this.passwordFormControl.value);

		// Will not use encryption / decription for now. 
		// TODO: Implement password hash with new user process
		const password = this.passwordFormControl.value;

		if (email && password) {
			await this.authService.Login(email, password).subscribe({
				next: (result) => {
					this.authenticated = true;
					this.router.navigate(['/']);
				}
			})
		}
	}
}
