import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { SocketioService } from 'src/app/managelivestream/socketio.service';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-interviews-mobile',
  templateUrl: './interviews-mobile.component.html',
  styleUrls: ['./interviews-mobile.component.css'],
})
export class InterviewsMobileComponent implements OnInit {
  constructor(private api: VolunteerServiceService, private route: Router, private socket: SocketioService) { }
  currentTime: any = new Date().getTime();
  timeun: any;
  ngOnInit(): void {
    this.getInterviewCand();
    this.timeun = timer(0, 1000).subscribe(() => {
      this.currentTime = new Date().getTime();
    });
    this.timeun = timer(0, 1000).subscribe(() => {
      this.currentTime = new Date().getTime();
    });
    this.socket.get_stream_on_going().subscribe((res: any) => {
      console.log(res, 87665786)
      let findIndex = this.cand.findIndex((a: any) => a.channel == res._id);
      if (findIndex != -1) {
        this.cand[findIndex].streamStatus_can = res.streamStatus;
      }
    })
  }

  cand: any;
  pending: any = false;
  pending_id: any;
  getInterviewCand() {
    
    this.api.getInterViewCandidates().subscribe((e: any) => {
      this.cand = e.candidates;
     
      this.pending = e.pending;
      this.pending_id = e.pending_id;
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
    

    this.api.go_live(item.channel).subscribe((res: any) => {
      // console.log(res)
     

      this.route.navigateByUrl('/golive?id=' + item.channel);
    });
  }
}
