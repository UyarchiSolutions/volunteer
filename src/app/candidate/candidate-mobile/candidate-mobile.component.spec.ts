import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateMobileComponent } from './candidate-mobile.component';

describe('CandidateMobileComponent', () => {
  let component: CandidateMobileComponent;
  let fixture: ComponentFixture<CandidateMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateMobileComponent]
    });
    fixture = TestBed.createComponent(CandidateMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
