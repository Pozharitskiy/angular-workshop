import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { StorageAdapterService } from './storage-adapter.service';
import { ApiService } from '../services/api.service';
export interface dataToken {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorizedUser: boolean;
  isAuthorizedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private apiService: ApiService,
    private router: Router,
    private storageService: StorageAdapterService
  ) {}

  isAuthorized(): Observable<boolean> {
    return this.isAuthorizedSubject.asObservable();
  }

  async login(email: string, password: string, rememberUserCheck: boolean) {
    await this.apiService
      .postWithoutToken<dataToken>('auth/signin', {
        email,
        password
      })
      .then(data => {
        this.apiService.token$.next(data.token);
        if (rememberUserCheck) {
          this.storageService.setToken(data.token, localStorage);
        }
      });

    this.apiService.getUser(email).subscribe(data => {
      const userName = data + '';
      const userEmail = email + '';
      localStorage.setItem('user name', userName);
      localStorage.setItem('user email', userEmail);
    });

    this.isAuthorizedSubject.next(true);
    this.router.navigate(['dashboard']);
  }
  register(email: string, password: string, name: string) {
    this.apiService.postWithoutToken('auth/signup', {
      email,
      password,
      name
    });
    this.isAuthorizedSubject.next(true);
    this.router.navigate(['dashboard']);
  }
}
