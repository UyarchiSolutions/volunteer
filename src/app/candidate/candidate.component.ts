import { Component, OnInit } from '@angular/core';
import { ViewoptionService } from '../responsive.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit{
  ngOnInit(): void {}

  constructor(public view: ViewoptionService) {}

  

}
