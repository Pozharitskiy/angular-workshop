import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  rememberUser: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
      rememberUser: false,
    });
    this.registerForm = this.fb.group({
      name: '',
      email: '',
      password: ''
    });

  }

  login(loginEmail: string, loginPassword: string, rememberUser: boolean): void {
    rememberUser = this.loginForm.value.rememberUser;
    this.authService.login(loginEmail, loginPassword, rememberUser);
  }

  register(userName: string, registerEmail: string, registerPassword: string) {
    this.authService.register(userName, registerEmail, registerPassword);
  }
}
