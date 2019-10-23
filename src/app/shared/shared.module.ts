import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PasswordPipe } from './pipes/password.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { MaterialModule } from './models/matrerial.models';

@NgModule({
  declarations: [PasswordPipe, SearchPipe],
  exports: [FormsModule, PasswordPipe, MaterialModule]
})
export class SharedModule {}
