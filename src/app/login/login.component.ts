import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiService } from '../core/services/api.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginEmail: string;
  loginPassword: string;
  registerEmail: string;
  registerPassword: string;
  userName: string;
  error: boolean;
  success: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
    this.registerForm = this.fb.group({
      name: '',
      email: '',
      password: ''
    });
  }

  login(loginEmail: string, loginPassword: string): void {
    this.authService.login(loginEmail, loginPassword);
  }

  register(userName: string, registerEmail: string, registerPassword: string) {
    this.authService.register(userName, registerEmail, registerPassword);
  }
}
