import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyOtpMobileComponent } from './verify-otp-mobile.component';

describe('VerifyOtpMobileComponent', () => {
  let component: VerifyOtpMobileComponent;
  let fixture: ComponentFixture<VerifyOtpMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyOtpMobileComponent]
    });
    fixture = TestBed.createComponent(VerifyOtpMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
