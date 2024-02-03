import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosenCandWebComponent } from './choosen-cand-web.component';

describe('ChoosenCandWebComponent', () => {
  let component: ChoosenCandWebComponent;
  let fixture: ComponentFixture<ChoosenCandWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoosenCandWebComponent]
    });
    fixture = TestBed.createComponent(ChoosenCandWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
