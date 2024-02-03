import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailMobileComponent } from './mail-mobile.component';

describe('MailMobileComponent', () => {
  let component: MailMobileComponent;
  let fixture: ComponentFixture<MailMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailMobileComponent]
    });
    fixture = TestBed.createComponent(MailMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
