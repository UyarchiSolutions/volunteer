import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOutletWebComponent } from './auth-outlet-web.component';

describe('AuthOutletWebComponent', () => {
  let component: AuthOutletWebComponent;
  let fixture: ComponentFixture<AuthOutletWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthOutletWebComponent]
    });
    fixture = TestBed.createComponent(AuthOutletWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
