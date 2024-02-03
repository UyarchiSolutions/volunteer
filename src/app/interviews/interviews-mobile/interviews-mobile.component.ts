import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-interviews-mobile',
  templateUrl: './interviews-mobile.component.html',
  styleUrls: ['./interviews-mobile.component.css'],
})
export class InterviewsMobileComponent implements OnInit {
  constructor(private api: VolunteerServiceService, private route: Router) {}
  currentTime: any = new Date().getTime();
  timeun: any;
  ngOnInit(): void {
    this.getInterviewCand();
    this.timeun = timer(0, 1000).subscribe(() => {
      this.currentTime = new Date().getTime();
    });
  }

  cand: any;
  getInterviewCand() {
    this.api.loader = true;
    this.api.getInterViewCandidates().subscribe((e: any) => {
      this.cand = e;
      this.api.loader = false;
    });
  }

  candidate: any;
  candRating(data: any) {
    console.log(data);
    this.route.navigateByUrl(`/cand-rating?id=${data.candId}`);
  }

  profileForm: any = new FormGroup({
    skillsfron: new FormControl(''),
    skills: new FormControl([], [Validators.required]),
  });

  skills1: any = [];

  addSkill1() {
    let e = this.profileForm.get('skillsfron').value;
    if (e != '') {
      let findInd = this.skills1.findIndex((s: any) => {
        return s == e;
      });
      if (findInd == -1) {
        this.skills1.push(e);
      } else {
        this.skills1.splice(findInd, 1);
      }
      console.log(this.skills1);
      this.profileForm.get('skillsfron').setValue(null);
    }
  }

  addSkill1Remove(item: any) {
    console.log(item);
    let ind = this.skills1.findIndex((e: any) => {
      return e == item;
    });
    this.skills1.splice(ind, 1);
    console.log(this.skills1);
  }
  go_live(item: any) {
    console.log(item);
    this.api.loader = true;

    this.api.go_live(item.channel).subscribe((res: any) => {
      // console.log(res)
      this.api.loader = false;

      this.route.navigateByUrl('/golive?id=' + item.channel);
    });
  }
}
