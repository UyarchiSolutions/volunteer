import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordWebComponent } from './forgot-password-web.component';

describe('ForgotPasswordWebComponent', () => {
  let component: ForgotPasswordWebComponent;
  let fixture: ComponentFixture<ForgotPasswordWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordWebComponent]
    });
    fixture = TestBed.createComponent(ForgotPasswordWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
