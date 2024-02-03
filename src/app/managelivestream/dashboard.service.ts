import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Env } from '../env';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseurl = Env.baseAPi;

  constructor(private http: HttpClient) { }

  verify_stream_link(id: any) {
    return this.http.get(this.baseurl + "/v2/demostream/verify/token/stream?id=" + id);
  }
  verify_opt(body: any) {
    return this.http.post(this.baseurl + "/v2/demostream/verify/sms/now", body);
  }
  send_otp(id: any) {
    return this.http.get(this.baseurl + "/v2/demostream/verification/sms/send?id=" + id);
  }
  feedBack(body: any, id: any) {
    return this.http.post(this.baseurl + "/v2/demostream/Feedback?id=" + id, body);
  }
  send_issue(data: any) {
    return this.http.post(this.baseurl + '/v2/demostream/TechIssue', data)
  }
  get_issues(page: any, id: any) {
    return this.http.get(this.baseurl + '/v2/demostream/TechIssue/pagination/' + page + "?id=" + id)
  }

  feedback: any = new BehaviorSubject<any>(false);
}
