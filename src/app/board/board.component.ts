import { Component, OnInit } from '@angular/core';
import { BoardService } from '../core/services/board.service';
import { Board } from '../core/models/board.model';

import { ApiService } from '../core/services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
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
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.board = {
      _id: '',
      title: '',
      users: [],
      columns: []
    };
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(path => (this.boardId = path['id']));

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

  openTask(id: string, columnId: string): void {
    this.boardService.taskId = id;
    this.boardService.columnId = columnId;
    this.router.navigate([`task/${id}`]);
  }

  getBoard(): void {
    this.apiService.getBoard(this.boardId).subscribe(data => {
      this.board = data;
    });
  }
}
