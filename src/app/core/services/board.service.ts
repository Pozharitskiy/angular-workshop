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
import { Router } from '@angular/router';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  public board: Board;

  id: string = '';
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router
  ) {}

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return Observable.throw(error.statusText);
  }

  openBoard(id: string): void {
    this.apiService.getBoard(this.id).subscribe(data => {
      this.board = data.data;
      localStorage.setItem('currentBoard', id);
      console.log(this.board);
      this.router.navigate([`board/${id}`]);
    });
  }

  backHome(): void {
    this.router.navigate(['dashboard']);
  }


  }
}
