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
  fresher: boolean = false;
  constructor(
    private api: VolunteerServiceService,
    private Aroute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }
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
    let regex = new RegExp('^ {1,}$');
    if (this.TechReviewForms.get('skillsfron').value != '' && this.TechReviewForms.get('skillsfron').value != null && regex.test(this.TechReviewForms.get('skillsfron').value) == false) {
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

  techRatingChange(item: any, e: any) {
    /* let rating1 = e.target.value;
    for (let x of this.AddSkills.value) {
      x.rating = rating1;
    }
    console.log(this.AddSkills.value); */
  }

  hrRatingChange(item: any, e: any) {
    let rating1 = e.target.value;
    for (let x of this.AddLanguages.value) {
      x.rating = rating1;
    }
    console.log(this.AddLanguages.value);
  }

  get AddSkills() {
    return this.TechReviewForms.controls['skillsrated'] as FormArray;
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
    //this.HrRating.setValue(rating);
  }
  volunteerDetail: any = {};

  getVolunteersDetails() {
    
    this.api.getVolunteerDetails().subscribe((e: any) => {
      console.log(e);
     
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
    if (this.volunteerDetail.Role == 'Tech Volunteer') {
      this.TechReviewForms.get(formControl).setValue(e.target.value);
    }
    else {
      this.HrRating.get(formControl).setValue(e.target.value);
    }
  }

  TechReviewForms: any = this.fb.group({
    underStating: new FormControl('', Validators.required),
    logic: new FormControl('', Validators.required),
    coding: new FormControl('', Validators.required),
    projectUnderStanding: new FormControl('', Validators.required),
    communication: new FormControl('', Validators.required),
    individualCode: new FormControl('', Validators.required),
    comments: new FormControl('', Validators.required),
    ratings: new FormControl('', Validators.required),
    skillsrated: this.fb.array([]),
    skillsfron: new FormControl('')
  });

  techSubmit: any = false;
  submitRating() {
    this.techSubmit = true;
    // alert(this.AddSkills.length)
    if (this.AddSkills.length == 0) {
      this.TechReviewForms.get('skillsfron').setErrors({ 'incorrect': true });
    }
    else if (this.AddSkills.length >= 1) {
      console.log("nulled");
      console.log(this.AddSkills.value);
    }
    let values = this.TechReviewForms.value;
    /* const invalid = [];
    const controls = this.TechReviewForms.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid, 6666666); */
    console.log(this.TechReviewForms.get('ratings').value);
    if(this.TechReviewForms.get('ratings').value<0||this.TechReviewForms.get('ratings').value>5 || this.TechReviewForms.get('ratings').value=='')
    {
      this.TechReviewForms.get('ratings').setErrors({'incorrect':true});
    }
    else
    {
      this.TechReviewForms.get('ratings').setErrors(null);
    }
    if (this.TechReviewForms.valid) {
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
    /* else {
      
    } */
  }

  lang: any = [];
  language: any;
  HrForm: any = this.fb.group({
    langs: new FormControl(null),
    languages: this.fb.array([], Validators.required)
  });

  hrlang() {
    let regex = new RegExp('^ {1,}$');
    if (regex.test(this.HrForm.get('langs').value) == false && this.HrForm.get('langs').value!=null && this.HrForm.get('langs').value!='')  
    {
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
    console.log("Hit");
    this.hrSubmit = true;
    let values = this.HrRating.value;
    if (this.fresher) {
      this.HrRating.get('curCTC').setErrors(null);
      this.HrRating.get('noticePeriod').setErrors(null);
    }
    else{
      this.HrRating.get('curCTC').setErrors({ 'incorrect': true });
      this.HrRating.get('noticePeriod').setErrors({ 'incorrect': true });
    }
    if (this.AddLanguages.controls.length == 0) {
      this.HrForm.get('langs').setErrors({ 'incorrect': true });
      this.HrForm.get('languages').setErrors({'incorrect':true});
    }
    if (this.HrRating.valid && this.HrForm.valid) {
      this.hrSubmit = false;
      // alert("Valid.");
      let datas = {
        volunteerId: this.volunteerDetail._id,
        candId: this.candidate._id,
        Role: this.volunteerDetail.Role,
        lang: this.AddLanguages.value,
        values: values,
      };
      console.log(datas);
      
      this.api.Rating(datas).subscribe(
        (res: any) => {
          this.router.navigateByUrl('/candidate');
          console.log(res);
         
        },
        (err: any) => {
         
        }
      );
    }
  }

  fresherToggle() {
    this.fresher ? this.fresher = false : this.fresher = true;
  }
}
