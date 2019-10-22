import { TestBed } from '@angular/core/testing';

import { MockStorageService } from './mock';

import { StorageAdapterService } from './storage-adapter.service';

fdescribe('StorageAdapterService', () => {
  let storageService: StorageAdapterService;
  const validToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZ' +
    'XhwIjo5NjE4MjM5MDIyLCJpYXQiOjE1MTYyMzkwMjJ9' +
    '.I31bsuWjuaksoXEMZnkPE8OvNVcpQbzUG_bVbtRf6bk';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageAdapterService]
    });
    storageService = TestBed.get(StorageAdapterService);

    // spyOn(MockStorageService, 'getToken')
  });

  it('getToken() should return token as string', () => {
    if (sessionStorage.getItem('token')) {
      expect(storageService.getToken()).toBe(validToken);
    }
    expect(storageService.getToken()).toBe('');
  });
  it('resetToken() should delete token', () => {
    expect(sessionStorage.getItem('token')).toBeNull();
  });
  it('defineStorage() should return available storage', () => {
    if (localStorage.getItem('token')) {
      expect(localStorage.getItem('token')).toBe(localStorage);
    } else expect(storageService.defineStorage()).toBe(sessionStorage);
  });
});
