import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, merge, BehaviorSubject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { APIUrl } from './constants';
import { Response } from '../models/response.model';
import { StorageAdapterService } from './storage-adapter.service';
import { Board } from '../models/board.model';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private options: {
    headers: HttpHeaders;
  };
  isError: boolean = false;
  token$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(
    private http: HttpClient,
    private storageService: StorageAdapterService,
    private snackBar: MatSnackBar
  ) {
    this.token$.subscribe(data => {
      this.options = {
        headers: new HttpHeaders({
          authorization: data
        })
      };
    });
    this.token$.next(
      this.storageService.defineStorage().getItem('token') || ''
    );
  }

  postWithoutToken<T>(path: string, body: any) {
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
          debugger;
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

  delete(id: string, type: string): Observable<Board> {
    return this.http
      .delete<Response>(`${APIUrl}/${type}/${id}`, this.options)
      .pipe(map(res => res.data.board as Board));
  }

  deleteComment(id: string, taskId: string): Observable<Task> {
    return this.http.delete<Response>(`${APIUrl}/comments/${id}`, {
      ...this.options,
      body: { taskId: taskId }
    });
  }

  getUser(email: string): Observable<User> {
    return this.http
      .get<Response>(`${APIUrl}/users/?email=${email}`, this.options)
      .pipe(map(res => res.data.user.name as User));
  }

  getBoards(path: string): Observable<Board[]> {
    return this.http
      .get<Response>(`${APIUrl}/${path}`, this.options)
      .pipe(map(res => res.data.boards as Board[]));
  }

  getBoard(id: string): Observable<Board> {
    return this.http
      .get<Response>(`${APIUrl}/boards/${id}`, this.options)
      .pipe(map(res => res.data as Board));
  }

  add(title: string, type: string): void {
    this.http
      .post<Response>(`${APIUrl}/${type}`, { title }, this.options)
      .pipe(map(res => res.data as Board))
      .toPromise();
  }
  addTask(id: string, title: string, type: string): void {
    this.http
      .post<Response>(`${APIUrl}/${type}/${id}`, { task: title }, this.options)
      .pipe(map(res => res.data as Board))
      .toPromise();
  }

  addComment(id: string, comment: string, email: string, name: string) {
    this.http
      .post<Response>(
        `${APIUrl}/${'comments'}/${id}`,
        { comment: comment, email: email, name: name },
        this.options
      )
      .pipe(map(res => res.data as Board))
      .toPromise();
  }

  update(id: string, title: string, type: string) {
    this.http;
    return this.http
      .put<Response>(`${APIUrl}/${type}/${id}`, { title }, this.options)
      .pipe(map(res => res.data.board as Board))
      .toPromise();
  }

  updateTask(id: string, title: string, type: string) {
    this.http;
    return this.http
      .put<Response>(`${APIUrl}/${type}/${id}`, { task: title }, this.options)
      .pipe(map(res => res.data.board as Board))
      .toPromise();
  }

  handleError(error: HttpErrorResponse) {
    this.isError = true;

    this.snackBar.open('Your data is invalid', 'I got you');
    return Observable.throw(error.statusText);
  }
}
