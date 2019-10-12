import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from '../models/task.model';
import { Subject, Observable } from 'rxjs';
import { map, filter, tap, find } from 'rxjs/operators';
import { BoardService } from './board.service';
import { matSelectAnimations } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  task: Subject<Task> = new Subject();
  constructor(
    private apiService: ApiService,
    private boardService: BoardService
  ) {}

  getTask(currentId: string, columnId: string) {
    return this.apiService.getBoard(this.boardService.boardId).pipe(
      map(data => data.columns),

      map(data =>
        data.filter(el => {
          return el._id == columnId;
        })
      ),
      map(data => data[0].tasks),
      map(data =>
        data.filter(el => {
          return el._id == currentId;
        })
      )
    );
  }
}
