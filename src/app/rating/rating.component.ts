import { Component } from '@angular/core';
import { ViewoptionService } from '../responsive.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  constructor(public view: ViewoptionService) {}
}
