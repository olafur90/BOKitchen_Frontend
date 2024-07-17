import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Category } from '../models/Category';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';

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
	public loginLink: string = '';
	public searchTerm: string = '';

	public categories: Category[] = [];
	public username: string = '';
	
	public authenticated: boolean = false;

	constructor(
		private router: Router,
		private http: HttpClient,
		private authService: AuthService
	) {}

	async onSearch() {
		this.router.navigate(['/']).then(() => {
			this.router.navigate(['/search'], {
				queryParams: { query: this.searchTerm },
			});
		})
	}

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
					this.username = user.name as string;
				}
			});
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
