import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIUrl } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(email: string, password: string, name: string): Promise<any> {
    return this.http
      .post(`${APIUrl}auth/signup`, {
        email,
        password,
        name
      })
      .toPromise();
  }

  login(email: string, password: string): Promise<any> {
    return this.http
      .post(`${APIUrl}auth/signin`, {
        email,
        password
      })
      .toPromise();
  }
}
