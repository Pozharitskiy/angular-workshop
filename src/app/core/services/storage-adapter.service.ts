import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageAdapterService {
  constructor() {}

  getToken(): string {
    const token = sessionStorage.getItem('token') || '';
    return token;
  }

  setToken(token: string, storage): void {
    storage.setItem('token', token);
  }

  resetToken(that: any, storage: any): void {
    that.options.headers.delete('authorization');
    storage.removeItem('token');
  }
}
