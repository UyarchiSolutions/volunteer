import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWebComponent } from './login-web.component';

describe('LoginWebComponent', () => {
  let component: LoginWebComponent;
  let fixture: ComponentFixture<LoginWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginWebComponent]
    });
    fixture = TestBed.createComponent(LoginWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
