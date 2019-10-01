import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PasswordPipe } from './pipes/password.pipe';

@NgModule({
  declarations: [PasswordPipe],
  exports: [FormsModule, PasswordPipe, HttpClientModule]
})
export class SharedModule {}
