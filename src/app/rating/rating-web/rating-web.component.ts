import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';
@Component({
  selector: 'app-rating-web',
  templateUrl: './rating-web.component.html',
  styleUrls: ['./rating-web.component.css'],
})
export class RatingWebComponent implements OnInit {
  constructor(
    private api: VolunteerServiceService,
    private Aroute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getIdFromParams();
    this.getVolunteersDetails();
  }

  candidate: any = {};
  getIdFromParams() {
    this.Aroute.queryParams.subscribe((e: any) => {
      console.log(e.id);
      this.api.getCandidateById(e.id).subscribe((e: any) => {
        this.candidate = e;
      });
    });
  }

  profileForm: any = new FormGroup({
    skillsfron: new FormControl(''),
    skills: new FormControl([], [Validators.required]),
    comments: new FormControl(''),
  });

  lang: any = [];
  HrForm: any = new FormGroup({
    languages: new FormControl(''),
  });

  hrlang() {
    let e = this.HrForm.get('languages').value;
    if (e != '') {
      let findInd = this.lang.findIndex((s: any) => {
        return s.lang == e;
      });
      if (findInd == -1) {
        this.lang.push({ lang: e, rating: 0 });
      } else {
        // this.skills1.splice(findInd, 1);
      }
      console.log(this.lang);
      this.HrForm.get('languages').setValue(null);
    }
  }
  HrLanRemove(item: any) {
    console.log(item);
    let ind = this.lang.findIndex((e: any) => {
      return e == item;
    });
    this.lang.splice(ind, 1);
    console.log(this.lang);
  }

  skills1: any = [];

  addSkill1() {
    let e = this.profileForm.get('skillsfron').value;
    if (e != '') {
      let findInd = this.skills1.findIndex((s: any) => {
        return s.skils == e;
      });
      if (findInd == -1) {
        this.skills1.push({ skils: e, rating: 0 });
      } else {
      }
      console.log(this.skills1);
      this.profileForm.get('skillsfron').setValue(null);
    }
  }

  addSkill1Remove(item: any) {
    console.log(item);
    let ind = this.skills1.findIndex((e: any) => {
      return e == item;
    });
    this.skills1.splice(ind, 1);
    console.log(this.skills1);
  }
  starRatingChange(item: any, e: any) {
    let rating = e.target.value;
    item.rating = rating;
    console.log(item, e.target.value, this.skills1);
  }

  HrRating: any = new FormGroup({
    attitude: new FormControl('', Validators.required),
    performance: new FormControl('', Validators.required),
    expCTC: new FormControl('', Validators.required),
    curCTC: new FormControl('', Validators.required),
    noticePeriod: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
  });

  herRatingAttr(item: any, e: any) {
    let rating = e.target.value;
    this.HrRating.get('attitude').setValue(rating);
  }
  herRatingPer(item: any, e: any) {
    let rating = e.target.value;
    this.HrRating.get('performance').setValue(rating);
    this.HrRating.setValue(rating);
  }
  volunteerDetail: any = {};

  getVolunteersDetails() {
    this.api.loader = true;
    this.api.getVolunteerDetails().subscribe((e: any) => {
      console.log(e);
      this.api.loader = false;
      this.volunteerDetail = e;
    });
  }

  underStatingChange(e: any, formControl: any) {
    let cval: any = parseInt(e.target.value);
    if (cval > 10) {
      console.log(cval, 87665);
      e.target.value = cval.toString().slice(0, 1);
      e.preventDefault();
    } else {
    }
    this.TechReviewForms.get(formControl).setValue(e.target.value);
  }

  heypress(e: any) {
    let cval: any = parseInt(e.target.value);
    if (cval > 10) {
      console.log(cval, 87665);
      e.target.value = cval.toString().slice(0, 1);
      e.preventDefault();
    } else {
    }
  }

  TechReviewForms: any = new FormGroup({
    underStating: new FormControl('', Validators.required),
    logic: new FormControl('', Validators.required),
    coding: new FormControl('', Validators.required),
    projectUnderStanding: new FormControl('', Validators.required),
    communication: new FormControl('', Validators.required),
    individualCode: new FormControl('', Validators.required),
    comments: new FormControl('', Validators.required),
  });

  techSubmit: any = false;
  submitRating() {
    let values = this.TechReviewForms.value;
    this.techSubmit = true;
    if (this.TechReviewForms.valid) {
      let val = {
        values,
        ...{
          volunteerId: this.volunteerDetail._id,
          candId: this.candidate._id,
          Role: this.volunteerDetail.Role,
          rating: this.skills1,
        },
      };
      this.api.Rating(val).subscribe((res: any) => {
        console.log(res);
        this.router.navigateByUrl('/candidate');
      });
      this.techSubmit = false;
    }
  }

  hrSubmit: any = false;
  HrRatingSubmit() {
    this.hrSubmit = true;
    let values = this.HrRating.value;
    if (this.HrRating.valid) {
      this.hrSubmit = false;
      let datas = {
        volunteerId: this.volunteerDetail._id,
        candId: this.candidate._id,
        Role: this.volunteerDetail.Role,
        lang: this.lang,
        values: values,
      };
      this.api.loader = true;
      this.api.Rating(datas).subscribe(
        (res: any) => {
          this.router.navigateByUrl('/candidate');
          console.log(res);
          this.api.loader = false;
        },
        (err: any) => {
          this.api.loader = false;
        }
      );
    }
  }
}
