import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import {
  FormControl,
  FormArray,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-register-mobile',
  templateUrl: './register-mobile.component.html',
  styleUrls: ['./register-mobile.component.css'],
})
export class RegisterMobileComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private Api: VolunteerServiceService,
    private route: Router,
    private Aroute: ActivatedRoute
  ) { }


  ngOnInit(): void {

  }

  currentYear = new Date().getFullYear();
  yearsArray: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  ];

  monthsArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  tabs: any = 'HR Volunteer';
  indianLanguages = [
    'English',
    'Hindi',
    'Bengali',
    'Telugu',
    'Marathi',
    'Tamil',
    'Urdu',
    'Gujarati',
    'Kannada',
    'Odia',
    'Punjabi',
    'Malayalam',
    'Assamese',
    'Sanskrit',
    'Kashmiri',
    'Nepali',
    'Konkani',
    'Sindhi',
    'Manipuri',
    'Dogri',
    'Bodo',
  ];

  tab(e: any) {
    this.tabs = e;
    this.profileForm.get('Role')?.setValue(e);
    if (this.tabs == 'HR Volunteer') {
      this.profileForm.get('skills')?.clear();
      this.search_skils.reset();
      this.profileForm.get('coreExperienceFrom')?.setValue('');
      this.profileForm.get('coreExperienceTo')?.setValue('');
    } else {
      this.profileForm.get('hrExperienceFrom')?.setValue('');
      this.profileForm.get('hrExperienceTo')?.setValue('');
      this.profileForm.get('skills')?.setValue([]);
    }
  }

  get FormControls() {
    return this.profileForm.control;
  }

  profileForm: any = this.fb.group({
    name: new FormControl('', [Validators.required]),
    Role: new FormControl('HR Volunteer', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    experiencefrom: new FormControl(null, [Validators.required]),
    experienceTo: new FormControl(null, [Validators.required]),
    hrExperienceFrom: new FormControl(null, [Validators.required]),
    hrExperienceTo: new FormControl(null, [Validators.required]),
    workStatus: new FormControl('', [Validators.required]),
    currentCTC: new FormControl('', [Validators.required]),
    currentLocation: new FormControl('', [Validators.required]),
    language: this.fb.array([], [Validators.required]),
    coreExperienceFrom: new FormControl(null, [Validators.required]),
    coreExperienceTo: new FormControl(null, [Validators.required]),
    skills: this.fb.array([], [Validators.required]),
    roleCategory: new FormControl('', [Validators.required]),
    Education: new FormControl('', [Validators.required]),
    resumename: new FormControl('', [Validators.required]),
    // charges: new FormControl('', [Validators.required]),
  });


  add_form_control(event: any) {
    let value = event.target.value;
    let action = event.target.checked;
    let data: any = this.fb.group({
      language: new FormControl(value),
      speak: new FormControl(false),
      read: new FormControl(false),
      write: new FormControl(false),
    });
    if (action) {
      let find = this.dataCtrls.value.findIndex(
        (a: any) => a.language == value
      );
      // console.log(find, "Found.");
      if (find != -1) {
        console.log("Already added.");
      }
      else {
        this.dataCtrls.push(data);
      }
    } else {
      console.log(this.dataCtrls.value);
      let find = this.dataCtrls.value.findIndex(
        (a: any) => a.language == value
      );
      console.log(find, "Found.");
      if (find != -1) {
        this.dataCtrls.removeAt(find);
      }
      console.log(this.dataCtrls.value);
    }
  }
  get dataCtrls() {
    //console.log(this.profileForm.controls['language'].value);
    return this.profileForm.controls['language'] as FormArray;

  }

  remove_controls(i: any) {
    this.dataCtrls.removeAt(i);
  }

  submitted: any = false;

  fileName: any = '';
  selectedFile: any = null;
  fileUpload(e: any) {
    const reader = new FileReader();
    this.fileName = e.target.files[0];
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (_event) => {
      this.selectedFile = reader.result;
      console.log(this.selectedFile);
    };
  }

  removeFile() {
    this.selectedFile = null;
    this.fileName = '';
  }
  submittedForm: any = false;
  serErr: any = null;

  submitForm() {

    if (this.profileForm.valid) {
      this.Api.volunteerReg(this.profileForm.value).subscribe(
        (e: any) => {
          if (this.fileName != '') {
            this.fileUploadtoServer(e._id);
          }
          this.route.navigateByUrl('/mail-send');
          this.submittedForm = false;
          document.getElementById('close_popup')?.click()
        },
        (err: any) => {
          this.serErr = err.error.message;
        }
      );
    }
  }

  resume: any;
  choose_resume(event: any) {
    if (event.target.files != null)
      if (event.target.files.length != 0) {
        const reader = new FileReader();
        this.resume = event.target.files[0];
        console.log(this.resume)
        this.profileForm.get('resumename').setValue(this.resume.name)
      }
      else {
        this.profileForm.get('resumename').setValue(null)
      }
    else {
      this.profileForm.get('resumename').setValue(null)
    }

  }
  remove_resume() {
    this.profileForm.get('resumename').setValue(null)
    this.resume = null
  }

  skilldata: any;
  getSkill(eve: any) {
    let keys = eve.target.value;
    this.Api.getSkill(keys).subscribe((e: any) => {
      console.log(e);
      this.skilldata = e;
    });
  }

  skilldata1: any = [];

  getSkill1(eve: any) {
    let keys = eve.target.value;
    this.Api.getSkill(keys).subscribe((e: any) => {
      this.skilldata1 = e;
    });
  }

  removeKeyskill(val: any) {
    let skills = this.profileForm.get('skills')?.value;
    let ind = skills.findIndex((e: any) => {
      return e == val;
    });
    console.log(ind);
    this.profileForm.get('skills').value.splice(ind, 1);
    if (this.profileForm.get('skills').value != null) {
      this.profileForm.get('skills').value.length == 0
        ? this.profileForm.get('skills').setErrors({ incorrect: true })
        : '';
    }
    console.log(
      this.profileForm.get('skills').valid,
      this.profileForm.get('skills').value
    );
  }

  removeCorekill(val: any) {
    let skills = this.profileForm.get('currentSkill')?.value;
    let ind = skills.findIndex((e: any) => {
      return e == val;
    });
    console.log(ind);
    this.profileForm.get('currentSkill').value.splice(ind, 1);
    if (this.profileForm.get('currentSkill').value != null) {
      this.profileForm.get('currentSkill').value.length == 0
        ? this.profileForm.get('currentSkill').setErrors({ currentSkill: true })
        : '';
    }
  }

  skillsArr: any;
  // add Skills


  addSkill1(e: any) {
    let findInd = this.addSkills.value.findIndex((s: any) => {
      return s == e.target.value;
    });
    if (findInd == -1) {
      this.addSkills.push(new FormControl(e.target.value));
    } else {
      this.addSkills.removeAt(findInd);
    }

  }
  remove_index(i: any) {
    this.addSkills.removeAt(i);
  }

  fileUploadtoServer(id: any) {
    const formdata = new FormData();
    formdata.append('image', this.fileName);
    formdata.append('resume', this.resume);
    this.Api.uploadImage(id, formdata).subscribe((e: any) => {
      console.log(e);
    });
  }



  get addSkills() {
    return this.profileForm.get('skills') as FormArray;
  }

  focus_me(event: any) {
    if (this.search_skils.valid) {
      this.Api.get_skills(this.search_skils.value).subscribe((res: any) => {
        console.log(res);
        this.skillsArr = res;
        let maulti: any = document.getElementById('skils-option');
        if (!maulti.className.includes("show")) {
          document.getElementById('multi-check')?.click()
        }
      }, error => {
        this.skillsArr = null
      })
    }

  }
  search_skils: any = new FormControl(null)


  open_pop() {

    // this.fileUploadtoServer('a4f979f1-705d-45ed-b105-4dd5393fd8bb');


    this.submittedForm = true;
    if (this.tabs == 'HR Volunteer') {
      this.profileForm.get('skills')?.setErrors(null);
      this.profileForm.get('coreExperienceFrom')?.setErrors(null);
      this.profileForm.get('coreExperienceTo')?.setErrors(null);

      let experiencefrom = this.profileForm.get('experiencefrom')
      let experienceTo = this.profileForm.get('experienceTo')
      let coreExperienceFrom = this.profileForm.get('hrExperienceFrom')
      let coreExperienceTo = this.profileForm.get('hrExperienceTo')
      if (experiencefrom.value != null && coreExperienceFrom.valid != null && experienceTo.valid != null && coreExperienceTo.valid != null) {
        experiencefrom = parseInt(experiencefrom.value);
        experienceTo = parseInt(experienceTo.value);

        coreExperienceFrom = parseInt(coreExperienceFrom.value);
        coreExperienceTo = parseInt(coreExperienceTo.value);
        let coremonth = (coreExperienceTo * 100) / 1200;
        let coretotal = coreExperienceFrom + coremonth;

        let totalmonth = (experienceTo * 100) / 1200;
        let totalexp = experiencefrom + totalmonth;
        console.log(coretotal, totalexp)
        if (coretotal > totalexp) {
          this.profileForm.get('experiencefrom').setErrors({ 'incorrect': true })
          this.profileForm.get('experienceTo').setErrors({ 'incorrect': true })
          this.profileForm.get('hrExperienceFrom').setErrors({ 'incorrect': true })
          this.profileForm.get('hrExperienceTo').setErrors({ 'incorrect': true })
        }
        else {
          this.profileForm.get('experiencefrom').setErrors(null)
          this.profileForm.get('experienceTo').setErrors(null)
          this.profileForm.get('hrExperienceFrom').setErrors(null)
          this.profileForm.get('hrExperienceTo').setErrors(null)
        }
      }



    }
    else {
      this.profileForm.get('hrExperienceFrom').setErrors(null);
      this.profileForm.get('hrExperienceTo').setErrors(null);

      let experiencefrom = this.profileForm.get('experiencefrom')
      let coreExperienceFrom = this.profileForm.get('coreExperienceFrom')
      let experienceTo = this.profileForm.get('experienceTo')
      let coreExperienceTo = this.profileForm.get('coreExperienceTo')
      if (experiencefrom.value != null && coreExperienceFrom.valid != null && experienceTo.valid != null && coreExperienceTo.valid != null) {
        experiencefrom = parseInt(experiencefrom.value);
        experienceTo = parseInt(experienceTo.value);

        coreExperienceFrom = parseInt(coreExperienceFrom.value);
        coreExperienceTo = parseInt(coreExperienceTo.value);
        let coremonth = (coreExperienceTo * 100) / 1200;
        let coretotal = coreExperienceFrom + coremonth;

        let totalmonth = (experienceTo * 100) / 1200;
        let totalexp = experiencefrom + totalmonth;
        console.log(coretotal, totalexp)
        if (coretotal > totalexp) {
          this.profileForm.get('experiencefrom').setErrors({ 'incorrect': true })
          this.profileForm.get('experienceTo').setErrors({ 'incorrect': true })
          this.profileForm.get('coreExperienceFrom').setErrors({ 'incorrect': true })
          this.profileForm.get('coreExperienceTo').setErrors({ 'incorrect': true })
        }
        else {
          this.profileForm.get('experiencefrom').setErrors(null)
          this.profileForm.get('experienceTo').setErrors(null)
          this.profileForm.get('coreExperienceFrom').setErrors(null)
          this.profileForm.get('coreExperienceTo').setErrors(null)
        }
      }
    }

    if (this.profileForm.valid) {
      setTimeout(() => {
        document.getElementById('open_now')?.click();
      }, 100)
    }
  }

  ngOnDestroy(): void {
    document.getElementById('close_popup')?.click()
  }
}

@Pipe({
  name: 'checked',
})
export class checkedForm implements PipeTransform {
  constructor() { }
  transform(form: any, value: any): Boolean {
    let index = form.indexOf(value);
    if (index != -1) {
      return true;
    }
    return false;
  }
}



@Pipe({
  name: 'checked_obj',
})
export class checkedForm_obj implements PipeTransform {
  constructor() { }
  transform(form: any, value: any): Boolean {
    let index = form.findIndex((a: any) => a.language == value);
    if (index != -1) {
      return true;
    }
    return false;
  }
}