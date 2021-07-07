import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Task } from '../core/models/task.model';
import { TaskService } from '../core/services/task.service';
import { BoardService } from '../core/services/board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  taskForm: FormGroup;
  boardId: string = '';
  task: Task;
  taskId: string;
  columnId: string;
  newComment: string;

  constructor(
    private taskService: TaskService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private boardService: BoardService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(path => {
      this.taskId = path.taskId;
      this.columnId = path.columnId;
      this.boardId = path.id;
    });

    this.getTask();

    this.taskForm = this.fb.group({
      task: [''],
      comments: [''],
      users: [''],
      updatedAt: [''],
      title: ['']
    });
  }

  getTask(): void {
    this.taskService
      .getTask(this.taskId, this.columnId, this.boardId)
      .subscribe(data => {
        this.task = data;
      });
  }

  createComment(text: string) {
    this.apiService.addComment(
      this.taskId,
      localStorage.getItem('user name'),
      localStorage.getItem('user email'),
      text
    );
    this.taskForm.reset();
    this.getTask();
  }

  deleteComment(id: string) {
    this.apiService.delete(id, 'comments', this.taskId).subscribe(data => data);
    this.getTask();
  }
}
