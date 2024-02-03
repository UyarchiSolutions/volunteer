import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWebComponent } from './profile-web.component';

describe('ProfileWebComponent', () => {
  let component: ProfileWebComponent;
  let fixture: ComponentFixture<ProfileWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileWebComponent]
    });
    fixture = TestBed.createComponent(ProfileWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
