import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Env } from '../env';

declare let localStorage: any;

@Injectable({
  providedIn: 'root'
})
export class AuthcheckService {

  baseURL = Env.baseAPi;

  constructor(public http: HttpClient) { }

  userDetails: any = new BehaviorSubject<any>(null);
  loading: any = false;
  get_userDetails() {
    console.log("jhsdmkj")
    if (!this.loading && this.isLoggedIn()) {
      console.log("sdjfhgbsjhgdfnvhjasmnbdvchjagnb")
      this.loading = true;
      this.http.get(this.baseURL + "/v1/volunteer/getVolunteers/Details").subscribe((res: any) => {
        this.userDetails.next(res)
        this.loading = true;
      })
    }
  }

  isLoggedIn() {
    const isLoggedIn: any = localStorage.getItem('volunteer');
    return isLoggedIn != null;
  }




  loaderShow = new BehaviorSubject<any>(false)
  change_header(type: any) {
    // console.log(type, 2321312)
    this.loaderShow.next(type)
  }

  get_token() {
    return localStorage.getItem('candAuth')
  }

}
