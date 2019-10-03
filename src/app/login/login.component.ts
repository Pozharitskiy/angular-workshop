import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { AuthService } from '../core/services/auth.service';
import { ApiService } from '../core/services/api.service';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  error: boolean;
  success: boolean;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rememberUser: false
    });
    this.registerForm = this.fb.group({
      name: '',
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  login(loginEmail: string, loginPassword: string, rememberUser: boolean) {
    rememberUser = this.loginForm.value.rememberUser;
    this.authService.login(loginEmail, loginPassword, rememberUser);
    this.detectAndShowErrorSnack;
  }

  register(userName: string, registerEmail: string, registerPassword: string) {
    this.authService.register(userName, registerEmail, registerPassword);
    this.detectAndShowErrorSnack();
  }

  getErrorMessage(controlName: string) {
    if (this.loginForm.controls[controlName].hasError('minlength')) {
      return 'Must be at least 2 characters';
    }
    return 'Type your pass here';
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action);
  }

  detectAndShowErrorSnack() {
    console.log(this.apiService.isError);
    if (this.apiService.isError) {
      this.openSnackBar(
        'This user is already exist or your data is incorrect',
        'close'
      );
    }
  }
}
