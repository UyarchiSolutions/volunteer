import { Component } from '@angular/core';
import { ViewoptionService } from 'src/app/responsive.service';

@Component({
  selector: 'app-auth-outlet',
  templateUrl: './auth-outlet.component.html',
  styleUrls: ['./auth-outlet.component.css']
})
export class AuthOutletComponent {
  constructor(public view: ViewoptionService) { }

  ngOnInit(): void { }

}
