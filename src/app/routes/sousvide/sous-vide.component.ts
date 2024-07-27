import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import * as JsonCategories from './hitatafla.json';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { SouseVideFoodType as FoodType } from './MeatType';

/**
 * The sous-vide component that displays and holds the logic for the sous-vide
 */
@Component({
    selector: 'app-sous-vide',
    templateUrl: './sous-vide.component.html',
    styleUrls: ['./sous-vide.component.scss'],
    standalone: true, 
    imports: [
        CommonModule,
        MatExpansionModule,
        MatTableModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SousVideComponent implements OnInit {

    // An array to keep the state of the panels for each food type
    panelOpenState: boolean[] = [];
    
    rawJsonData: any = JsonCategories;
    foodTypes: FoodType[] = [];

    /**
     * Initializes the component with the data from the JSON file
     */
    ngOnInit(): void {
        this.rawJsonData.data.forEach((element: FoodType, index: number) => {
            this.foodTypes.push(element);
            this.panelOpenState[index] = false;
        });
    }

    /**
     * Sets the state of the panel - Open/Closed
     * @param index The index of the panel
     * @param state The state of the panel
     */
    setPanelState(index: number, state: boolean): void {
        this.panelOpenState[index] = state;
    }

    /**
     * For checking if the indexed panel is open or closed
     * @param index The index of the panel
     * @returns The state of the panel - Open/Closed
     */
    isPanelOpen(index: number): boolean {
        return this.panelOpenState[index];
    }
}



