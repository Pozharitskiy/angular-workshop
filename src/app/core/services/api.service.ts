import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { APIUrl } from './constants';
import { Board } from '../models/board.model';
import { StorageAdapterService } from './storage-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private options: {
    headers: HttpHeaders;
  };
  isError: boolean = false;
  constructor(
    private http: HttpClient,
    private storageService: StorageAdapterService,
    private snackBar: MatSnackBar
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
        catchError(this.handleError.bind(this)),
        map((response: any) => {
          if (!response.success) {
            throw new Error();
          }
          if (response.success && response.data.token) {
            this.options.headers.set('authorization', response.data.token);
            this.storageService.setToken(response.data.token, sessionStorage);
          }

          return response.data as T;
        })
      )
      .toPromise();
  }

  post<T>(path: string, body: any, option: any): Promise<T> {
    return this.http
      .post(`${APIUrl}/${path}`, body, option)
      .pipe(map((response: any) => response.data as T))
      .toPromise();
  }

  deleteBoard(id: string): Observable<Board[]> {
    return this.http.delete<Board[]>(`${APIUrl}/boards/${id}`, this.options);
  }

  getBoards(path: string): Observable<Board[]> {
    return this.http.get<Board[]>(`${APIUrl}/${path}`, this.options);
  }

  getBoard(id: string): Observable<Board[]> {
    return this.http.get<Board[]>(`${APIUrl}/boards/${id}`, this.options);
  }

  handleError(error: HttpErrorResponse) {
    this.isError = true;

    this.snackBar.open('Your data is invalid', 'I got you');
    return Observable.throw(error.statusText);
  }
}
