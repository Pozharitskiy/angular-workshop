import { NgModule } from '@angular/core';

import { TaskComponent } from './task.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TaskComponent],
  exports: [TaskComponent],
  imports: [SharedModule]
})
export class LoginModule {}
