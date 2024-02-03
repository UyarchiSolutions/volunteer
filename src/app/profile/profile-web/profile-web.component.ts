import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-profile-web',
  templateUrl: './profile-web.component.html',
  styleUrls: ['./profile-web.component.css'],
})
export class ProfileWebComponent implements OnInit {
  constructor(private api: VolunteerServiceService, private route: Router) {}
  Role: any;
  data: any;
  id: any;
  ngOnInit(): void {
    this.getUserDetails();
  }

  userdata: any = {};

  getUserDetails() {
    this.api.loader = true;
    this.api.getVolunteerDetails().subscribe(
      (e: any) => {
        console.log(e);
        this.Role = e.Role;
        this.id = e._id;
        this.data = e;
        this.api.loader = false;
      },
      (err: any) => {
        this.api.loader = false;
        localStorage.removeItem('volunteer');
        this.route.navigateByUrl('/');
      }
    );
  }
  Edite() {
    this.route.navigateByUrl('/register?id=' + this.id);
  }
}
