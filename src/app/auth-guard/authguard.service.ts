import { HttpClient } from '@angular/common/http';
import { AuthcheckService } from './authcheck.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Env } from '../env';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  baseUrl = Env.baseAPi;
  constructor(private router: Router, public authcheck: AuthcheckService, private http: HttpClient) { }
  intersect(a: any, b: any) {
    return a.filter(Set.prototype.has, new Set(b));
  }
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const isLoggedIn = localStorage.getItem('volunteer');
    let path: any = route.data;
    if (isLoggedIn != null) {
      this.authcheck.get_userDetails();
      return new Promise<boolean>((resolve, reject) => {
        this.authcheck.userDetails.subscribe((res: any) => {
          resolve(true);
        })
      })
    } else {
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }
  }

  isLoggedIn() {
    const isLoggedIn: any = localStorage.getItem('volunteer');
    return isLoggedIn != null;
  }
  headerShow = new BehaviorSubject<any>('show');

  change_header(type: any) {
    this.headerShow.next(type)
  }



  logout() {
    this.authcheck.userDetails.next(null)
    this.authcheck.loading = false;
    localStorage.removeItem('volunteer');
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}
