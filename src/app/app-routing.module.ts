import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ProfileComponent } from './profile/profile.component';
import { CandidateComponent } from './candidate/candidate.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { MailVerificationComponent } from './mail-verification/mail-verification.component';
import { RatingComponent } from './rating/rating.component';
import { ChoosenCandComponent } from './choosen-cand/choosen-cand.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthOutletComponent } from './outlet/auth-outlet/auth-outlet.component';
import { LogedOutletComponent } from './outlet/loged-outlet/loged-outlet.component';
import { EditprofileComponent } from './Editprofile/register.component';
import { AuthService } from './auth-guard/authguard.service';
import { NoAuthGuard } from './auth-guard/noauthguard.service';
import { VideoUploadComponent } from './videoupload/video-upload/video-upload.component';

const routes: Routes = [
  {
    path: "", component: AuthOutletComponent, children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'verify-otp',
        component: VerifyOtpComponent,
      },
      {
        path: 'set-password',
        component: SetPasswordComponent,
      },
      {
        path: 'mail-send',
        component: MailVerificationComponent,
      },
    ],
    canActivate: [NoAuthGuard]
  },
  {
    path: "", component: LogedOutletComponent, children: [

      {
        path: 'profile',

        children: [
          { path: "", component: ProfileComponent },
          {
            path: 'edit',
            component: EditprofileComponent,
          },
        ]
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'candidate',
        component: CandidateComponent,
      },
      {
        path: 'interview',
        component: InterviewsComponent,
      },
      {
        path: 'upload/:id',
        component: VideoUploadComponent,
      },
      {
        path: 'verify-otp',
        component: VerifyOtpComponent,
      },
      {
        path: 'cand-rating',
        component: RatingComponent,
      },
      {
        path: 'choosen-cand',
        component: ChoosenCandComponent,
      },

    ],
    canActivate: [AuthService]
  },
  {
    path: 'golive',
    loadChildren: () =>
      import('./managelivestream/managelivestream.module').then(
        (a: any) => a.ManagelivestreamModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
