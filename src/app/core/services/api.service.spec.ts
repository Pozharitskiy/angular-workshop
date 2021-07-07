import { TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { MatSnackBarModule } from '@angular/material';

import { APIUrl } from './constants';
import { ApiService } from './api.service';
import { SharedModule } from 'src/app/shared/shared.module';

fdescribe('ApiService', () => {
  let injector: TestBed;
  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
      providers: [ApiService]
    });
    injector = getTestBed();
    apiService = TestBed.get(ApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getUsers', () => {
    it('should return an Observable<User[]>', () => {
      const dummyUsers = [
        {
          createdAt: '2019-10-22T17:46:02.057Z',
          email: 'johnDoe@gmail.com',
          name: 'Dan',
          updatedAt: '2019-10-22T17:46:02.057Z',
          _id: '5daf405a8aa9c830a9897d19',
          password: '1234'
        },
        {
          createdAt: '2019-10-22T17:46:02.057Z',
          email: 'doeJohn@gmail.com',
          name: 'Den',
          updatedAt: '2019-10-22T17:46:02.057Z',
          _id: '5daf405a8aa9c830a9897d19',
          password: '1234'
        }
      ];

      apiService.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
      });

      const req = httpMock.expectOne(`${APIUrl}/users`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);
    });
  });

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
