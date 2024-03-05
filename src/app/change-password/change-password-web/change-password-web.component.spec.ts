import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordWebComponent } from './change-password-web.component';

describe('ChangePasswordWebComponent', () => {
  let component: ChangePasswordWebComponent;
  let fixture: ComponentFixture<ChangePasswordWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordWebComponent]
    });
    fixture = TestBed.createComponent(ChangePasswordWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
