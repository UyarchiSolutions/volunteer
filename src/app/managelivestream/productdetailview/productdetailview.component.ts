import { Component, Input, OnInit } from '@angular/core';
import { SocketioService } from '../socketio.service';
import { ManagelivestreamService } from '../managelivestream.service';
import { Env } from 'src/app/env';

@Component({
  selector: 'app-productdetailview',
  templateUrl: './productdetailview.component.html',
  styleUrls: ['./productdetailview.component.css']
})
export class ProductdetailviewComponent implements OnInit {

  @Input('data') data: any;

  constructor(private api: ManagelivestreamService, private web: SocketioService) {

  }
  baseUrl = Env.baseAPi;

  viewProduct: any;

  ngOnInit(): void {
    console.log(this.data, 12312312)
    if (this.data != null) {
      this.get_post_view(this.data.streampostsId)
    }
  }
  get_post_view(id: any) {
    this.api.get_post_view(id).subscribe((res: any) => {
      console.log(res, 123123123123)
      this.viewProduct = res;
    })
  }
  down_now() {
    this.web.productView.next(null)
  }

}
