import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    SharedModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class LoginModule {}
