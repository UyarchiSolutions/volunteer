import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-rating-mobile',
  templateUrl: './rating-mobile.component.html',
  styleUrls: ['./rating-mobile.component.css'],
})
export class RatingMobileComponent implements OnInit {
  fresher:boolean=false;
  constructor(
    private api: VolunteerServiceService,
    private Aroute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.getIdFromParams();
    this.getVolunteersDetails();
  }
  candidate: any;
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
    skillsrated: this.fb.array([], [Validators.required]),
    ratings: new FormControl('', Validators.required)
  });

  skills1: any = [];

  addSkill1() {
    let rating = this.TechReviewForms.get('skillsfron').value;
    let find = this.AddSkills.value.findIndex(
      (a: any) => a.skills == rating);
    if (find != -1) {
      console.log("Already added.");
    }
    else {
      let data: any = this.fb.group({
        skills: new FormControl(rating),
        rating: new FormControl(null, [Validators.required]),
      });
      this.AddSkills.push(data);
    }
    this.TechReviewForms.get('skillsfron').setValue(null);
    console.log(this.AddSkills.value);
  }

  addSkill1Remove(item: any) {
    console.log(item);
    let ind = this.AddSkills.controls.findIndex((e: any) => {
      return e == item;
    });
    this.AddSkills.value.splice(ind, 1);
    console.log(this.skills1);
  }

  ratingChange(item: any, e: any) {
    let rating = e.target.value;
    item.rating = rating;
    console.log(item, e.target.value, this.skills1);
  }

  techRatingChange(item:any, e:any)
  {
    let rating1 = e.target.value;
    for(let x of this.AddSkills.value)
    {
      x.rating=rating1;
    }
    console.log(this.AddSkills.value);
  }

  get AddSkills(){
    return this.profileForm.controls['skillsrated'] as FormArray;
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
      e.target.value = cval.toString().slice(0, 1);
      e.preventDefault();
    } else {
    }
    this.TechReviewForms.get(formControl).setValue(e.target.value);
  }

  TechReviewForms: any = new FormGroup({
    underStating: new FormControl('', Validators.required),
    logic: new FormControl('', Validators.required),
    coding: new FormControl('', Validators.required),
    projectUnderStanding: new FormControl('', Validators.required),
    communication: new FormControl('', Validators.required),
    individualCode: new FormControl('', Validators.required),
    comments: new FormControl('', Validators.required),
    ratings: new FormControl('', Validators.required),
    skillsrated: this.fb.array([], [Validators.required]),
    skillsfron: new FormControl('')
  });

  techSubmit: any = false;
  submitRating() {
    for(let x of this.AddSkills.value)
    {
      if(x.rating==null || x.rating=="")
      {
        this.profileForm.get('skillsrated').setErrors({'incorrect':true});
      }
    }
    let values = this.TechReviewForms.value;
    this.techSubmit = true;
    if (this.TechReviewForms.valid) {
      console.log(this.profileForm.get('skillsrated').value);
      console.log(this.TechReviewForms.value);
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

  hrSubmit: any = false;
  HrRatingSubmit() {
    this.hrSubmit = true;
    let values = this.HrRating.value;
    if (this.HrRating.valid) {
      this.hrSubmit = false;
      if(this.fresher){
        this.HrRating.get('curCTC').setErrors(null);
        this.HrRating.get('noticePeriod').setErrors(null);
      }
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

  fresherToggle(){
    this.fresher?this.fresher=false:this.fresher=true;
  }
}
