import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ManagelivestreamService } from "../managelivestream.service";
import { SocketioService } from "../socketio.service";
import { Meta } from "@angular/platform-browser";
import { FormArray, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Env } from "src/app/env";

const navigator = window.navigator as any;

@Component({
  selector: "app-managelivestream",
  templateUrl: "./managelivestream.component.html",
  styleUrls: ["./managelivestream.component.css"],
})
export class ManagelivestreamComponent {
  streams: any;
  page = 0;
  iso: any;
  setinterval: any;
  baseURL: any = Env.baseAPi;
  Instruction: any = false;

  setTimeinterval() {
    this.iso = new Date().getTime();
    this.setinterval = setInterval(() => {
      this.iso = new Date().getTime();
    }, 1000);
  }
  ngOnInit(): void {
    this.get_streams();
    this.setTimeinterval();
    if (localStorage.getItem("popup") == "viewd") {
      console.log("worked....");
    } else {
      console.log("not worked.......");
      this.Instruction = true;
    }
  }
  constructor(
    public api: ManagelivestreamService,
    public route: ActivatedRoute,
    public router: Router,
    public socket: SocketioService,
    private meta: Meta,
    private fb: FormBuilder
  ) { }
  loader: any = false;
  ngOnDestroy(): void {
    clearInterval(this.setinterval);
  }
  my_stream: any;
  streamrequestposts: any;
  next: any = false;
  allowed_count: any = 0
  get_streams() {
    let id = localStorage.getItem("demoStream");
    console.log(id, 987878787)

    this.socket._buyer_registor(id).subscribe((res: any) => {
      console.log(res)
      this.allowed_count = res.register;
    })
    this.api.get_all_plans(id).subscribe((res: any) => {
      console.log(res)
      this.my_stream = res.token;
      this.allowed_count = res.allowed_count;
      this.streamrequestposts = res.streampost;
    }, error => {
      console.log(error.error.message);
      window.close();
      this.router.navigateByUrl("/demo/" + id);
      // this.error_message = error.error.message;
    })

  }
  pagination(type: any) {
    console.log(type);
    if (type == "prev") {
      this.page--;
    }
    if (type == "next") {
      this.page++;
    }
    // this.get_streams(this.page);
  }

  view_details: any;
  view_details_type: any;
  view_request(type: any, item: any) {
    console.log(item);
    this.view_details = item;
    this.view_details_type = type;
    // $('#view_details').modal('show');
  }
  go_live(item: any) {
    let id = localStorage.getItem("demoStream")
    this.loader = true;
    this.api.go_to_live(id).subscribe((res: any) => {
      console.log(res)
      setTimeout(() => {
        this.loader = false;
        this.router.navigateByUrl('stream/livestream/golive?id=' + item._id);
      }, 400)
    })
  }
  close_popup() {
    this.view_details = null;
    this.view_details_type = null;
  }
  change_view(type: any) {
    this.view_details_type = type;
  }

  sortForm: any = "All";
  sort_byr(type: any) {
    this.sortForm = type;
    this.page = 0;
    // this.get_streams(this.page);
  }
  share(item: any) {
    console.log(item);
    this.share_icon = item._id;
  }
  close_popup_share() {
    this.share_icon = null;
  }

  copy_success: any = false;
  share_icon: any;
  copy_now() {
    this.copy_success = true;
    navigator.clipboard.writeText('https://institution.agrijobfair.online/demo/' + this.share_icon);
    setTimeout(() => {
      this.copy_success = false;
    }, 2000);
  }

  images: any[] = [
    {
      image: "../../../../assets/images/step-1.png",
      content:
        "By clicking the Share icon you can share the link to respective customer (Buyer)…… to watch your live stream",
    },
    {
      image: "../../../../assets/images/step-2.png",
      content: "You can also share this link using social media platform",
    },
    {
      image: "../../../../assets/images/step4.png",
      content:
        "If any buyer register to your live stream the count will be automatically increase in visitor registration",
    },
    {
      image: "../../../../assets/images/step-3.png",
      content: "After The buyer registered you can start live By Clicking “Go Live” Button"
      ,
    },
  ];

  nextClick() {
    this.indexNum = this.indexNum + 1;
    this.singleImage = this.images[this.indexNum];
  }
  prevClick() {
    this.indexNum = this.indexNum - 1;
    this.singleImage = this.images[this.indexNum];
  }
  indexNum: any = 0;
  singleImage: any = this.images[0];

  closeClick() {
    this.Instruction = false;
    localStorage.setItem("popup", "viewd")
  }

  sms_popup: any = false;
  sms_send() {
    this.share_icon = null;
    this.sms_popup = true;
    this.add_control();
  }
  close_sms_via() {
    this.share_icon = this.my_stream._id;
    this.sms_popup = false;
    this.form_array.clear();
    this.open_confirm = false;
    this.submitetd = false;

  }

  via_sms: any = this.fb.group({
    numbers: this.fb.array([], Validators.required),
  })
  add_form_group() {
    this.add_control();

  }
  get form_array() {
    return this.via_sms.controls['numbers'] as FormArray;

  }
  submitetd: any = false;
  add_control() {
    let form = this.fb.group({
      num: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    });
    this.form_array.push(form)
    console.log(this.via_sms.value)
  }
  submit_sms() {
    this.submitetd = true;
    if (this.via_sms.valid) {
      this.open_confirm = true;
    }
  }
  remove_controls(item: any, i: any) {
    console.log(item)
    this.form_array.removeAt(i)

  }
  open_confirm: any = false;
  send_sms() {
    let number: any = [];
    this.form_array.controls.forEach((element: any) => {
      number.push(element.get('num').value)
    });
    let sms = {
      stream: localStorage.getItem("demoStream"),
      number: number
    }
    this.api.send_sms_multible(sms).subscribe((res: any) => {
      console.log(res)
    })
    console.log(sms)
  }
  edit() {
    this.open_confirm = false;
  }
}
