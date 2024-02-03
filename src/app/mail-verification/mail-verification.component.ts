import { Component } from '@angular/core';
import { ViewoptionService } from '../responsive.service';

@Component({
  selector: 'app-mail-verification',
  templateUrl: './mail-verification.component.html',
  styleUrls: ['./mail-verification.component.css']
})
export class MailVerificationComponent {
  constructor(public view: ViewoptionService) {}
}
