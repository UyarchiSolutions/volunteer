import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewsMobileComponent } from './interviews-mobile.component';

describe('InterviewsMobileComponent', () => {
  let component: InterviewsMobileComponent;
  let fixture: ComponentFixture<InterviewsMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewsMobileComponent]
    });
    fixture = TestBed.createComponent(InterviewsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
