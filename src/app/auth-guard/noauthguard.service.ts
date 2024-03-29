import { AuthcheckService } from './authcheck.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './authguard.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private authGuard: AuthService, private router: Router, public authcheck: AuthcheckService) { }

  async canActivate() {
    const isLoggedIn = this.authGuard.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['candidate'], { replaceUrl: true })
      return false;
    } else {
      return true;
    }
  }
}