import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosenCandMobComponent } from './choosen-cand-mob.component';

describe('ChoosenCandMobComponent', () => {
  let component: ChoosenCandMobComponent;
  let fixture: ComponentFixture<ChoosenCandMobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoosenCandMobComponent]
    });
    fixture = TestBed.createComponent(ChoosenCandMobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
