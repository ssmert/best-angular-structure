import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardDetailComponent } from './pages/board-detail.component';
import { BoardComponent } from './pages/board.component';

const routes: Routes = [
  {
    path: 'board',
    data: { title: 'Board' },
    children: [
      { path: '', component: BoardComponent },
      { path: 'detail', component: BoardDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
