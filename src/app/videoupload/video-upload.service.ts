import { Injectable } from '@angular/core';
import { Env } from '../env';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {

  baseurl = Env.baseAPi;

  constructor(private http: HttpClient) { }

  get_completed_stream(id: any) {
    return this.http.get(this.baseurl + "/v2/demostream/compleletd/videos?id=" + id);
  }


  downloadFile(url: string): Observable<number | Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/octet-stream' });

    return this.http.get(url, {
      headers: { "Content-Type": "application/json" },
      observe: 'events',
      responseType: 'blob',
      reportProgress: true,
    }).pipe(
      map((event: any) => {
        if (event.type === HttpEventType.DownloadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);
          return percentDone;
        } else if (event.type === HttpEventType.Response) {
          return event.body;
        }
      })
    );
  }

  upload_treaser(data: any) {
    return this.http.post(this.baseurl + "/v2/demostream/upload/treaser", data);
  }
  upload_trailer(data: any) {
    return this.http.post(this.baseurl + "/v2/demostream/upload/trailer", data);
  }
  upload_edited(data: any) {
    return this.http.post(this.baseurl + "/v2/demostream/upload/edited", data);
  }


}
