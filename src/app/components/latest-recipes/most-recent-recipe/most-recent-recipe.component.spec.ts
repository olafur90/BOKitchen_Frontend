import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRecentRecipeComponent } from './most-recent-recipe.component';

describe('MostRecentRecipeComponent', () => {
  let component: MostRecentRecipeComponent;
  let fixture: ComponentFixture<MostRecentRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostRecentRecipeComponent]
    });
    fixture = TestBed.createComponent(MostRecentRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
