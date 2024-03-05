import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';
@Component({
  selector: 'app-set-password-web',
  templateUrl: './set-password-web.component.html',
  styleUrls: ['./set-password-web.component.css'],
})
export class SetPasswordWebComponent implements OnInit {
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

  setPassword() {
    this.submitted = true;
    if (
      this.setPasswordForm.get('password')?.value !=
      this.setPasswordForm.get('confirmPassword')?.value
    ) {
      this.confErr = '* Passwords do NOT match!';
    } else {
      this.confErr = null;
    }
    let data = { ...this.setPasswordForm.value, ...{ email: this.email } };
    
    if (this.setPasswordForm.valid && this.confErr == null) {
      this.Api.setpassword(data).subscribe(
        (e: any) => {
          console.log(e);
         
          this.route.navigateByUrl('/');
        },
        (err: any) => {
         
        }
      );
    }
  }
}
