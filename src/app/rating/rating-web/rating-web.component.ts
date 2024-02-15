import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';
@Component({
  selector: 'app-rating-web',
  templateUrl: './rating-web.component.html',
  styleUrls: ['./rating-web.component.css'],
})
export class RatingWebComponent implements OnInit {
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

  candidate: any = {};
  lang1: any = [];
  lang2: any;
  getIdFromParams() {
    this.Aroute.queryParams.subscribe((e: any) => {
      console.log(e);
      this.api.getCandidateById(e.id).subscribe((e: any) => {
        console.log(e, "e");
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

  lang: any = [];
  language: any;
  HrForm: any = this.fb.group({
    langs: new FormControl(''),
    languages: this.fb.array([], [Validators.required])
  });



  get AddSkills() {
    return this.TechReviewForms.controls['skillsrated'] as FormArray;
  }

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

  get AddLanguages() {
    return this.HrForm.controls['languages'] as FormArray;
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
    this.skills1.push(item);
    console.log(item, e.target.value, this.skills1);
  }

  techRatingChange(item: any, e: any) {

    let rating1 = e.target.value;
    for (let x of this.AddSkills.value) {
      x.rating = rating1;
    }
    console.log(this.AddSkills.value);
  }

  hrRatingChange(item: any, e: any) {
    let rating1 = e.target.value;
    for (let x of this.AddLanguages.value) {
      x.rating = rating1;
    }
    console.log(this.AddLanguages.value);
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
    console.log(rating);
    this.HrRating.get('performance').setValue(rating);
    //this.HrRating.setValue(rating);
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
    if (this.volunteerDetail.Role == 'Tech Volunteer') {
      this.TechReviewForms.get(formControl).setValue(e.target.value);
    }
    else {
      this.HrRating.get(formControl).setValue(e.target.value);
    }

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
    ratings: new FormControl('', Validators.required),
    skillsrated: this.fb.array([], [Validators.required]),
    skillsfron: new FormControl('')
  });

  techSubmit: any = false;

  submitRating() {
    console.log(this.TechReviewForms.value);
    if (this.AddSkills.value.length == 0) {
      this.TechReviewForms.get('skillsfron').setErrors({ 'incorrect': true });
    }
    for (let skill of this.skills1) {
      if (skill.rating == null || skill.rating == '') {
        console.log(skill.skills);
        this.TechReviewForms.get('skillsrated').setErrors({ 'incorrect': true });
      }
    }
    let values = this.TechReviewForms.value;
    if (this.TechReviewForms.get('ratings').value > 5 || this.TechReviewForms.get('ratings').value < 0) {
      this.TechReviewForms.get('ratings').setErrors({ 'incorrect': true });
    }
    this.techSubmit = true;
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
  }

  hrSubmit: any = false;
  HrRatingSubmit() {
    console.log(this.HrForm.value);
    let language: any = [];
    language = this.HrForm.get('languages');
    console.log(this.HrRating.value);
    this.hrSubmit = true;
    if (this.fresher) {
      this.HrRating.get('curCTC').setErrors(null);
      this.HrRating.get('noticePeriod').setErrors(null);
    }
    if (this.AddLanguages.controls.length == 0) {
      this.HrForm.get('langs').setErrors({ 'incorrect': true });
    }

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
      console.log("????")
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

  fresherToggle() {
    this.fresher ? this.fresher = false : this.fresher = true;
  }
}


