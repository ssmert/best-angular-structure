import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardRoutingModule } from './board-routing.module';
import { BoardDetailComponent } from './pages/board-detail.component';
import { BoardComponent } from './pages/board.component';

@NgModule({
  declarations: [
    BoardComponent,
    BoardDetailComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule
  ]
})
export class BoardModule { }
