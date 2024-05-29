import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CardClosedComponent } from './pages/card-closed/card-closed.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'card-closed', component: CardClosedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
