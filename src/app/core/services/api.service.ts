import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { APIUrl } from './constants';
import { StorageAdapterService } from './storage-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private options: {
    headers: HttpHeaders;
  };
  constructor(
    private http: HttpClient,
    private storageService: StorageAdapterService
  ) {
    const token = localStorage.getItem('token') || '';
    this.options = {
      headers: new HttpHeaders({
        authorization: token
      })
    };
  }

  postWithoutToken<T>(path: string, body: any): Promise<T> {
    return this.http
      .post(`${APIUrl}/${path}`, body)
      .pipe(
        map((response: any) => {
          if (response.success && response.data.token) {
            this.options.headers.set('authorization', response.data.token);
            this.storageService.setToken(response.data.token, sessionStorage);
          }
          return response.data as T;
        })
      )
      .toPromise();
  }

  post<T>(path: string, body: any): Promise<T> {
    return this.http
      .post(`${APIUrl}/${path}`, body, this.options)
      .pipe(map((response: any) => response.data as T))
      .toPromise();
  }

  get<T>(path: string): Promise<T> {
    return this.http
      .get(`${APIUrl}/${path}`, this.options)
      .pipe(map((response: any) => response.data as T))
      .toPromise();
  }
}
