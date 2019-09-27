import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() title: string;
  loginEmail: string;
  registerEmail: string;
  loginPassword: string;
  registerPassword: string;
  userName: string;
  error: boolean;
  success: boolean;

  constructor(private authService: AuthService) {}

  async register(event: Event): Promise<void> {
    try {
      const response = await this.authService.register(
        this.registerEmail,
        this.registerPassword,
        this.userName
      );
      this.error = false;
      this.success = true;
      localStorage.setItem(response.data.user.name, response.data.token);
    } catch (error) {
      this.error = true;
    }
  }

  async login(event: Event): Promise<void> {
    try {
      const response = await this.authService.login(
        this.loginEmail,
        this.loginPassword
      );
      this.error = false;
      this.success = true;
    } catch (error) {
      this.success = false;
      this.error = true;
    }
  }

  ngOnInit() {}
}
