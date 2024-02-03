import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingWebComponent } from './rating-web.component';

describe('RatingWebComponent', () => {
  let component: RatingWebComponent;
  let fixture: ComponentFixture<RatingWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingWebComponent]
    });
    fixture = TestBed.createComponent(RatingWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
