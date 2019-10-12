import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { BehaviorSubject, Subject } from 'rxjs';

import { Task } from '../core/models/task.model';
import { TaskService } from '../core/services/task.service';
import { BoardService } from '../core/services/board.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  taskForm: FormGroup;
  boardId: string = '';
  task: Task;

  private taskId: BehaviorSubject<string> = new BehaviorSubject(
    this.boardService.taskId
  );
  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private boardService: BoardService
  ) {}

  ngOnInit() {
    this.taskService
      .getTask(this.taskId.value, this.boardService.columnId)
      .subscribe(data => {
        this.task = data[0];
        console.log(this.task);
      });

    this.taskForm = this.fb.group({
      task: [''],
      comments: [''],
      users: [''],
      updatedAt: ['']
    });
  }
  drawTask() {}
}
