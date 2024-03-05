import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';
import { AuthService } from '../auth-guard/authguard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  vname!: string;

  constructor(private api: VolunteerServiceService, private route: Router, private authcheck: AuthService) { }

  ngOnInit(): void {
    this.getVolunteer();
  }

  name: any = localStorage.getItem('volunteername');
  profImg: any = localStorage.getItem('volunteerprofileImage');
  userDetails: any;
  getVolunteer() {
    this.api.getVolunteerDetails().subscribe((e: any) => {
      this.userDetails = e; 
    });
  }
  showMenu: any = true;

  logout() {
    this.authcheck.logout();
  }
}
