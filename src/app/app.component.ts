import { Component, OnInit } from '@angular/core';
import { ViewoptionService } from './responsive.service';
import { VolunteerServiceService } from './volunteer-service.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthcheckService } from './auth-guard/authcheck.service';

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
    public loader: AuthcheckService,
    router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
      }
      if (event instanceof NavigationEnd) {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      }
    });
  }


  ngOnInit(): void {
    if (window.innerWidth < 800) {
      this.viweOption = 'mobile';
    } else {
      this.viweOption = 'lap';
    }
    this.service.view_option = this.viweOption;
    this.loader.loaderShow.subscribe((res: any) => {
      this.loadershow = res;
    })
  }
  loadershow: any = false;
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
