import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class CompletestreamService {

  constructor(public http: HttpClient) { }
  baseURL = Env.baseAPi
  get_stream_posts(id: any) {
    return this.http.get(this.baseURL + '/v1/ecomplan/get/post/after/complete/stream?id=' + id);
  }
  start_end_time_update(id: any, data: any) {
    return this.http.put(this.baseURL + '/v1/ecomplan/update/start/end/time?id=' + id, data);
  }
  video_upload_post(id: any, file: any) {
    return this.http.put(this.baseURL + '/v1/ecomplan/update/video/post?id=' + id, file, { reportProgress: true, observe: 'events' });

  }
  get_video_link(id:any) {
    return this.http.get(this.baseURL + '/v1/ecomplan/get/video/link?id=' + id);
  }
}
