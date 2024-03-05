import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoguletOutletMobileComponent } from './logulet-outlet-mobile.component';

describe('LoguletOutletMobileComponent', () => {
  let component: LoguletOutletMobileComponent;
  let fixture: ComponentFixture<LoguletOutletMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoguletOutletMobileComponent]
    });
    fixture = TestBed.createComponent(LoguletOutletMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
