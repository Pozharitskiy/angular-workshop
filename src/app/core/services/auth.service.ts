import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';
import { User } from '../../core/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  private isAuthorizedSubject = new BehaviorSubject<boolean>(undefined);

  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {
    const isAuthorized = !!localStorage.getItem('token');
    this.isAuthorizedSubject.next(isAuthorized);
  }

  isAuthorized(): Observable<boolean> {
    return this.isAuthorizedSubject.asObservable();
  }

  async login(email: string, password: string, rememberUserCheck: boolean): Promise<any> {
    const { user } = await this.apiService.postWithoutToken('auth/signin', {
      email,
      password
    });
    this.isAuthorizedSubject.next(true);
    if (!rememberUserCheck) {

      this.apiService.resetToken();
    }
    this.router.navigate(['dashboard']);
    return (this.user = user);
  }
  async register(email: string, password: string, name: string): Promise<any> {
    const { user } = await this.apiService.postWithoutToken('auth/signup', {
      email,
      password,
      name
    });
    this.isAuthorizedSubject.next(true);
    this.router.navigate(['dashboard']);
    this.apiService.resetToken();
    return (this.user = user);
  }
}
