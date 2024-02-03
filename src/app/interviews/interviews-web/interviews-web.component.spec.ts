import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewsWebComponent } from './interviews-web.component';

describe('InterviewsWebComponent', () => {
  let component: InterviewsWebComponent;
  let fixture: ComponentFixture<InterviewsWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewsWebComponent]
    });
    fixture = TestBed.createComponent(InterviewsWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
