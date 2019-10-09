import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';

import { SharedModule } from '../shared/shared.module';
import { TaskComponent } from '../task/task.component';

@NgModule({
  declarations: [BoardComponent, TaskComponent],
  exports: [BoardComponent],
  imports: [SharedModule, BoardRoutingModule, ReactiveFormsModule, CommonModule]
})
export class BoardModule {}
