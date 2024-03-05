import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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
export class RegisterMobileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private Api: VolunteerServiceService,
    private route: Router,
    private Aroute: ActivatedRoute
  ) { }
  queryId: any = null;
  ngOnInit(): void {

  }
  currentYear = new Date().getFullYear();
  yearsArray: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  ];

  monthsArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
    if (this.queryId == null) {
      this.tabs = e;
      this.profileForm.get('Role')?.setValue(e);
    } else {
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
    experiencefrom: new FormControl('', [Validators.required]),
    experienceTo: new FormControl('', [Validators.required]),
    hrExperienceFrom: new FormControl('', [Validators.required]),
    hrExperienceTo: new FormControl('', [Validators.required]),
    workStatus: new FormControl('', [Validators.required]),
    currentCTC: new FormControl('', [Validators.required]),
    currentLocation: new FormControl('', [Validators.required]),
    language: this.fb.array([], [Validators.required]),
    coreExperienceFrom: new FormControl('', [Validators.required]),
    coreExperienceTo: new FormControl('', [Validators.required]),
    skills: this.fb.array([], [Validators.required]),
    roleCategory: new FormControl('', [Validators.required]),
    Education: new FormControl('', [Validators.required]),
    charges: new FormControl('', [Validators.required]),
  });

  add_form_control(event: any) {
    console.log(event.target.checked, 'asdf');
    let value = event.target.value;
    let action = event.target.checked;
    let data: any = this.fb.group({
      language: new FormControl(value),
      speak: new FormControl(false),
      read: new FormControl(false),
      write: new FormControl(false),
    });
    if (action) {
      this.dataCtrls.push(data);
    } else {
      console.log(this.dataCtrls.value);
      let find = this.dataCtrls.value.findIndex(
        (a: any) => a.language == value
      );
      console.log(find);
      if (find != -1) {
        this.dataCtrls.removeAt(find);
      }
      console.log(this.dataCtrls.value);
    }
  }
  get dataCtrls() {
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
  // submitForm() {
  //   this.submittedForm = true;
  //   if (this.tabs == 'HR Volunteer') {
  //     this.profileForm.get('skills')?.setErrors(null);
  //     // this.profileForm.get('currentSkill')?.setErrors(null);
  //     // this.profileForm.get('evalutionSkill')?.setErrors(null);
  //     this.profileForm.get('coreExperienceFrom')?.setErrors(null);
  //     this.profileForm.get('coreExperienceTo')?.setErrors(null);
  //     this.profileForm.get('currentDepartment')?.setErrors(null);
  //     this.profileForm.get('currentIntestry')?.setErrors(null);
  //   } else {
  //     this.profileForm.get('hrExperienceFrom')?.setErrors(null);
  //     this.profileForm.get('hrExperienceTo')?.setErrors(null);
  //     this.profileForm.get('skills')?.setValue(this.skills1);
  //     this.profileForm.get('currentSkill')?.setValue(this.skills2);
  //   }

  //   console.log(this.profileForm.value);
  //   console.log(this.profileForm.valid);
  //   if (this.profileForm.valid) {
  //     

  //     this.Api.volunteerReg(this.profileForm.value).subscribe((e: any) => {
  //       if (this.selectedFile != null) {
  //         this.fileUploadtoServer(e._id);
  //       }
  //      
  //       this.route.navigateByUrl('/mail-send');
  //       this.submittedForm = true;
  //     });
  //   }
  // }
  serErr: any = null;
  submitForm() {
    this.submittedForm = true;
    if (this.tabs == 'HR Volunteer') {
      this.profileForm.get('skills')?.setErrors(null);
      this.profileForm.get('coreExperienceFrom')?.setErrors(null);
      this.profileForm.get('coreExperienceTo')?.setErrors(null);
      this.profileForm.get('currentDepartment')?.setErrors(null);
      this.profileForm.get('currentIntestry')?.setErrors(null);
    } else {
      this.profileForm.get('hrExperienceFrom')?.setErrors(null);
      this.profileForm.get('hrExperienceTo')?.setErrors(null);
    }

    console.log(this.profileForm.value);
    console.log(this.profileForm.valid);
    if (this.queryId == null) {
      if (this.profileForm.valid) {

        console.log(this.profileForm.value, 'Edite Check');
        this.Api.volunteerReg(this.profileForm.value).subscribe(
          (e: any) => {
            if (this.fileName != '') {
              this.fileUploadtoServer(e._id);
            }

            if (this.queryId != null) {
              this.route.navigateByUrl('/profile');
            } else {
              this.route.navigateByUrl('/mail-send');
            }

            this.submittedForm = true;
          },
          (err: any) => {

            this.serErr = err.error.message;
          }
        );
      }
    } else {
      if (this.profileForm.valid) {

        this.Api.updateVolunteer(
          this.profileForm.value
        ).subscribe((e: any) => {
          if (this.fileName != '') {
            this.fileUploadtoServer(e._id);
          }

          this.route.navigateByUrl('/profile');
        });
      }
    }
  }


  skillsArr: any;


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
  get addSkills() {
    return this.profileForm.get('skills') as FormArray;
  }

  fileUploadtoServer(id: any) {
    const formdata = new FormData();
    formdata.append('image', this.fileName);
    this.Api.uploadImage(id, formdata).subscribe((e: any) => {
      console.log(e);
    });
  }

  remove_index(i: any) {
    this.addSkills.removeAt(i);
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