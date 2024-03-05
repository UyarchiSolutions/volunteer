import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoguletOutletWebComponent } from './logulet-outlet-web.component';

describe('LoguletOutletWebComponent', () => {
  let component: LoguletOutletWebComponent;
  let fixture: ComponentFixture<LoguletOutletWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoguletOutletWebComponent]
    });
    fixture = TestBed.createComponent(LoguletOutletWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
