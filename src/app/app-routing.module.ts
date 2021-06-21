import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@modules/common/pages/login/login.component';
import { MainComponent } from '@modules/common/pages/main/main.component';
import { BaseLayoutComponent } from '@shared/layouts/base-layout/base-layout.component';
import { PageLayoutComponent } from '@shared/layouts/page-layout/page-layout.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', loadChildren: () => import('@modules/user/user.module').then(m => m.UserModule) },
    ],
  },
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      { path: 'main', component: MainComponent },
      { path: '', loadChildren: () => import('@modules/board/board.module').then(m => m.BoardModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
