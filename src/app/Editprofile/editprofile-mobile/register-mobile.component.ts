import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {
  FormControl,
  FormArray,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthcheckService } from 'src/app/auth-guard/authcheck.service';
import { VolunteerServiceService } from 'src/app/volunteer-service.service';

@Component({
  selector: 'app-editprofile-mobile',
  templateUrl: './register-mobile.component.html',
  styleUrls: ['./register-mobile.component.css'],
})
export class EditprofileComponentMobileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private Api: VolunteerServiceService,
    private route: Router,
    private Aroute: ActivatedRoute,
    private authcheck: AuthcheckService

  ) { }

  ngOnInit(): void {

    this.edit();

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
    this.tabs = e;
    this.profileForm.get('Role')?.setValue(e);

    if (this.tabs == 'HR Volunteer') {
      this.profileForm.get('skills')?.setValue('');
      this.profileForm.get('coreExperienceFrom')?.setValue('');
      this.profileForm.get('coreExperienceTo')?.setValue('');
      this.profileForm.get('currentDepartment')?.setValue('');
      this.profileForm.get('currentIntestry')?.setValue('');
    } else {
      this.profileForm.get('hrExperienceFrom')?.setValue('');
      this.profileForm.get('hrExperienceTo')?.setValue('');
      this.profileForm.get('skills')?.setValue([]);
      this.profileForm.get('currentSkill')?.setValue([]);
    }
  }

  get FormControls() {
    return this.profileForm.control;
  }

  profileForm: any = this.fb.group({
    name: new FormControl('', [Validators.required]),
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
    // charges: new FormControl('', [Validators.required]),
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
  serErr: any = null;
  submitForm() {
    this.submittedForm = true;
    if (this.tabs == 'HR Volunteer') {
      this.profileForm.get('skills')?.setErrors([]);
      this.profileForm.get('coreExperienceFrom')?.setErrors(null);
      this.profileForm.get('coreExperienceTo')?.setErrors(null);
      this.profileForm.get('currentDepartment')?.setErrors(null);
      this.profileForm.get('currentIntestry')?.setErrors(null);
    } else {
      this.profileForm.get('hrExperienceFrom')?.setErrors(null);
      this.profileForm.get('hrExperienceTo')?.setErrors(null);
    }
    if (this.profileForm.valid) {

      this.Api.updateVolunteer(
        this.profileForm.value
      ).subscribe((e: any) => {
        if (this.fileName != '') {
          this.fileUploadtoServer(e._id);
        }
        this.authcheck.userDetails.next(e)

        this.route.navigateByUrl('/profile', { replaceUrl: true });
      });
    }

  }



  skillsArr: any;

  // add Skills


  addSkill1(e: any) {
    let findInd = this.addSkills.value.findIndex((s: any) => {
      return s == e.target.value;
    });
    if (findInd == -1) {
      // this.skills1.push(e.target.value);
      this.addSkills.push(new FormControl(e.target.value));
    } else {
      // this.skills1.splice(findInd, 1);
      this.addSkills.value.splice(findInd, 1);
    }

  }

  remove_index(i: any) {
    this.addSkills.removeAt(i);
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

  edit() {
    this.Api.getVolunteerDetails().subscribe((e: any) => {
      if (e != null) {
        this.tabs = e.Role;
        this.selectedFile = e.profileImage;
        this.profileForm.get('language').value = e.language;
        console.log(this.profileForm.get('language').value);
        this.profileForm.patchValue(e);
        e.skills.forEach((x: any) => {
          this.addSkills.push(new FormControl(x));
        });
        e.language.forEach((element: any) => {
          let data: any = this.fb.group({
            language: new FormControl(element.language),
            speak: new FormControl(element.speak),
            read: new FormControl(element.read),
            write: new FormControl(element.write),
          });
          this.dataCtrls.push(data);
          console.log(this.dataCtrls.value);

        });

        console.log(this.dataCtrls.value);
      }

    });
  }

  error_image(event: any) {
    this.selectedFile = null
  }
}

@Pipe({
  name: 'checked',
})
export class checkedForm implements PipeTransform {
  constructor() { }
  transform(form: any, value: any): Boolean {
    let index = form.findIndex((a: any) => a == value);
    if (index != -1) {
      return true;
    }
    return false;
  }
}
