import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordMobileComponent } from './forgot-password-mobile.component';

describe('ForgotPasswordMobileComponent', () => {
  let component: ForgotPasswordMobileComponent;
  let fixture: ComponentFixture<ForgotPasswordMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordMobileComponent]
    });
    fixture = TestBed.createComponent(ForgotPasswordMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
