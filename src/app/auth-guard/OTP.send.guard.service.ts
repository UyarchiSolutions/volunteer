import { HttpClient } from '@angular/common/http';
import { AuthcheckService } from './authcheck.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Env } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class OTPverifyService implements CanActivate {
  baseUrl = Env.baseAPi;
  constructor(private router: Router, public authcheck: AuthcheckService, private http: HttpClient) { }
  intersect(a: any, b: any) {
    return a.filter(Set.prototype.has, new Set(b));
  }
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

    const isLoggedIn = localStorage.getItem('otp-verify');
    let path: any = route.data;
    if (isLoggedIn != null) {
      return true;
    } else {
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }
  }

}
