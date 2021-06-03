import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from '@shared/layout/base/base.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule) },
      { path: '', loadChildren: () => import('@modules/user/user.module').then(m => m.UserModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
