import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreRecentRecipesComponent } from './more-recent-recipes.component';

describe('MoreRecentRecipesComponent', () => {
  let component: MoreRecentRecipesComponent;
  let fixture: ComponentFixture<MoreRecentRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreRecentRecipesComponent]
    });
    fixture = TestBed.createComponent(MoreRecentRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
