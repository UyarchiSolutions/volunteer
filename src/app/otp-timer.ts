import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Pipe({
  name: 'otpTimer'
})
export class OtpTimerPipe implements PipeTransform {

  constructor(public router: Router) {
  }
  transform(value: number): string {
    const minutes: number = Math.floor((value % 3600) / 60);
    if (value > 0) {
      return (
        ("00" + minutes).slice(-2) +
        ":" +
        ("00" + Math.floor(value - minutes * 60)).slice(-2)
      );
    }
    else {
      return (
        ("00") +
        ":" +
        ("00")
      );
    }
  }

}
