import { Component, OnInit } from '@angular/core';
import { ViewoptionService } from '../responsive.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}

  constructor(public view: ViewoptionService) {}
}
