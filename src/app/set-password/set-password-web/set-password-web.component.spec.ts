import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPasswordWebComponent } from './set-password-web.component';

describe('SetPasswordWebComponent', () => {
  let component: SetPasswordWebComponent;
  let fixture: ComponentFixture<SetPasswordWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetPasswordWebComponent]
    });
    fixture = TestBed.createComponent(SetPasswordWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
