import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { StorageAdapterService } from './storage-adapter.service';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthorizedSubject = new BehaviorSubject<boolean>(undefined);

  constructor(
    private apiService: ApiService,
    private router: Router,
    private storageService: StorageAdapterService
  ) {
    const isAuthorized = !!localStorage.getItem('token');
    this.isAuthorizedSubject.next(isAuthorized);
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

    await this.isAuthorizedSubject.next(true);

    this.router.navigate(['dashboard']);
  }
  async register(email: string, password: string, name: string) {
    await this.apiService.postWithoutToken('auth/signup', {
      email,
      password,
      name
    });

    this.isAuthorizedSubject.next(true);
    this.router.navigate(['dashboard']);
  }
}
