import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordMobileComponent } from './change-password-mobile.component';

describe('ChangePasswordMobileComponent', () => {
  let component: ChangePasswordMobileComponent;
  let fixture: ComponentFixture<ChangePasswordMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordMobileComponent]
    });
    fixture = TestBed.createComponent(ChangePasswordMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
