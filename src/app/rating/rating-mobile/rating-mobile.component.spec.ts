import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingMobileComponent } from './rating-mobile.component';

describe('RatingMobileComponent', () => {
  let component: RatingMobileComponent;
  let fixture: ComponentFixture<RatingMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingMobileComponent]
    });
    fixture = TestBed.createComponent(RatingMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
