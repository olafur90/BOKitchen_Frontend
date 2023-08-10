import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IRecipe } from '../../components/models/IRecipe';
import { API_URL } from 'src/environment/environment';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-search-component',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    imports: [
        CommonModule
    ]
})
export class SearchComponent implements OnInit {
    searchResults: IRecipe[] = [];
    
    constructor(private http: HttpClient, private route: ActivatedRoute) {
        
    }

    async ngOnInit(): Promise<void> {
        const searchParam: string = this.route.snapshot.queryParams['query'];
        await this.http.get<IRecipe[]>(`${API_URL}/uppskriftir/search`, { params: { query: searchParam } }).subscribe((data: IRecipe[]) => {
            this.searchResults = data;
        });
    }
}