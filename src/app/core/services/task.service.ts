import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from '../models/task.model';
import { Subject, Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { BoardService } from './board.service';

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
      filter(({ _id }) => _id == columnId),
      tap(data => console.log('data', data))
    );
  }
}
