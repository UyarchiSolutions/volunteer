import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewoptionService {
  constructor() { }
  view_option: any = 'mobile';
}
