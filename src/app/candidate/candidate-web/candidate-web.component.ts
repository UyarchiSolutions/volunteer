import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthcheckService } from 'src/app/auth-guard/authcheck.service';

@Component({
  selector: 'app-candidate-web',
  templateUrl: './candidate-web.component.html',
  styleUrls: ['./candidate-web.component.css'],
})
export class CandidateWebComponent implements OnInit {
  constructor(private api: VolunteerServiceService, private route: Router, private toastr: ToastrService, private authcheck: AuthcheckService) { }
  ngOnInit(): void {
    this.candidateMatch();
    // this.getCandidates();
  }

  data: any = [];

  candidateMatch() {

    this.api.vandidateMatch().subscribe(
      (e: any) => {
        this.data = e;

      },
      (err: any) => {

      }
    );
  }


  intrestCandidate(id: any, slotId: any, cand: any) {

    this.api.intrestUpdate(id, slotId).subscribe(
      (e: any) => {
        this.candidateMatch();

      },
      (err: any) => {

      }
    );
  }

  clickDisable() {
    this.toastr.error('You have already chosen this slot with some other candidates. If you wish to interview other people in the same slot, Go to the chosen module and undo the candidate in the same slot.');
  }

}
