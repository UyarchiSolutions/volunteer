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

  candidate: any = {};
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
    //comments: new FormControl(''),
    ratings: new FormControl('', Validators.required)
  });

  lang: any = [];
  HrForm: any = new FormGroup({
    languages: new FormControl(''),
  });



  get AddSkills(){
    return this.profileForm.controls['skillsrated'] as FormArray;
  }

  hrlang() {
    let e = this.HrForm.get('languages').value;
    if (e != '') {
      let findInd = this.lang.findIndex((s: any) => {
        return s.lang == e;
      });
      if (findInd == -1) {
        this.lang.push({ lang: e, rating: "" });
        // this.lang.push({lang: "Norsk", rating: "Excellent"});
      }
      this.HrForm.get('languages').push(this.lang);
      this.HrForm.get('languages').reset();
      console.log(this.HrForm.get('languages').value);
      console.log(21576444);
      // this.HrForm.get('languages').setValue(null);
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
    if (e != '' ) {
      /* console.log(regex.test("               "));
      console.log(regex.test("hihello123 yes")); */
      let findInd = this.skills1.findIndex((s: any) => {
        return s.skills == e;
      });
      if (findInd == -1) {
        this.skills1.push({ skills: e, rating: "" });
      } else {
      }
      console.log(this.skills1);
      //this.profileForm.get('skills').push(this.skills1);
      //console.log(this.profileForm.get('skills'));
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

  ratingChange(item: any, e: any) {
    let rating = e.target.value;
    item.rating = rating;
    this.skills1.push(item);
    console.log(item, e.target.value, this.skills1);
  }

  techRatingChange(item:any, e:any)
  {
    
    let rating=e.target.value;
    let data:any = this.fb.group({
      skills: new FormControl(item.skills),
      rating: new FormControl(rating),
    });
    let find = this.AddSkills.value.findIndex(
      (a: any) => a.skills == item.skills
    );
    if (find != -1) 
      {
        console.log("Already added.");
      }
      else
      {
        this.AddSkills.push(data);
      }
      console.log(this.AddSkills.value);
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
    ratings: new FormControl('', Validators.required)
  });

  techSubmit: any = false;

  submitRating() {
    console.log(this.profileForm.value);
    if(this.skills1.length==0)
    {
      this.profileForm.get('skillsfron').setErrors({'incorrect':true});
    }
    /* else{
      this.profileForm.get('skillsrated').setValue(this.skills1);
    } */
    
    //console.log(this.AddSkills.value);
    for(let skill of this.skills1)
    {
      if(skill.rating==null || skill.rating=='')
      {
        console.log(skill.skills);
        this.profileForm.get('skillsrated').setErrors({'incorrect':true});
      }
      
    }
    let values = this.TechReviewForms.value;
    if(this.TechReviewForms.get('ratings').value>5 || this.TechReviewForms.get('ratings').value<0)
    {
      this.TechReviewForms.get('ratings').setErrors({'incorrect':true});
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
    let language:any=[];
    language=this.HrForm.get('languages');
    /* for(let l of language)
    {
      if(l.rating==null)
      {
        this.HrForm.get('languages').setErrors({'incorrect':true});
      }
    } */
    console.log(this.HrRating.value);
    this.hrSubmit = true;
    if(this.fresher){
      this.HrRating.get('curCTC').setErrors(null);
      this.HrRating.get('noticePeriod').setErrors(null);
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


