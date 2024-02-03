import { Component, OnInit } from '@angular/core';
import { ViewoptionService } from '../responsive.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css'],
})
export class SetPasswordComponent implements OnInit {
  constructor(public view: ViewoptionService) {}

  ngOnInit(): void {}

}
