import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-change-password-web',
  templateUrl: './change-password-web.component.html',
  styleUrls: ['./change-password-web.component.css']
})
export class ChangePasswordWebComponent {
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
