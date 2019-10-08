import { Component, OnInit } from '@angular/core';
import { BoardService } from '../core/services/board.service';
import { Board } from '../core/models/board.model';

import { StorageAdapterService } from '../core/services/storage-adapter.service';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board: Board;
  boardId: string;
  constructor(
    private boardService: BoardService,
    private storage: StorageAdapterService,
    private apiService: ApiService
  ) {
    this.boardId = this.storage.checkData('currentBoard', localStorage);
    this.board = {
      _id: '',
      title: '',
      users: '',
      columns: ''
    };
  }

  ngOnInit() {
    this.apiService.getBoard(this.boardId).subscribe(data => {
      this.board = data.data;
    });
  }
  backHome(): void {
    this.boardService.backHome();
  }

  deleteTask(id: string): void {
    this.apiService.deleteTask(id);
    this.getBoard(this.boardId);
  }

  getBoard(id: string): void {
    this.apiService.getBoard(id).subscribe(data => {
      this.board = data.data.board;
    });
  }
}
