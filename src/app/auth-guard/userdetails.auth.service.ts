import { HttpClient } from '@angular/common/http';
import { AuthcheckService } from './authcheck.service';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Env } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsAuth implements CanActivate {
  baseUrl = Env.baseAPi;
  constructor(private router: Router, public authcheck: AuthcheckService, private http: HttpClient) { }
  intersect(a: any, b: any) {
    return a.filter(Set.prototype.has, new Set(b));
  }
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

    const isLoggedIn = localStorage.getItem('candAuth');
    // let path: any = route.data;
    if (isLoggedIn != null) {
      this.authcheck.get_userDetails();
      return new Promise<boolean>((resolve, reject) => {
        this.authcheck.userDetails.subscribe((res: any) => {
          resolve(true);
        });
      })
    } else {
      return true;
    }
  }








}
