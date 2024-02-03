import { Component } from '@angular/core';
import { ViewoptionService } from 'src/app/responsive.service';

@Component({
  selector: 'app-view-stream',
  templateUrl: './view-stream.component.html',
  styleUrls: ['./view-stream.component.css']
})
export class ViewStreamComponent {
  constructor(public view: ViewoptionService) { }

}
