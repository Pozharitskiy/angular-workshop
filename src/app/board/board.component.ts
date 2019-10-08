import { Component, OnInit } from '@angular/core';
import { BoardService } from '../core/services/board.service';
import { Board } from '../core/models/board.model';

import { ApiService } from '../core/services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board: Board;
  boardId: string;
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

  updateColumnTitle(id: string, title: string): void {
    this.apiService.update(id, title, 'columns');
    this.getBoard();
  }

  updateTask(id: string, title: string): void {
    this.apiService.update(id, title, 'tasks');
    this.getBoard();
  }

  deleteColumn(id: string): void {
    this.apiService.delete(id, 'column').subscribe(data => {
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

  getBoard(): void {
    this.apiService.getBoard(this.boardId).subscribe(data => {
      this.board = data;
    });
  }
}
