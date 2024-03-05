import { Component, OnInit } from '@angular/core';
import { ViewoptionService } from '../responsive.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class EditprofileComponent implements OnInit {
  ngOnInit(): void { }
  constructor(public view: ViewoptionService) { }
}
