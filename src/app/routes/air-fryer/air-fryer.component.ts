import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import * as JsonCategories from './hitatafla.json';
import { AirFryerFoodType } from './AirFryerFoodType';

@Component({
  selector: 'app-air-fryer',
  standalone: true,
  templateUrl: './air-fryer.component.html',
  styleUrls: ['./air-fryer.component.scss'],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTableModule
],
})
export class AirFryerComponent {
  // An array to keep the state of the panels for each food type
  panelOpenState: boolean[] = [];
  rawJsonData: any = JsonCategories;
  foodTypes: AirFryerFoodType[] = [];

  /**
   * Initializes the component with the data from the JSON file
   */
  ngOnInit(): void {
      this.rawJsonData.data.forEach((element: AirFryerFoodType, index: number) => {
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
