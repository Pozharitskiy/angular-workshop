import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { BoardService } from '../core/services/board.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  taskId: string = '';
  constructor(
    private apiService: ApiService,
    private boardService: BoardService
  ) {}

  ngOnInit() {
    this.taskId = this.boardService.taskId;
    this.apiService.getTask(this.taskId);
  }
}
