import { Component } from '@angular/core';
import { VideoUploadService } from '../../video-upload.service';
import { ActivatedRoute } from '@angular/router';
import { Env } from 'src/app/env';

@Component({
  selector: 'app-video-upload-web',
  templateUrl: './video-upload-web.component.html',
  styleUrls: ['./video-upload-web.component.css']
})
export class VideoUploadWebComponent {

  backet: any = Env.backet;

  constructor(private api: VideoUploadService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((res: any) => {
      console.log(res)
      this.id = res.params.id;
    })
    this.get_completed_stream();
  }


  id: any;
  completed: any;
  get_completed_stream() {
    this.api.get_completed_stream(this.id).subscribe((res: any) => {
      console.log(res)
      this.completed = res.completed;
      this.slots = res.token;
      this.userdetails = res.candidate;
    })
  }


  download(url: any, i: any) {
    this.api.downloadFile(url).subscribe(
      (progress: any) => {
        if (typeof progress === 'number') {
        } else if (progress instanceof Blob) {
          this.createDownloadLink(progress, i, url)
        }
      },
      error => {
      }
    );
  }


  private createDownloadLink(blob: Blob, index: any, urls: any): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'video-' + (index + 1) + '.' + /[^.]+$/.exec(urls); // Set the desired filename for the downloaded video
    a.click();
    window.URL.revokeObjectURL(url);
  }


  teaser_upload(file: any) {
    let formdata = new FormData();
    formdata.append('file', file);
    formdata.append('id', this.id);
    this.api.upload_treaser(formdata).subscribe((res: any) => {
      console.log(res)
      this.slots = res;
    })
  }

  trailer_upload(file: any) {
    let formdata = new FormData();
    formdata.append('file', file);
    formdata.append('id', this.id);
    this.api.upload_trailer(formdata).subscribe((res: any) => {
      this.slots = res;
      console.log(res)
    })
  }

  edited_upload(file: any) {
    let formdata = new FormData();
    console.log(file, 342323)
    formdata.append('file', file);
    formdata.append('id', this.id);
    this.api.upload_edited(formdata).subscribe((res: any) => {
      console.log(res)
      this.slots = res;
    })
  }


  choose_file(event: any, type: any) {
    let files = event.target.files;
    if (files.length != 0) {
      files = files[0]
      if (files.type == 'video/mp4') {
        if (type == 'teaser') {
          this.teaser_upload(files);
        }
        if (type == 'trailer') {
          this.trailer_upload(files);
        }
        if (type == 'edited') {
          this.edited_upload(files);
        }
      }
    }
    event.target.files = null;
  }


  slots: any;

  userdetails: any;
  popup: any = false;

  play_url: any;

  play_now(url: any) {
    this.popup = true;
    this.play_url = url;
  }
  closePriview() {
    this.popup = false
  }
}
