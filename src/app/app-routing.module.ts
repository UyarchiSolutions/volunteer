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

const routes: Routes = [
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
    path: 'profile',
    component: ProfileComponent,
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
    path: 'mail-send',
    component: MailVerificationComponent,
  },
  {
    path: 'cand-rating',
    component: RatingComponent,
  },
  {
    path: 'choosen-cand',
    component: ChoosenCandComponent,
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
export class AppRoutingModule {}
