import { Component, OnInit } from '@angular/core';
import { BoardService } from '../core/services/board.service';
import { Board } from '../core/models/board.model';
import { StorageAdapterService } from '../core/services/storage-adapter.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board: Board;
  constructor(
    private boardService: BoardService,
    private storage: StorageAdapterService
  ) {
    this.board = this.storage.checkData('currentBoard');
  }

  ngOnInit() {
    console.log(this.board.columns);
  }
}
