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
    this.getBoards();
  }

  openBoard(id: string): void {
    this.boardService.openBoard(id);
  }

  deleteBoard(id: string): void {
    this.apiService.deleteBoard(id).subscribe(data => {
      this.getBoards();
    });
  }

  getBoards(): void {
    this.apiService.getBoards('boards').subscribe(data => {
      this.boards = data.data.boards;
    });
  }
}
