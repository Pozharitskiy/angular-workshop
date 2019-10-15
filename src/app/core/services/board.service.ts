import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  boardId: string;
  columnId: string;
  id: string = '';
  taskId: string;
  board: Board;

  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.getBoard(this.id).subscribe(data => {
      this.board = data;
    });
  }

  handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

  backHome(): void {
    this.router.navigate(['dashboard']);
  }
}
