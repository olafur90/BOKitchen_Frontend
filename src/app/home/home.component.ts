import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { LatestRecipesComponent } from './latest-recipes/latest-recipes.component';

@Component({
    selector: 'app-home-component',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        HeaderComponent,
        LatestRecipesComponent
    ]
})
export class HomeComponent {
    
}