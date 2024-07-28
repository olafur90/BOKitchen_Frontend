import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Category } from '../models/Category';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
	selector: 'app-header-component',
	standalone: true,
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	imports: [
		CommonModule,
		FormsModule,
		MatButtonModule,
		MatMenuModule,
		RouterModule,
		MatIconModule,
	],
})
export class HeaderComponent implements OnInit {
	public searchTerm: string = '';

	public categories: Category[] = [];
	public username: string = ''; // TODO: Get the username from the auth0 service
	
	public authenticated: boolean = false;

	// Will store the user from the auth0 service
	public user?: User;

	constructor(
		private router: Router,
		private http: HttpClient,
		private authService: AuthService
	) {}

	/**
	 * Navigates to the search page with the search term
	 * FIXME: Currently not using
	 */
	async onSearch() {
		this.router.navigate(['/']).then(() => {
			this.router.navigate(['/search'], {
				queryParams: { query: this.searchTerm },
			});
		})
	}

	/**
	 * Fetches the components from the API and sets the variables before 
	 * the component is initialized
	 */
	ngOnInit(): void {
		this.http.get<Category[]>(`${environment.API_URL}/flokkar/`).subscribe((data) => {
			if (data) {
				this.categories = data;
			}
		});

		this.authService.isAuthenticated$.subscribe((authenticated) => {
			this.authenticated = authenticated;

			this.authService.user$.subscribe((user) => {
				if (user) {
					this.user = user;
				}
			});
			this.authService.idTokenClaims$.subscribe((user) => {
				console.log(user);
			})
		});
	}

	/**
	 * Logs the user in using the Auth0 service
	 */
	login() {
		this.authService.loginWithPopup({
			authorizationParams: {
				redirect_uri: window.location.origin
			}
		});
	}

	/**
	 * Logs the user out using the Auth0 service
	 */
	logout() {
		this.authService.logout({
			logoutParams: {
				returnTo: window.location.origin
			}
		})
	}
}
