import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthcheckService } from 'src/app/auth-guard/authcheck.service';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';
@Component({
  selector: 'app-login-web',
  templateUrl: './login-web.component.html',
  styleUrls: ['./login-web.component.css'],
})
export class LoginWebComponent implements OnInit {
  constructor(private route: Router, private Api: VolunteerServiceService, private authcheck: AuthcheckService) { }
  ngOnInit(): void {
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
      this.Api.login(this.loginForm.value).subscribe(
        (e: any) => {
          localStorage.setItem('volunteer', e.access.token);
          this.authcheck.get_userDetails();
          this.route.navigateByUrl('/candidate');
        },
        (err: any) => {
          this.serverErr = err.error.message;

        }
      );
    }
  }
}
