import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../models/Category';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
		MatIconModule,
	],
})
export class HeaderComponent implements OnInit {
	public loginLink: string = '';
	public searchTerm: string = '';

	public categories: Category[] = [];

	constructor(
		private router: Router,
		private http: HttpClient,
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
	}

	onCategoryClick(category: Category) {
		this.router.navigate(['/']).then(() => {
			this.router.navigate([`/uppskriftir/flokkar/${category.name}`]);
		});
	}
}
