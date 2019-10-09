import { Component, OnInit } from '@angular/core';
import { BoardService } from '../core/services/board.service';
import { Board } from '../core/models/board.model';

import { ApiService } from '../core/services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  taskModal: TaskComponent;
  isTaskOpened: boolean = false;
  board: Board;
  boardId: string;
  createTaskForm: FormGroup;
  taskTitleForm: FormGroup;
  columnTitleForm: FormGroup;
  isInputDisabled: boolean = true;

  constructor(
    private boardService: BoardService,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.boardId = localStorage.getItem('currentBoard');
    this.board = {
      _id: '',
      title: '',
      users: [],
      columns: ''
    };
  }

  ngOnInit() {
    this.apiService.getBoard(this.boardId).subscribe(data => {
      this.board = data;
    });
    this.createTaskForm = this.fb.group({
      title: { value: '' }
    });
    this.columnTitleForm = this.fb.group({
      title: { value: '' }
    });
    this.taskTitleForm = this.fb.group({
      title: { value: '' }
    });
  }

  backHome(): void {
    this.boardService.backHome();
  }

  createTask(id: string, title: string): void {
    this.apiService.addTask(id, title, 'tasks');
    this.getBoard();
  }

  updateColumnTitle(id: string, title: string): void {
    this.apiService.update(id, title, 'columns');
    this.getBoard();
  }

  updateTask(id: string, title: string): void {
    this.apiService.updateTask(id, title, 'tasks');
    this.getBoard();
  }

  deleteColumn(id: string): void {
    this.apiService.delete(id, 'columns').subscribe(data => {
      this.board = data;
    });
    this.getBoard();
  }

  deleteTask(id: string): void {
    this.apiService.delete(id, 'tasks').subscribe(data => {
      this.board = data;
    });
    this.getBoard();
  }

  openTask(id: string): void {
    this.boardService.taskId = id;
    this.isTaskOpened = !this.isTaskOpened;
  }

  getBoard(): void {
    this.apiService.getBoard(this.boardId).subscribe(data => {
      console.log(data);
      this.board = data;
    });
  }
}
