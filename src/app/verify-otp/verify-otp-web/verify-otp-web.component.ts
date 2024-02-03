import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-verify-otp-web',
  templateUrl: './verify-otp-web.component.html',
  styleUrls: ['./verify-otp-web.component.css'],
})
export class VerifyOtpWebComponent implements OnInit, OnDestroy {
  constructor(
    private api: VolunteerServiceService,
    private route: Router,
    private Aroute: ActivatedRoute
  ) {}
  id: any;
  ngOnInit(): void {
    this.Aroute.queryParams.subscribe((e: any) => {
      this.id = e.id;
    });
    this.sendOTP();
  }

  sendOTP() {
    console.log(this.id);
    if (this.id) {
      this.api.SendOTP(this.id).subscribe((res: any) => {
        this.targetTime = res.otpExpiedTime;
        this.tickTock();
      });
    }
  }

  resendOtp() {
    this.api.SendOTP(this.id).subscribe((res: any) => {
      if (res != null) {
        this.targetTime = res.otpExpiedTime;
        if (this.countDown != null) {
          this.countDown.unsubscribe();
        }
        this.tickTock();
      }
    });
  }

  targetTime: any;
  counter: any = 0;
  countDown: any;

  tickTock() {
    var startDate = new Date();
    var endDate = new Date(this.targetTime);
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    this.counter = Math.floor(seconds) + 2;
    this.countDown = timer(0, 1000).subscribe(() => {
      --this.counter;
      if (this.counter == 0) {
        this.countDown.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.countDown.unsubscribe();
  }
  otpForm = new FormGroup({
    OTP: new FormControl('', Validators.required),
  });

  submitted: boolean = false;
  serverErr: any = null;
  OTPSubmit() {
    this.submitted = true;
    if (this.otpForm.valid) {
      this.submitted = false;
      this.api.loader = true;
      let data = { OTP: this.otpForm.get('OTP')?.value, id: this.id };
      this.api.VerifyOTP(data).subscribe(
        (e: any) => {
          this.api.loader = false;
          this.route.navigateByUrl('/set-password?email=' + e.email);
        },
        (err: any) => {
          this.api.loader = false;
          this.serverErr = err.error.message;
        }
      );
    }
  }
}
