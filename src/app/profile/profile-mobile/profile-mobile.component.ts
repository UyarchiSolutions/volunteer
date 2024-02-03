import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-profile-mobile',
  templateUrl: './profile-mobile.component.html',
  styleUrls: ['./profile-mobile.component.css'],
})
export class ProfileMobileComponent implements OnInit {
  constructor(private Api: VolunteerServiceService, private route:Router) {}
  Role: any;
  id:any;
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
        this.Api.loader = false;
        localStorage.removeItem('volunteer');
        this.route.navigateByUrl('/');
      }
    );
  }
  Edite() {
    this.route.navigateByUrl('/register?id=' + this.id);
  }
}
