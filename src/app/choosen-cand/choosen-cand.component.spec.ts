import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosenCandComponent } from './choosen-cand.component';

describe('ChoosenCandComponent', () => {
  let component: ChoosenCandComponent;
  let fixture: ComponentFixture<ChoosenCandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoosenCandComponent]
    });
    fixture = TestBed.createComponent(ChoosenCandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
