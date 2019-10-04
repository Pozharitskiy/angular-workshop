import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../core/services/board.service';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public boards = [];
  constructor(
    public route: ActivatedRoute,
    private boardService: BoardService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getBoards('boards').subscribe(data => {
      this.boards = data.data.boards;
    });
  }
  openBoard(id) {
    this.boardService.openBoard(id);
  }
}
