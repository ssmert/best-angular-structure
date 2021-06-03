import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDetailComponent } from './pages/home-detail.component';
import { HomeComponent } from './pages/home.component';

const routes: Routes = [
  {
    path: 'home',
    data: { title: 'HOME' },
    children: [
      { path: '', component: HomeComponent },
      { path: 'detail', component: HomeDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
