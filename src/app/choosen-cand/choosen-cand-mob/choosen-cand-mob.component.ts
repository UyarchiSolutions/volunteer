import { Component, OnInit } from '@angular/core';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-choosen-cand-mob',
  templateUrl: './choosen-cand-mob.component.html',
  styleUrls: ['./choosen-cand-mob.component.css']
})
export class ChoosenCandMobComponent implements OnInit{

  constructor(private api: VolunteerServiceService) {}
  
  ngOnInit(): void {
    this.getCandidates();
    this.getVolunteer();
  }
  Candidates: any = [];
  getCandidates() {
    this.api.loader = true;
    this.api.getChoosenCandidates().subscribe(
      (e: any) => {
        this.Candidates = e;
        this.api.loader = false;
      },
      (err: any) => {
        this.api.loader = false;
      }
    );
  }
  undChoosen(id: any) {
    this.api.loader = true;
    this.api.UndoChoosenCandidates(id).subscribe(
      (e: any) => {
        console.log(e);
        this.api.loader = false;
        this.getCandidates();
      },
      (err: any) => {
        this.api.loader = false;
      }
    );
  }
  role: any;
  getVolunteer() {
    this.api.getVolunteerDetails().subscribe((e: any) => {
      console.log(e);
      this.role = e.Role;
    });
  }
}
