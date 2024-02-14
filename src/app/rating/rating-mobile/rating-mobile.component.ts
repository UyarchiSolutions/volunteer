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
      console.log(e);
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
    if (this.volunteerDetail.Role == 'HR Volunteer') {
      console.log(item);
      let ind = this.AddLanguages.removeAt(item);
      console.log(this.AddLanguages.value);
    }
    else {
      console.log(item);
      let ind = this.AddSkills.removeAt(item);
      console.log(this.AddSkills.value);
    }
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

  hrRatingChange(item:any, e:any)
  {
    let rating1 = e.target.value;
    for (let x of this.AddLanguages.value) {
      x.rating = rating1;
    }
    console.log(this.AddLanguages.value);
  }

  get AddSkills(){
    return this.profileForm.controls['skillsrated'] as FormArray;
  }

  get AddLanguages() {
    return this.HrForm.controls['languages'] as FormArray;
  }

  HrRating: any = new FormGroup({
    attitude: new FormControl('', Validators.required),
    performance: new FormControl('', Validators.required),
    expCTC: new FormControl('', Validators.required),
    curCTC: new FormControl('', Validators.required),
    noticePeriod: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required)
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
    if(this.volunteerDetail.Role=='Tech Volunteer')
    {
      this.TechReviewForms.get(formControl).setValue(e.target.value);
    }
    else{
      this.HrRating.get(formControl).setValue(e.target.value);
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
    ratings: new FormControl('', Validators.required),
    skillsrated: this.fb.array([], [Validators.required]),
    skillsfron: new FormControl('')
  });

  techSubmit: any = false;
  submitRating() {
    //this.techSubmit = true;
      if(this.TechReviewForms.get('skillsrated').value==null)
      {
        this.TechReviewForms.get('skillsfron').setErrors({'incorrect':true});
      }
      else{
        console.log("nulled");
        this.TechReviewForms.get('skillsfron').setErrors(null);
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
      console.log("valid.")
      this.api.Rating(val).subscribe((res: any) => {
        console.log(res);
        this.router.navigateByUrl('/candidate');
      });
      this.techSubmit = false;
    }
    else
    {
      console.log(this.TechReviewForms.value);
    }
  }

  lang: any = [];
  language: any;
  HrForm: any = this.fb.group({
    langs: new FormControl(''),
    languages: this.fb.array([], [Validators.required])
  });

  hrlang() {
    let langx = this.HrForm.get('langs').value;

    let find = this.AddLanguages.value.findIndex(
      (a: any) => a.lang == langx
    );
    if (find != -1) {
      console.log("Already added.");
    }
    else {
      let data: any = this.fb.group({
        lang: new FormControl(langx),
        rating: new FormControl(null, [Validators.required]),
      });
      this.AddLanguages.push(data);
    }
    this.HrForm.get('langs').setValue(null);
    console.log(this.AddLanguages.value);
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
    
    let values = this.HrRating.value;
    if (this.HrRating.valid) {
      //this.hrSubmit = false;
      if(this.fresher){
        this.HrRating.get('curCTC').setErrors(null);
        this.HrRating.get('noticePeriod').setErrors(null);
      }
      if(this.AddLanguages.controls.length==0)
    {
      this.HrForm.get('langs').setErrors({'incorrect':true});
    }
    this.hrSubmit = true;
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
