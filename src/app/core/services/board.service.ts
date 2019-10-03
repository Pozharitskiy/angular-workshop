import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { APIUrl } from './constants';
import { StorageAdapterService } from './storage-adapter.service';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private http: HttpClient, private apiService: ApiService) {}
  getBoard(id: string) {
    return this.http.get<any>(`${APIUrl}/boards/${id}`).pipe(
      map(({ data }) => data),
      catchError(this.handleError)
    );
  }

  getAllBoards() {
    const boards = this.apiService.get('boards');
    console.log(boards);
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return Observable.throw(error.statusText);
  }
}
