import { Component, OnInit } from '@angular/core';
import { ViewoptionService } from '../responsive.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit{
  constructor(public view: ViewoptionService) {}

  ngOnInit(): void {
  }

}
