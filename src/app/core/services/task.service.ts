import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from '../models/task.model';
import { Subject, Observable } from 'rxjs';
import { map, filter, tap, find } from 'rxjs/operators';
import { BoardService } from './board.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  task: Subject<Task> = new Subject();
  taskId: string;
  constructor(
    private apiService: ApiService,
    private boardService: BoardService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.pipe(map(path => path));
  }

  getTask(currentId: string, columnId: string, boardId: string) {
    return this.apiService.getBoard(boardId).pipe(
      map(data => data.columns),

      map(data =>
        data.find(el => {
          return el._id == columnId;
        })
      ),
      map(data => data.tasks),
      map(data =>
        data.find(el => {
          return el._id == currentId;
        })
      )
    );
  }
}
