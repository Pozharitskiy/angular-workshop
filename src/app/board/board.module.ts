import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BoardComponent],
  exports: [BoardComponent],
  imports: [SharedModule, BoardRoutingModule, ReactiveFormsModule, CommonModule]
})
export class BoardModule {}
