import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthcheckService } from 'src/app/auth-guard/authcheck.service';

@Component({
  selector: 'app-candidate-mobile',
  templateUrl: './candidate-mobile.component.html',
  styleUrls: ['./candidate-mobile.component.css'],
})
export class CandidateMobileComponent implements OnInit {
  constructor(private api: VolunteerServiceService, private route: Router, private toastr: ToastrService, private authcheck: AuthcheckService) { }
  ngOnInit(): void {
    this.candidateMatch();
  }

  data: any = null;
  Role: any;


  candidateMatch() {
    this.api.vandidateMatch().subscribe(
      (e: any) => {
        this.data = e;
      },
      (err: any) => {

      }
    );
  }

  intrestCandidate(id: any, slotId: any) {

    this.api.intrestUpdate(id, slotId).subscribe((e: any) => {
      console.log(e);
      this.candidateMatch();

    });
  }

  clickDisable() {
    this.toastr.error('You have already chosen this slot with some other candidates. If you wish to interview other people in the same slot, Go to the chosen module and undo the candidate in the same slot.');
  }
}
