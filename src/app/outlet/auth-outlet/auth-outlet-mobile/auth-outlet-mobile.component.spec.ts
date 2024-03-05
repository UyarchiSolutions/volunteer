import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOutletMobileComponent } from './auth-outlet-mobile.component';

describe('AuthOutletMobileComponent', () => {
  let component: AuthOutletMobileComponent;
  let fixture: ComponentFixture<AuthOutletMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthOutletMobileComponent]
    });
    fixture = TestBed.createComponent(AuthOutletMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
