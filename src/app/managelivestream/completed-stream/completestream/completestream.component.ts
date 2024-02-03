import { CompletestreamService } from './../completestream.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-completestream',
  templateUrl: './completestream.component.html',
  styleUrls: ['./completestream.component.css']
})
export class CompletestreamComponent implements OnInit{
  stream_post: any;

  constructor(public route: ActivatedRoute, public api: CompletestreamService) {

  }
  streamId: any;
  streamdetails: any;
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((res: any) => {
      console.log(res.params.id)
      this.streamId = res.params.id;
      this.get_stream_post(this.streamId);
    })
  }

  get_stream_post(id: any) {
    this.api.get_stream_posts(id).subscribe((res: any) => {
      console.log(res)
      this.streamdetails = res;
    })
  }
  @ViewChild('myVideo') myVideo: any;

  video_link: any;
  play_video() {
    this.api.get_video_link(this.streamId).subscribe((res: any) => {
      console.log(res, 23123)
      this.video_link = res.temptokens
    })
  }

  uploadForm: any = new FormGroup({
    select_type: new FormControl('', Validators.required),
    videoStart: new FormControl(null, Validators.required),
    videoEnd: new FormControl(null, Validators.required),
    video: new FormControl(null, Validators.required)
  })
  uploadForm_submit(Close: any) {
    console.log(this.uploadForm.value)
    console.log(this.uploadForm.valid)
    if (this.uploadForm.valid) {
      if (this.uploadForm.value.select_type == 'SetTime') {
        let date = {
          videoEnd: this.uploadForm.get('videoEnd')?.value,
          videoStart: this.uploadForm.get('videoStart')?.value,
        }
        this.api.start_end_time_update(this.view_details.streampostId, date).subscribe((res: any) => {
          this.get_stream_post(this.streamId);
          this.uploadForm.reset();
          Close.click();
        })
      }
      if (this.uploadForm.value.select_type == 'UploadExclusiveVideo') {
        let formdata = new FormData();
        formdata.append('video', this.uploadForm.get('video').value)
        this.api.video_upload_post(this.view_details.streampostId, formdata,).subscribe((res: any) => {
          if (res.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(res.loaded / res.total * 100);
            console.log(this.uploadProgress)
          }
          if (this.uploadProgress == 100) {
            this.get_stream_post(this.streamId);
            this.uploadForm.reset();
            Close.click();
          }
        })

      }
    }
  }
  uploadProgress: any = 0
  choose_video(event: any) {

    console.log(event.target.files)
    if (event.target.files.length != 0) {
      this.uploadForm.get('video')?.setValue(event.target.files[0])
    }
    else {
      this.uploadForm.get('video')?.setValue(null)
    }

  }
  choose_method(event: any) {
    if (event.target.value == 'SetTime') {
      this.uploadForm.get('videoStart')?.setErrors({ incorrect: true })
      this.uploadForm.get('videoEnd')?.setErrors({ incorrect: true })
      this.uploadForm.get('video')?.setErrors(null)
    }
    if (event.target.value == 'UploadExclusiveVideo') {
      this.uploadForm.get('videoStart')?.setErrors(null)
      this.uploadForm.get('videoEnd')?.setErrors(null)
      this.uploadForm.get('video')?.setErrors({ incorrect: true })
    }
  }
  view_details: any;

  download_video() {
    console.log(this.streamdetails.streamName, 324231242)
    this.api.get_video_link(this.streamId).subscribe((res: any) => {
      console.log(res)
      res.temptokens.forEach((element: any) => {
        if (element.convertStatus == 'Converted') {
          this.download(element.convertedVideo, this.streamdetails.streamName + ".mp4");
        }
      });

    })
  }

  download(dataurl: any, filename: any) {
    const link = document.createElement("a");
    link.href = dataurl;
    link.download = this.streamdetails.streamName + ".mp4";
    link.click();
  }

  ngOnDestroy(): void {
    // alert("as")
    this.video_link = null;
  }
}
