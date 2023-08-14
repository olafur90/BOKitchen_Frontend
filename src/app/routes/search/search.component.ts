import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../components/models/Recipe';
import { API_URL } from 'src/environment/environment';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-search-component',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    imports: [
        CommonModule,
        MatCardModule,
        RouterModule
    ]
})
export class SearchComponent implements OnInit {
    searchResults: Recipe[] = [];
    searchTerm: string = '';
    
    constructor(private http: HttpClient, private route: ActivatedRoute) {
        
    }

    async ngOnInit(): Promise<void> {
        const searchParam: string = this.searchTerm = this.route.snapshot.queryParams['query'];
        await this.http.get<Recipe[]>(`${API_URL}/uppskriftir/search`, { 
            params: { query: searchParam } 
        }).subscribe((data: Recipe[]) => {
            this.searchResults = data;
        });
    }
}