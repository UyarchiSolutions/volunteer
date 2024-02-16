import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidate-web',
  templateUrl: './candidate-web.component.html',
  styleUrls: ['./candidate-web.component.css'],
})
export class CandidateWebComponent implements OnInit {
  constructor(private api: VolunteerServiceService, private route: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.candidateMatch();
    this.getCandidates();
    this.getVolunteer();
  }

  data: any = [];

  candidateMatch() {
    this.api.loader = true;

    this.api.vandidateMatch().subscribe(
      (e: any) => {
        this.data = e;
        this.api.loader = false;
      },
      (err: any) => {
        this.api.loader = false;
        localStorage.removeItem('volunteer');
        this.route.navigateByUrl('/');
      }
    );
  }
  Role: any;
  getVolunteer() {
    this.api.loader = true;
    this.api.getVolunteerDetails().subscribe(
      (e: any) => {
        this.Role = e.Role;
        console.log(this.Role);
        this.api.loader = false;
      },
      (err: any) => {
        this.api.loader = false;
      }
    );
  }

  intrestCandidate(id: any, slotId: any) {
    console.log(id, slotId);
    this.api.loader = true;
    this.api.intrestUpdate(id, slotId).subscribe(
      (e: any) => {
        console.log(e);
        this.candidateMatch();
        this.getCandidates();
        this.api.loader = false;
      },
      (err: any) => {
        this.api.loader = false;
      }
    );
  }

  choosenData: any = [];
  getCandidates() {
    this.api.loader = true;
    this.api.getChoosenCandidates().subscribe(
      (e: any) => {
        e.forEach((a: any) => {
          let date = a.IntrestedCandidate.slotDate;
          let time = a.IntrestedCandidate.slotTime;
          this.choosenData.push({ date: date, time: time });
        });
        this.api.loader = false;
      },
      (err: any) => {
        this.api.loader = false;
      }
    );
  }

  checkSlotExistOrNot(date: any, time: any) {
    let val = this.choosenData.findIndex((x: any) => x.date === date && x.time === time);
    return val
  }

  clickDisable() {
    this.toastr.error('You have already chosen this slot with some other candidates. If you wish to interview other people in the same slot, Go to the chosen module and undo the candidate in the same slot.');
  }

}
