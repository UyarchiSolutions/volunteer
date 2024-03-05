import { Component } from '@angular/core';
import { ViewoptionService } from '../responsive.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(public view: ViewoptionService) { }

  ngOnInit(): void {
  }
}
