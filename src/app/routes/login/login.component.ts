import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@auth0/auth0-angular';

@Component({
	selector: 'app-login-component',
	standalone: true,
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	imports: [
		MatInputModule,
		MatFormFieldModule,
		CommonModule,
		MatButtonModule
	]
})
export class LoginComponent implements OnInit {
	authenticated = false;
	initialized = false;

	constructor(private authService: AuthService) {}

	async ngOnInit(): Promise<void> {
		this.authService.isAuthenticated$.subscribe((authenticated) => {
			this.authenticated = authenticated;
			this.initialized = true;
		});
	}

	login() {
		this.authService.loginWithPopup({
			authorizationParams: {
				redirect_uri: window.location.origin
			}
		});
	}

	logout() {
		this.authService.logout({
			logoutParams: {
				returnTo: window.location.origin
			}
		})
	}
}
