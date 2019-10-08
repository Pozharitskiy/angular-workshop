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
import { Response } from '../models/response.model';
import { StorageAdapterService } from './storage-adapter.service';
import { Board } from '../models/board.model';

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
    const token = this.storageService.defineStorage().getItem('token') || '';
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

  deleteBoard(id: string): Observable<Board> {
    return this.http
      .delete<Response>(`${APIUrl}/boards/${id}`, this.options)
      .pipe(map(res => res.data.board as Board)); //!!!
  }

  deleteTask(id: string): Observable<Board> {
    return this.http
      .delete<Response>(`${APIUrl}/tasks/${id}`, this.options)
      .pipe(map(res => res.data.board as Board)); //!!!
  }

  getBoards(path: string): Observable<Board[]> {
    return this.http
      .get<Response>(`${APIUrl}/${path}`, this.options)
      .pipe(map(res => res.data.boards as Board[])); //!!!
  }

  getBoard(id: string): Observable<Board> {
    return this.http
      .get<Response>(`${APIUrl}/boards/${id}`, this.options)
      .pipe(map(res => res.data as Board)); //!!!
  }

  addBoard(title: string): void {
    this.http
      .post<Response>(`${APIUrl}/boards/`, { title }, this.options)
      .pipe(map(res => res.data as Board))
      .toPromise();
  }

  updateBoard(id: string, title: string) {
    this.http;
    return this.http
      .put<Response>(`${APIUrl}/boards/${id}`, { title }, this.options)
      .pipe(map(res => res.data.board as Board))
      .toPromise();
  }

  handleError(error: HttpErrorResponse) {
    this.isError = true;

    this.snackBar.open('Your data is invalid', 'I got you');
    return Observable.throw(error.statusText);
  }
}
