import { Component, OnInit } from '@angular/core';
import { ViewoptionService } from '../responsive.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit{
  constructor(public view: ViewoptionService) {}

  ngOnInit(): void {
  }

  

}
