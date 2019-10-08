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
  public board: Board;

  id: string = '';
  constructor(private apiService: ApiService, private router: Router) {}

  handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

  openBoard(id: string): void {
    this.apiService.getBoard(this.id).subscribe(data => {
      console.log(data);
      this.board = data.data;
      localStorage.setItem('currentBoard', id);
      this.router.navigate([`board/${id}`]);
    });
  }

  backHome(): void {
    this.router.navigate(['dashboard']);
  }
}
