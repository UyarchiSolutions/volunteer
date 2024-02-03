import { Component, OnInit } from '@angular/core';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interviews-web',
  templateUrl: './interviews-web.component.html',
  styleUrls: ['./interviews-web.component.css'],
})
export class InterviewsWebComponent implements OnInit {
  constructor(private api: VolunteerServiceService, private route: Router) {}
  currentTime: any = new Date().getTime();
  timeun: any;
  ngOnInit(): void {
    this.getInterviewCand();
    this.timeun = timer(0, 1000).subscribe(() => {
      this.currentTime = new Date().getTime();
    });
  }

  candidates: any;
  getInterviewCand() {
    this.api.loader = true;
    this.api.getInterViewCandidates().subscribe((e: any) => {
      this.candidates = e;
      this.api.loader = false;

      console.log(this.candidates);
    });
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
  candRating(data: any) {
    console.log(data);
    this.route.navigateByUrl(`/cand-rating?id=${data.candId}`);
  }
}
