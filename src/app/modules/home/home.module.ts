import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeDetailComponent } from './pages/home-detail.component';
import { HomeComponent } from './pages/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeDetailComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
