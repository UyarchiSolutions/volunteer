import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginMobileComponent } from './login/login-mobile/login-mobile.component';
import { LoginWebComponent } from './login/login-web/login-web.component';
import { RegisterComponent } from './register/register.component';
import {
  RegisterMobileComponent,
  checkedForm,
} from './register/register-mobile/register-mobile.component';
import { RegisterWebComponent, checkedForm1 } from './register/register-web/register-web.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ForgotPasswordMobileComponent } from './forgot-password/forgot-password-mobile/forgot-password-mobile.component';
import { ForgotPasswordWebComponent } from './forgot-password/forgot-password-web/forgot-password-web.component';
import { SetPasswordMobileComponent } from './set-password/set-password-mobile/set-password-mobile.component';
import { SetPasswordWebComponent } from './set-password/set-password-web/set-password-web.component';
import { VerifyOtpMobileComponent } from './verify-otp/verify-otp-mobile/verify-otp-mobile.component';
import { VerifyOtpWebComponent } from './verify-otp/verify-otp-web/verify-otp-web.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileMobileComponent } from './profile/profile-mobile/profile-mobile.component';
import { ProfileWebComponent } from './profile/profile-web/profile-web.component';
import { MobileMenuBarComponent } from './mobile-menu-bar/mobile-menu-bar.component';
import { MobileTopBarComponent } from './mobile-top-bar/mobile-top-bar.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateMobileComponent } from './candidate/candidate-mobile/candidate-mobile.component';
import { CandidateWebComponent } from './candidate/candidate-web/candidate-web.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { InterviewsMobileComponent } from './interviews/interviews-mobile/interviews-mobile.component';
import { InterviewsWebComponent } from './interviews/interviews-web/interviews-web.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MailVerificationComponent } from './mail-verification/mail-verification.component';
import { MailMobileComponent } from './mail-verification/mail-mobile/mail-mobile.component';
import { MailWebComponent } from './mail-verification/mail-web/mail-web.component';
import { RatingComponent } from './rating/rating.component';
import { RatingMobileComponent } from './rating/rating-mobile/rating-mobile.component';
import { RatingWebComponent } from './rating/rating-web/rating-web.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { OtpTimerPipe } from './otp-timer';
import { ChoosenCandComponent } from './choosen-cand/choosen-cand.component';
import { ChoosenCandWebComponent } from './choosen-cand/choosen-cand-web/choosen-cand-web.component';
import { ChoosenCandMobComponent } from './choosen-cand/choosen-cand-mob/choosen-cand-mob.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginMobileComponent,
    LoginWebComponent,
    RegisterComponent,
    RegisterMobileComponent,
    RegisterWebComponent,
    ForgotPasswordComponent,
    VerifyOtpComponent,
    SetPasswordComponent,
    ForgotPasswordMobileComponent,
    ForgotPasswordWebComponent,
    SetPasswordMobileComponent,
    SetPasswordWebComponent,
    VerifyOtpMobileComponent,
    VerifyOtpWebComponent,
    ProfileComponent,
    ProfileMobileComponent,
    ProfileWebComponent,
    MobileMenuBarComponent,
    MobileTopBarComponent,
    CandidateComponent,
    CandidateMobileComponent,
    CandidateWebComponent,
    InterviewsComponent,
    InterviewsMobileComponent,
    InterviewsWebComponent,
    checkedForm,
    checkedForm1,
    MailVerificationComponent,
    MailMobileComponent,
    MailWebComponent,
    RatingComponent,
    RatingMobileComponent,
    RatingWebComponent,
    HeaderComponent,
    OtpTimerPipe,
    ChoosenCandComponent,
    ChoosenCandWebComponent,
    ChoosenCandMobComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
