import { Component, OnInit } from '@angular/core';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { SocketioService } from 'src/app/managelivestream/socketio.service';

@Component({
  selector: 'app-interviews-web',
  templateUrl: './interviews-web.component.html',
  styleUrls: ['./interviews-web.component.css'],
})
export class InterviewsWebComponent implements OnInit {
  constructor(private api: VolunteerServiceService, private route: Router, private socket: SocketioService) { }
  currentTime: any = new Date().getTime();
  timeun: any;
  ngOnInit(): void {
    this.getInterviewCand();
    this.timeun = timer(0, 1000).subscribe(() => {
      this.currentTime = new Date().getTime();
    });
    this.socket.get_stream_on_going().subscribe((res: any) => {
      console.log(res, 87665786)
      let findIndex = this.candidates.findIndex((a: any) => a.channel == res._id);
      if (findIndex != -1) {
        this.candidates[findIndex].streamStatus_can = res.streamStatus;
      }
    })
  }

  candidates: any;
  pending: any = false;
  pending_id: any;
  getInterviewCand() {
    
    this.api.getInterViewCandidates().subscribe((e: any) => {
      this.candidates = e.candidates;
     
      this.pending = e.pending;
      this.pending_id = e.pending_id;
    });
  }
  go_live(item: any) {
    console.log(item);
    
    this.api.go_live(item.channel).subscribe((res: any) => {
      // console.log(res)
     
      this.route.navigateByUrl('/golive?id=' + item.channel);
    });

  }
  candRating(data: any) {
    console.log(data);
    this.route.navigateByUrl(`/cand-rating?id=${data.candId}`);
  }

  toast: any = false;
  toast_message() {
    this.toast = true;
    setTimeout(() => {
      this.toast = false;
    }, 3000)
  }
}
