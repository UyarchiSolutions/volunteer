import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOutletComponent } from './auth-outlet.component';

describe('AuthOutletComponent', () => {
  let component: AuthOutletComponent;
  let fixture: ComponentFixture<AuthOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthOutletComponent]
    });
    fixture = TestBed.createComponent(AuthOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
