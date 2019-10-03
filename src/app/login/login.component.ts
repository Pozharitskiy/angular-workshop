import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

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
  }

  register(userName: string, registerEmail: string, registerPassword: string) {
    this.authService.register(userName, registerEmail, registerPassword);
  }

  getErrorMessage(controlName: string) {
    if (this.loginForm.controls[controlName].hasError('minlength')) {
      return 'Must be at least 2 characters';
    }
    return 'Type your pass here';
  }
}
