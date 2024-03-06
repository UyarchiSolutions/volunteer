import { Injectable } from '@angular/core';
import { Env } from './env';
import { HttpClient } from '@angular/common/http';
import { AuthcheckService } from './auth-guard/authcheck.service';

@Injectable({
  providedIn: 'root',
})
export class VolunteerServiceService {
  baseurl = Env.baseAPi;

  constructor(public http: HttpClient, private authcheck: AuthcheckService) { }

  token: any = localStorage.getItem('volunteer');

  volunteerReg(data: any) {
    return this.http.post(this.baseurl + '/v1/volunteer', data);
  }

  getSkill(value: any) {
    return this.http.get(
      this.baseurl + `/v1/employerdetail/keySkillData/${value}`
    );
  }

  setpassword(data: any) {
    return this.http.post(this.baseurl + '/v1/volunteer/setPassword', data);
  }

  login(data: any) {
    return this.http.post(this.baseurl + '/v1/volunteer/login', data);
  }

  vandidateMatch() {
    let token: any =
      localStorage.getItem('volunteer') == null
        ? ''
        : localStorage.getItem('volunteer');
    return this.http.get(this.baseurl + '/v1/volunteer/MatchCandidate', {
      headers: { auth: token },
    });
  }

  intrestUpdate(id: any, slotId: any) {
    let token: any =
      localStorage.getItem('volunteer') == null
        ? ''
        : localStorage.getItem('volunteer');
    return this.http.get(
      this.baseurl + `/v1/volunteer/Candidate/IntrestUpdate/${id}/${slotId}`,
      {
        headers: { auth: token },
      }
    );
  }

  uploadImage(id: any, data: any) {
    return this.http.put(
      this.baseurl + '/v1/volunteer/upload/ProfileImage/' + id,
      data
    );
  }

  getVolunteerDetails() {
    return this.authcheck.userDetails;
  }

  getInterViewCandidates() {
    let token: any =
      localStorage.getItem('volunteer') == null
        ? ''
        : localStorage.getItem('volunteer');
    return this.http.get(
      this.baseurl + '/v1/volunteer/getCandidates/ForInterview',
      {
        headers: { auth: token },
      }
    );
  }

  getCandidateById(id: any) {
    return this.http.get(this.baseurl + '/v1/agriEvent/getCandidateById/' + id);
  }

  go_live(post: any) {
    let token: any =
      localStorage.getItem('volunteer') == null
        ? ''
        : localStorage.getItem('volunteer');
    return this.http.post(
      this.baseurl + '/v2/demostream/seller/go/live',
      { post },
      { headers: { auth: token } }
    );
  }

  Rating(data: any) {

    return this.http.post(
      this.baseurl + '/v1/agriEvent/candidate/review',
      data
    );
  }

  updateVolunteer(data: any) {
    return this.http.put(
      this.baseurl + '/v1/volunteer/updateVolunteer',
      data
    );
  }

  SendOTP(id: any) {
    return this.http.get(this.baseurl + `/v1/volunteer/sendOTP?id=${id}`);
  }

  VerifyOTP(data: any) {
    return this.http.post(this.baseurl + `/v1/volunteer/verifyOTP`, data);
  }

  getChoosenCandidates() {
    return this.http.get(
      this.baseurl + '/v1/volunteer/getIntrestedCandidates',
      { headers: { auth: this.token } }
    );
  }

  UndoChoosenCandidates(id: any) {
    return this.http.get(
      this.baseurl + '/v1/volunteer/UndoIntrestedCandidate/' + id,
      { headers: { auth: this.token } }
    );
  }

  get_skills(key: any) {
    return this.http.get(this.baseurl + '/v1/employerdetail/keySkillData/' + key);
  }

  change_password(data: any) {
    return this.http.post(this.baseurl + '/v1/volunteer/change/password', data);
  }
  forget_passpwrd(data: any) {
    return this.http.post(this.baseurl + '/v1/volunteer/forget/password', data);
  }

}
