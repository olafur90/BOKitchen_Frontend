import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRecipesComponent } from './filter-recipes.component';

describe('FilterRecipesComponent', () => {
  let component: FilterRecipesComponent;
  let fixture: ComponentFixture<FilterRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterRecipesComponent]
    });
    fixture = TestBed.createComponent(FilterRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
