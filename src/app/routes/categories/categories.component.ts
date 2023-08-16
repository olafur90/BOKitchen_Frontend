import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/components/models/Recipe';
import { API_URL } from 'src/environment/environment';

@Component({
    selector: 'app-categories',
    standalone: true,
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    imports: [
        CommonModule
    ]
})
export class CategoriesComponent implements OnInit {
    public recipes: Recipe[] = [];
    public currentCategory: string = '';

    constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.currentCategory = this.activatedRoute.snapshot.params['category'];
        this.http.get<Recipe[]>(`${API_URL}/uppskriftir/flokkar/${this.currentCategory}`).subscribe((data) => {
            if (data) {
                this.recipes = data;
            }
        })
    }
}