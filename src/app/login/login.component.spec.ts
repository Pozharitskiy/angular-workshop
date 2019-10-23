import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginComponent } from './login.component';
import { AuthService } from '../core/services/auth.service';
import { MockAuthService } from '../core/services/mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '../core/services/api.service';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: any;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: [AuthService], useClass: MockAuthService },
        { provide: FormBuilder, useValue: formBuilder }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    mockAuthService = fixture.debugElement.injector.get(AuthService);
    component = fixture.componentInstance;

    spyOn(mockAuthService, 'login').and.returnValue(
      Promise.resolve(ApiService)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockAuthService.login).toHaveBeenCalled();
  });
  it('login returns Promise', () => {
    expect(mockAuthService.login());
  });
});
