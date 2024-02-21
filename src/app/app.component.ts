import { Component, OnInit } from '@angular/core';
import { ViewoptionService } from './responsive.service';
import { VolunteerServiceService } from './volunteer-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'volunteer';
  viweOption: any = 'mobile';
  constructor(
    private service: ViewoptionService,
    public loader: VolunteerServiceService
  ) { }
  ngOnInit(): void {
    if (window.innerWidth < 800) {
      this.viweOption = 'mobile';
    } else {
      this.viweOption = 'lap';
    }
    this.service.view_option = this.viweOption;

    this.loader.getVolunteerDetails().subscribe((e: any) => {
    });
  }
  onResize(event: any): void {
    if (event.target.innerWidth < 800) {
      this.viweOption = 'mobile';
    } else {
      this.viweOption = 'lap';
    }
    // console.log(event.target.innerWidth);
    this.service.view_option = this.viweOption;
  }

}
