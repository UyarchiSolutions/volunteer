import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyOtpWebComponent } from './verify-otp-web.component';

describe('VerifyOtpWebComponent', () => {
  let component: VerifyOtpWebComponent;
  let fixture: ComponentFixture<VerifyOtpWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyOtpWebComponent]
    });
    fixture = TestBed.createComponent(VerifyOtpWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
