import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { Task } from '../core/models/task.model';
import { TaskService } from '../core/services/task.service';

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
    localStorage.getItem('currentTask')
  );
  constructor(private taskService: TaskService, private fb: FormBuilder) {}

  ngOnInit() {
    this.taskService
      .getTask(this.taskId.value, localStorage.getItem('columnId'))
      .subscribe();

    this.taskForm = this.fb.group({
      task: [''],
      comments: [''],
      users: [''],
      updatedAt: ['']
    });
  }
  drawTask() {}
}
