import { Component, OnInit } from '@angular/core';
import { ViewoptionService } from '../responsive.service';

@Component({
  selector: 'app-choosen-cand',
  templateUrl: './choosen-cand.component.html',
  styleUrls: ['./choosen-cand.component.css'],
})
export class ChoosenCandComponent implements OnInit {
  constructor(public view: ViewoptionService) {}

  ngOnInit(): void {}
}
