import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-forgot-password-web',
  templateUrl: './forgot-password-web.component.html',
  styleUrls: ['./forgot-password-web.component.css']
})
export class ForgotPasswordWebComponent implements OnInit {
  constructor(
    private Aroute: ActivatedRoute,
    private Api: VolunteerServiceService,
    private route: Router
  ) {}

  email: any = null;
  
  ngOnInit(): void {
    this.Aroute.queryParams.subscribe((e: any) => {
      this.email = e.email;
      console.log(this.email);
    });
  }

  submitted: any = false;

  setPasswordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  confErr: any = null;
}
