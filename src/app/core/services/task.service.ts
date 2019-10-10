import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from '../models/task.model';
import { Subject, Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  task: Subject<Task> = new Subject();
  constructor(private apiService: ApiService) {}

  getTask(currentId: string, columnId: string) {
    return this.apiService.getBoard(localStorage.getItem('currentBoard')).pipe(
      filter(({ _id }) => _id == columnId),
      tap(data => console.log('data', data))
    );
  }
}
