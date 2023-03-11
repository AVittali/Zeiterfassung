import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListArbeitszeit } from './arbeitszeit/list-arbeitszeit';

const routes: Routes = [
  { path: '', redirectTo: '/arbeitszeit', pathMatch: 'full' },
  { path: 'arbeitszeit', component: ListArbeitszeit }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
