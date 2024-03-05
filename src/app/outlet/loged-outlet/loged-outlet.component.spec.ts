import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogedOutletComponent } from './loged-outlet.component';

describe('LogedOutletComponent', () => {
  let component: LogedOutletComponent;
  let fixture: ComponentFixture<LogedOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogedOutletComponent]
    });
    fixture = TestBed.createComponent(LogedOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
