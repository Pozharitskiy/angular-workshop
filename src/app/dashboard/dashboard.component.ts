import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../core/services/board.service';
import { ApiService } from '../core/services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isModalOpened: boolean = false;
  addBoardForm: FormGroup;
  boardTitleForm: FormGroup;
  changeTitle: boolean = false;
  isInputDisabled: boolean = true;

  public boards = [];
  constructor(
    public route: ActivatedRoute,
    private boardService: BoardService,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getBoards();
    this.addBoardForm = this.fb.group({
      title: ['']
    });
    this.boardTitleForm = this.fb.group({
      title: { value: '', disabled: this.isInputDisabled }
    });
  }

  openModal(): void {
    this.isModalOpened = true;
  }

  hideModal(): void {
    this.isModalOpened = false;
  }

  openBoard(id: string): void {
    this.boardService.openBoard(id);
  }

  openInput(): void {
    this.isInputDisabled = !this.isInputDisabled;
    this.isInputDisabled
      ? this.boardTitleForm.enable()
      : this.boardTitleForm.disable();
  }

  deleteBoard(id: string): void {
    this.apiService.deleteBoard(id).subscribe(data => {
      this.getBoards();
    });
  }

  getBoards(): void {
    this.apiService.getBoards('boards').subscribe(data => {
      console.log(data);
      this.boards = data.data.boards;
    });
  }

  addBoard(title: string): void {
    this.apiService.addBoard(title);
    this.getBoards();
    this.isModalOpened = false;
  }

  updateBoard(id: string, title: string): void {
    this.apiService.updateBoard(id, title);
    this.isInputDisabled = true;
    this.getBoards();
  }
}
