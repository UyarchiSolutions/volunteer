import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailWebComponent } from './mail-web.component';

describe('MailWebComponent', () => {
  let component: MailWebComponent;
  let fixture: ComponentFixture<MailWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailWebComponent]
    });
    fixture = TestBed.createComponent(MailWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
