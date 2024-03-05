import { Component } from '@angular/core';
import { ViewoptionService } from 'src/app/responsive.service';

@Component({
  selector: 'app-loged-outlet',
  templateUrl: './loged-outlet.component.html',
  styleUrls: ['./loged-outlet.component.css']
})
export class LogedOutletComponent {
  constructor(public view: ViewoptionService) { }

  ngOnInit(): void { }

}
