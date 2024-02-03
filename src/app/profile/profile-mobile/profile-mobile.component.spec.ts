import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMobileComponent } from './profile-mobile.component';

describe('ProfileMobileComponent', () => {
  let component: ProfileMobileComponent;
  let fixture: ComponentFixture<ProfileMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileMobileComponent]
    });
    fixture = TestBed.createComponent(ProfileMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
