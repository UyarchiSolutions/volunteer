import { Component } from '@angular/core';
import { ViewoptionService } from 'src/app/responsive.service';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent {
  ngOnInit(): void { }

  constructor(public view: ViewoptionService) { }
}
