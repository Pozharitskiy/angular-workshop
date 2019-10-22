import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from '../core/services/auth.service';
import { ApiService } from '../core/services/api.service';
import { BoardService } from '../core/services/board.service';

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
  userName: string = 'buddy';

  public boards = [];
  constructor(
    public route: ActivatedRoute,
    private boardService: BoardService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getBoards();
    this.addBoardForm = this.fb.group({
      title: ['']
    });
    this.boardTitleForm = this.fb.group({
      title: { value: '', disabled: this.isInputDisabled }
    });
    this.userName = localStorage.getItem('user name');
  }

  openModal(): void {
    this.isModalOpened = true;
  }

  hideModal(): void {
    this.isModalOpened = false;
  }

  openInput(): void {
    this.isInputDisabled = !this.isInputDisabled;
    this.isInputDisabled
      ? this.boardTitleForm.enable()
      : this.boardTitleForm.disable();
  }

  deleteBoard(id: string): void {
    this.apiService.delete(id, 'boards').subscribe(data => {
      this.getBoards();
    });
  }

  getBoards(): void {
    this.authService.isAuthorizedSubject.subscribe(data => {
      if (data) {
        this.apiService.getBoards('boards').subscribe(data => {
          this.boards = data;
        });
      }
    });
  }

  addBoard(title: string): void {
    this.apiService.add(title, 'boards');
    this.getBoards();
    this.isModalOpened = false;
  }

  updateBoard(id: string, title: string): void {
    this.apiService.update(id, title, 'boards');
    this.isInputDisabled = true;
    this.getBoards();
  }
}
