import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './component/detail/detail.component';
import { ListComponent } from './component/list/list.component';


const routes: Routes = [
  { path: 'add', component: DetailComponent},
  { path: 'edit/:id', component: DetailComponent},
  { path: 'list', component: ListComponent },
  { path: '**', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
