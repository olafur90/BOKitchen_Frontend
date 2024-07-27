import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirFryerComponent } from './air-fryer.component';

describe('AirFryerComponent', () => {
  let component: AirFryerComponent;
  let fixture: ComponentFixture<AirFryerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AirFryerComponent]
    });
    fixture = TestBed.createComponent(AirFryerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
