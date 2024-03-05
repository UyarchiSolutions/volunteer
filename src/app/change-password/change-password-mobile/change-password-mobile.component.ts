import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-change-password-mobile',
  templateUrl: './change-password-mobile.component.html',
  styleUrls: ['./change-password-mobile.component.css']
})
export class ChangePasswordMobileComponent {
  constructor(
    private api: VolunteerServiceService,
    private router: Router,
    private Aroute: ActivatedRoute
  ) { }
  id: any;
  ngOnInit(): void {
    this.Aroute.queryParams.subscribe((q: any) => {
      this.id = q.id;
    });
  }

  SetPasswordForm = new FormGroup({
    oldpassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
  });

  submitted: boolean = false;
  serverErr: any = null;
  Notmatched: boolean = false;

  submitPassword() {
    this.submitted = true;
    if (this.submitted && this.SetPasswordForm.valid) {
      if (
        this.SetPasswordForm.get('password')?.value ===
        this.SetPasswordForm.get('confirmpassword')?.value
      ) {

        this.api.change_password(this.SetPasswordForm.value).subscribe((e: any) => {
          localStorage.removeItem('volunteer')
          this.router.navigateByUrl('/', { replaceUrl: true });
        }, (error: any) => {
          this.serverErr = error.error.message;
        });
        this.Notmatched = false;
      } else {
        console.log('Not matched');
        this.Notmatched = true;
      }
    }
  }
}
