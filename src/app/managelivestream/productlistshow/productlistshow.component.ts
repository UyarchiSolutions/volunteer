import { Component, Input, OnInit } from '@angular/core';
import { SocketioService } from '../socketio.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagelivestreamService } from '../managelivestream.service';
import { Env } from 'src/app/env';

@Component({
  selector: 'app-productlistshow',
  templateUrl: './productlistshow.component.html',
  styleUrls: ['./productlistshow.component.css']
})
export class ProductlistshowComponent implements OnInit {

  @Input("id") id: any;
  @Input("streamDetails") streamDetails: any;
  baseURL = Env.baseAPi
  constructor(public Socket: SocketioService, private api: ManagelivestreamService) { }
  primaryHost: any = false;
  streamProduct: any;
  raise_hands: any = [];
  ngOnInit(): void {
    if (this.streamDetails != null) {
      this.raise_hands = this.streamDetails.raise;
      this.raise_hand_option.setValue(this.streamDetails.token.raise_hands)
      this.get_post_details();
      this.streamPending = this.streamDetails.streamPending == false ? false : true;
      this.primaryHost = this.streamDetails.primaryHost;
      this.streamProduct = this.streamDetails.streampost
    }
    this.Socket.hand_raised_user(this.streamDetails.token._id).subscribe((res: any) => {
      console.log(res)
      let find = this.raise_hands.findIndex((a: any) => a._id == res._id);
      if (find != -1) {
        this.raise_hands[find].raise_hands = res.raise_hands;
      }
      else {
        this.raise_hands.push(res);
      }
    })
    this.Socket.accept_raise_hand(this.streamDetails.token._id).subscribe((res: any) => {
      console.log(res, 877677)
      this.streamDetails.token.raiseUser = res.raiseUser;
    })

    this.Socket.get_cart_qty(this.id).subscribe((res: any) => {
      console.log(res, 213567)

      res.forEach((element: any) => {
        let index = this.streamProduct.findIndex((a: any) => a._id == element._id);
        if (index != -1) {
          this.streamProduct[index].stream_cart = element.stream_cart;
          this.streamProduct[index].stream_checkout = element.stream_checkout;
        }
      });
    })
  }
  get_post_details() {
    this.Socket.get_post_details(this.streamDetails._id).subscribe((res: any) => {
      console.log(res)
      this.streamProduct = res.value[0].streamrequestposts;

    })
    this.api.get_reference(this.id).subscribe((res: any) => {
      if (res != null) {
        this.myreference.patchValue({
          name_1: res.name_1,
          name_2: res.name_2,
          mobile_1: res.mobile_1,
          mobile_2: res.mobile_2,
          designation_1: res.designation_1,
          designation_2: res.designation_2,
        })
        if (res.name_2 != null) {
          this.add = true;
        }
      }
    })
  }
  streamPending: any = false;
  productView_web(val: any, event: any) {
    console.log(val)
    var element = event.target as HTMLElement;
    if (element.tagName != 'BUTTON') {
      this.Socket.productView.next(val)
    }
  }

  hand_raise($event: any) {
    this.api.turn_on_RYH(this.streamDetails.token._id).subscribe((res: any) => {
      console.log(res)
    })
  }
  raise_hand_option: any = new FormControl(false);

  accept_rhy(item: any) {
    this.api.accept_RYH(item._id).subscribe((res: any) => {
      console.log(res)
      this.streamDetails.token.raiseUser = item._id;
    })
  }
  end_rhy(item: any) {


    this.api.end_rhy(item._id).subscribe((res: any) => {
      this.streamDetails.token.raiseUser = null;
    })
  }

  reference: any = false;

  toggle_reference() {
    this.reference = !this.reference;
  }

  add: any = false;

  add_more() {
    this.add = !this.add;

  }

  change_key(event: any) {
    console.log(event.target.value)
    if (event.target.value == '' || event.target.value == null) {
      console.log(234);;
      this.myreference.controls['mobile_2'].setErrors(null);
      this.myreference.controls['designation_2'].setErrors(null);
    }
    else {
      console.log(8796);
      this.myreference.controls['mobile_2'].setErrors({ incurrect: true });
      this.myreference.controls['designation_2'].setErrors({ incurrect: true });

    }
    // console.log(this.myreference.get('name_1').valid, 'name_1')
    // console.log(this.myreference.get('mobile_1').valid, 'mobile_1')
    // console.log(this.myreference.get('designation_1').valid, 'designation_1')
    // console.log(this.myreference.get('name_2').valid, 'name_2')
    // console.log(this.myreference.get('mobile_2').valid, 'mobile_2')
    // console.log(this.myreference.get('designation_2').valid, 'designation_2')


  }


  myreference: any = new FormGroup({
    name_1: new FormControl(null, [Validators.required]),
    mobile_1: new FormControl(null, [Validators.required, Validators.pattern('[6-9]\\d{9}')]),
    designation_1: new FormControl(null, [Validators.required]),
    name_2: new FormControl(null),
    mobile_2: new FormControl(null, [Validators.pattern('[6-9]\\d{9}')]),
    designation_2: new FormControl(null),
  })
  submit() {
    this.submited = true;
    console.log(this.myreference.get('name_1').valid, 'name_1')
    console.log(this.myreference.get('mobile_1').valid, 'mobile_1')
    console.log(this.myreference.get('designation_1').valid, 'designation_1')
    console.log(this.myreference.get('name_2').valid, 'name_2')
    console.log(this.myreference.get('mobile_2').valid, 'mobile_2')
    console.log(this.myreference.get('designation_2').valid, 'designation_2')
    if (this.myreference.valid) {
      let date = {
        name_1: this.myreference.get('name_1').value,
        mobile_1: this.myreference.get('mobile_1').value,
        designation_1: this.myreference.get('designation_1').value,
      }
      if (this.myreference.get('name_2').value != null) {
        date = {
          ...date, ...{
            name_2: this.myreference.get('name_2').value,
            mobile_2: this.myreference.get('mobile_2').value,
            designation_2: this.myreference.get('designation_2').value,
          }
        }
      }
      this.api.create_reference(date, this.id).subscribe((res: any) => {
        this.reference = false;
      })
    }
  }

  submited: any = false;
}


