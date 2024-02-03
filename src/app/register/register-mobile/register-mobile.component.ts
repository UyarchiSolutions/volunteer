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
  ) {}
  queryId: any = null;
  ngOnInit(): void {
    this.Aroute.queryParams.subscribe((e: any) => {
      this.queryId = e.id;
    });
    if (this.queryId != null) {
      this.edit();
    }
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
    // experiencefrom_month: new FormControl('', [Validators.required]),
    experienceTo: new FormControl('', [Validators.required]),
    // experienceTo_month: new FormControl('', [Validators.required]),
    hrExperienceFrom: new FormControl('', [Validators.required]),
    hrExperienceTo: new FormControl('', [Validators.required]),
    workStatus: new FormControl('', [Validators.required]),
    currentCTC: new FormControl('', [Validators.required]),
    currentLocation: new FormControl('', [Validators.required]),
    language: this.fb.array([], [Validators.required]),
    coreExperienceFrom: new FormControl('', [Validators.required]),
    coreExperienceTo: new FormControl('', [Validators.required]),
    // skillsfron: new FormControl(null),
    // currentSkillfron: new FormControl(null),
    skills: new FormControl([], [Validators.required]),
    // currentSkill: new FormControl([], [Validators.required]),
    // evalutionSkill: new FormControl('', [Validators.required]),
    // DOB: new FormControl('', [Validators.required]),
    // currentIntestry: new FormControl('', [Validators.required]),
    // currentDepartment: new FormControl('', [Validators.required]),
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
  //     this.Api.loader = true;

  //     this.Api.volunteerReg(this.profileForm.value).subscribe((e: any) => {
  //       if (this.selectedFile != null) {
  //         this.fileUploadtoServer(e._id);
  //       }
  //       this.Api.loader = false;
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
      // this.profileForm.get('currentSkill')?.setErrors(null);
      // this.profileForm.get('evalutionSkill')?.setErrors(null);
      this.profileForm.get('coreExperienceFrom')?.setErrors(null);
      this.profileForm.get('coreExperienceTo')?.setErrors(null);
      this.profileForm.get('currentDepartment')?.setErrors(null);
      this.profileForm.get('currentIntestry')?.setErrors(null);
    } else {
      this.profileForm.get('hrExperienceFrom')?.setErrors(null);
      this.profileForm.get('hrExperienceTo')?.setErrors(null);
      this.profileForm.get('skills')?.setValue(this.skills1);
      this.profileForm.get('currentSkill')?.setValue(this.skills2);
    }

    console.log(this.profileForm.value);
    console.log(this.profileForm.valid);
    if (this.queryId == null) {
      if (this.profileForm.valid) {
        this.Api.loader = true;
        console.log(this.profileForm.value, 'Edite Check');
        this.Api.volunteerReg(this.profileForm.value).subscribe(
          (e: any) => {
            if (this.fileName != '') {
              this.fileUploadtoServer(e._id);
            }
            this.Api.loader = false;
            if (this.queryId != null) {
              this.route.navigateByUrl('/profile');
            } else {
              this.route.navigateByUrl('/mail-send');
            }

            this.submittedForm = true;
          },
          (err: any) => {
            this.Api.loader = false;
            this.serErr = err.error.message;
          }
        );
      }
    } else {
      if (this.profileForm.valid) {
        this.Api.loader = true;
        this.Api.updateVolunteer(
          this.queryId,
          this.profileForm.value
        ).subscribe((e: any) => {
          if (this.fileName != '') {
            this.fileUploadtoServer(e._id);
          }
          this.Api.loader = false;
          this.route.navigateByUrl('/profile');
        });
      }
    }
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

  skils: any = new FormControl();
  skils2: any = new FormControl();

  select_skils(item: any) {
    console.log(item);
    let arr: any = this.profileForm.get('skills')?.value;
    arr?.push(item.Skill_Title);
    this.profileForm.get('skills')?.setValue(arr);
    this.skils.reset();
    this.skilldata = null;
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

  select_skils2(item: any) {
    let arr: any = this.profileForm.get('currentSkill')?.value;
    arr?.push(item.Skill_Title);
    this.profileForm.get('currentSkill')?.setValue(arr);
    this.skils2.reset();
    this.skilldata1 = [];
  }

  skillsArr: any = [
    'Horticulture',
    'Forestry',
    'Sericulture',
    'Biotechnology',
    'Agribusiness management',
    'Energy and Environmental engineering',
    'Agricultural engineering',
    'Food technology',
    'Agronomy',
    'Soil Science',
    'Agricultural Entomology',
    'Agricultural Pathology',
    'Meteorology',
    'Plant Breeding',
    'Plant Genetics',
    'Agricultural Economics',
    'Agricultural Extension',
    'Drone',
    'Biotechnology',
    'Food technology',
    'Crop physiology',
    'Remote sensing',
    'Agricultural Microbiology',
    'Geographical Information System',
    'Agricultural Nematology',
    'Agricultural statistics',
    'Organic farming',
    'Environmental science',
    'Entomology',
    'Plant protection',
    'Plant nematology',
    'Biodiversity',
    'Crop management',
    'Molecular breeding',
    'Floriculture',
    'Landscaping',
    'Turf management',
    'Nutrigenomics',
    'Harvest management',
    'Medicinal and aromatic crops',
    'Mulberry breeding',
    'Silkworm physiology',
    'Farm Mechanization',
    'Precision farming',
    'Renewable Energy Engineering',
    'Food Engineering',
    'Packaging technology',
    'Irrigation Water Management',
    'Remote Sensing',
    'Water harvesting',
    'Watershed Management',
    'Natural resource management',
    'Agroforestry',
    'Silviculture',
    'Tree breeding',
    'Food nanotechnology',
    'Food Fermentation',
    'Hormones and Enzymes',
    'Bio-fertilizers',
    'Microbial biotechnology',
    'Microbial genetics',
    'Root phenotyping',
    'Transgenics',
    'Agricultural informational technology',
    'Agribusiness Management',
    'Conservation tillage practices',
    'Weed control',
    'Agricultural economics',
    'Natural Resource Economics',
    'Environmental Economics',
    'Agricultural Marketing',
    'Bio-degraders',
    'pathogenic microorganisms',
  ];

  // add Skills
  skills1: any = [];

  addSkill1(e: any) {
    let findInd = this.skills1.findIndex((s: any) => {
      return s == e.target.value;
    });
    if (findInd == -1) {
      this.skills1.push(e.target.value);
    } else {
      this.skills1.splice(findInd, 1);
    }
    this.submittedForm.get('skillsfron').setValue(null);
  }

  addSkill1Remove(item: any) {
    console.log(item);
    let ind = this.skills1.findIndex((e: any) => {
      return e == item;
    });
    this.skills1.splice(ind, 1);
    console.log(this.skills1);
  }

  skills2: any = [];
  addSkill2() {
    if (this.profileForm.get('currentSkillfron').value != null) {
      this.skills2.push(this.profileForm.get('currentSkillfron').value);
      this.profileForm.get('currentSkillfron').setValue(null);
      console.log(this.skills2);
    }
  }

  fileUploadtoServer(id: any) {
    const formdata = new FormData();
    formdata.append('image', this.fileName);
    this.Api.uploadImage(id, formdata).subscribe((e: any) => {
      console.log(e);
    });
  }

  addSkill2Remove(item: any) {
    console.log(item);
    let ind = this.skills2.findIndex((e: any) => {
      return e == item;
    });
    this.skills2.splice(ind, 1);
    console.log(this.skills2);
  }
  edit() {
    this.Api.loader = true;
    this.Api.getVolunteerDetails().subscribe((e: any) => {
      console.log(e);
      this.tabs = e.Role;
      this.selectedFile = e.profileImage;
      this.profileForm.patchValue(e);
      console.log(this.profileForm.value);
      e.language.forEach((element: any) => {
        let data: any = this.fb.group({
          language: new FormControl(element.language),
          speak: new FormControl(element.speak),
          read: new FormControl(element.read),
          write: new FormControl(element.write),
        });
        this.dataCtrls.push(data);
      });
      this.Api.loader = false;
    });
  }
}

@Pipe({
  name: 'checked',
})
export class checkedForm implements PipeTransform {
  constructor() {}
  transform(form: any, value: any): Boolean {
    let index = form.findIndex((a: any) => a.language == value);
    if (index != -1) {
      return true;
    }
    return false;
  }
}
