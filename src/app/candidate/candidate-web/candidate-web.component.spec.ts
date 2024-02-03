import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateWebComponent } from './candidate-web.component';

describe('CandidateWebComponent', () => {
  let component: CandidateWebComponent;
  let fixture: ComponentFixture<CandidateWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateWebComponent]
    });
    fixture = TestBed.createComponent(CandidateWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
