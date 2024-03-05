import { HttpClient } from '@angular/common/http';
import { AuthcheckService } from './authcheck.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Env } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterSuccessService implements CanActivate {
  baseUrl = Env.baseAPi;
  constructor(private router: Router, public authcheck: AuthcheckService, private http: HttpClient) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

    const isLoggedIn = localStorage.getItem('register-Success');
    let path: any = route.data;
    if (isLoggedIn != null) {
      return true;
    } else {
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }
  }

}
