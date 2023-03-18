import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListArbeitszeit } from './arbeitszeit/list-arbeitszeit';
import { ListMonatsuebersicht } from './uebersicht/list-monatsuebersicht'; 

const routes: Routes = [
  { path: '', redirectTo: '/arbeitszeit', pathMatch: 'full' },
  { path: 'arbeitszeit', component: ListArbeitszeit },
  { path: 'uebersicht', component: ListMonatsuebersicht }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
