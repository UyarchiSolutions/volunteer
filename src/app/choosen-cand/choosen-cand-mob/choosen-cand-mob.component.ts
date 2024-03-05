import { Component, OnInit } from '@angular/core';
import { AuthcheckService } from 'src/app/auth-guard/authcheck.service';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-choosen-cand-mob',
  templateUrl: './choosen-cand-mob.component.html',
  styleUrls: ['./choosen-cand-mob.component.css']
})
export class ChoosenCandMobComponent implements OnInit {

  constructor(private api: VolunteerServiceService, private authcheck: AuthcheckService) { }

  ngOnInit(): void {
    this.getCandidates();
    this.getVolunteer();
  }
  Candidates: any = [];
  getCandidates() {
    
    this.api.getChoosenCandidates().subscribe(
      (e: any) => {
        this.Candidates = e;
       
      },
      (err: any) => {
       
      }
    );
  }
  undChoosen(id: any) {
    
    this.api.UndoChoosenCandidates(id).subscribe(
      (e: any) => {
        console.log(e);
       
        this.getCandidates();
      },
      (err: any) => {
       
      }
    );
  }
  role: any;
  getVolunteer() {
    this.authcheck.userDetails().subscribe((e: any) => {
      console.log(e);
      this.role = e.Role;
    });
  }
}
