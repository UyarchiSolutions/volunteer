import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWebComponent } from './register-web.component';

describe('RegisterWebComponent', () => {
  let component: RegisterWebComponent;
  let fixture: ComponentFixture<RegisterWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterWebComponent]
    });
    fixture = TestBed.createComponent(RegisterWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
