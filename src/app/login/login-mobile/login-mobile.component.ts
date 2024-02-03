import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-login-mobile',
  templateUrl: './login-mobile.component.html',
  styleUrls: ['./login-mobile.component.css'],
})
export class LoginMobileComponent implements OnInit {
  constructor(private route: Router, private Api: VolunteerServiceService) {}

  ngOnInit(): void {
    this.autoNavigate();
  }

  autoNavigate() {
    let token = localStorage.getItem('volunteer');
    if (token) {
      this.route.navigateByUrl('/candidate');
    }
  }

  signUp() {
    this.route.navigateByUrl('/register');
  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submitted: any = false;
  serverErr:any = null
  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.Api.loader = true;
      this.Api.login(this.loginForm.value).subscribe(
        (e: any) => {

          this.submitted = false;
          this.Api.loader = false;
          localStorage.setItem('volunteer', e.access.token);

          this.route.navigateByUrl('/candidate');
        },
        (err: any) => {
          this.serverErr = err.error.message;
          this.Api.loader = false;
        }
      );
    }
  }
}
