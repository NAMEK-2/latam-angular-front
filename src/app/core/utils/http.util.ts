import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpUtil {

  static readonly CONTENT_TYPE: string = 'Content-Type';
  static readonly APPLICATION_JSON_UTF8: string = 'application/json; charset=utf-8';

  constructor(private readonly http: HttpClient) {
  }

  public postJson<T>(url: string, body: any ): Observable<T> {
    let headersAux = new HttpHeaders();
    headersAux = headersAux.set(HttpUtil.CONTENT_TYPE, HttpUtil.APPLICATION_JSON_UTF8);
    return this.http.post<T>(url, body, {
      headers: headersAux,
      responseType: 'json'
    });
  }

}
