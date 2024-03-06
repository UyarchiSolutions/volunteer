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
  ) { }



  ngOnInit(): void {

  }

  submitted: any = false;


  text: any = new FormControl(null, Validators.required);
  error: any;
  submit() {
    this.error = null;
    this.submitted = true;
    if (this.text.valid) {
      this.submitted = false;
      this.Api.forget_passpwrd({ text: this.text.value }).subscribe((res: any) => {
        this.route.navigateByUrl('/verify-otp?id=' + res.id)
      }, error => {
        this.error = error.error.message;
      })
    }
  }
}
