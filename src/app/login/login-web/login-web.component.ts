import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';
@Component({
  selector: 'app-login-web',
  templateUrl: './login-web.component.html',
  styleUrls: ['./login-web.component.css'],
})
export class LoginWebComponent implements OnInit {
  constructor(private route: Router, private Api: VolunteerServiceService) {}
  ngOnInit(): void {
    this.autoNavigate();
  }
  autoNavigate() {
    let token = localStorage.getItem('volunteer');
    if (token) {
      this.route.navigateByUrl('/candidate');
    } else {
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
  serverErr: any = null;
    login() {
      this.submitted = true;
      if (this.loginForm.valid) {
        this.Api.loader = true;

        this.Api.login(this.loginForm.value).subscribe(
          (e: any) => {
            localStorage.setItem('volunteer', e.access.token);
            this.Api.loader = false;
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
