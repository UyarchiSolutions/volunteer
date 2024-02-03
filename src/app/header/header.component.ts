import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private api: VolunteerServiceService, private route: Router) {}

  ngOnInit(): void {
    this.checkMenuVisible();
    this.getVolunteer();
  }

  name: any = localStorage.getItem('volunteername');
  profImg: any = localStorage.getItem('volunteerprofileImage');

  getVolunteer() {
    this.api.getVolunteerDetails().subscribe((e: any) => {
      localStorage.setItem('volunteerprofileImage', e.profileImage);
      localStorage.setItem('volunteername', e.name);
    });
  }
  showMenu: any = true;
  checkMenuVisible() {
    let token = localStorage.getItem('volunteer');
    if (token) {
      this.showMenu = true;
    } else {
      this.showMenu = false;
    }
  }
  logout() {
    localStorage.removeItem('volunteer');
    localStorage.removeItem('volunteerprofileImage');
    localStorage.removeItem('volunteername');
    this.route.navigateByUrl('/');
  }
}
