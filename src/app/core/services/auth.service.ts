import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { StorageAdapterService } from './storage-adapter.service';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorizedUser: boolean;
  private isAuthorizedSubject = new BehaviorSubject<boolean>(undefined);

  constructor(
    private apiService: ApiService,
    private router: Router,
    private storageService: StorageAdapterService
  ) {
    !!localStorage.getItem('token')
      ? (this.isAuthorizedUser = true)
      : (this.isAuthorizedUser = !!sessionStorage.getItem('token'));

    this.isAuthorizedSubject.next(this.isAuthorizedUser);
  }

  isAuthorized(): Observable<boolean> {
    return this.isAuthorizedSubject.asObservable();
  }

  async login(email: string, password: string, rememberUserCheck: boolean) {
    const token = this.storageService.getToken();
    if (rememberUserCheck) {
      this.storageService.setToken(token, localStorage);
    }
    this.storageService.setToken(token, sessionStorage);

    await this.apiService.postWithoutToken('auth/signin', {
      email,
      password
    });

    this.isAuthorizedSubject.next(true);

    await this.apiService.getUser(email).subscribe(data => {
      const userName = data + '';
      localStorage.setItem('user name', userName);
    });

    this.router.navigate(['dashboard']);
  }
  async register(email: string, password: string, name: string) {
    await this.apiService.postWithoutToken('auth/signup', {
      email,
      password,
      name
    });
    localStorage.setItem('userName', name);
    this.isAuthorizedSubject.next(true);
    this.router.navigate(['dashboard']);
  }
}
