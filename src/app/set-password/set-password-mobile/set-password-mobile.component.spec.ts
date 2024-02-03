import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPasswordMobileComponent } from './set-password-mobile.component';

describe('SetPasswordMobileComponent', () => {
  let component: SetPasswordMobileComponent;
  let fixture: ComponentFixture<SetPasswordMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetPasswordMobileComponent]
    });
    fixture = TestBed.createComponent(SetPasswordMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
