import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-guard/authguard.service';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-profile-mobile',
  templateUrl: './profile-mobile.component.html',
  styleUrls: ['./profile-mobile.component.css'],
})
export class ProfileMobileComponent implements OnInit {
  constructor(private Api: VolunteerServiceService, private route: Router, private auth: AuthService) { }
  Role: any;
  id: any;
  data: any;
  ngOnInit(): void {
    this.getUserDetails();
  }

  userdata: any = {};
  getUserDetails() {
    this.Api.getVolunteerDetails().subscribe(
      (e: any) => {
        console.log(e);
        this.Role = e.Role;
        this.id = e._id;
        this.data = e;
      },
      (err: any) => {


      }
    );
  }
  Edite() {
    this.route.navigateByUrl('/register?id=' + this.id);
  }

  log_out() {
    this.auth.logout();
  }
}
