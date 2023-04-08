import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListArbeitszeit } from './arbeitszeit/list-arbeitszeit';
import { ArbeitszeitDetailComponent } from './arbeitszeit-detail/arbeitszeit-detail.component';
import { ListMonatsuebersicht } from './uebersicht/list-monatsuebersicht';
import { Einstellungen } from './einstellungen/einstellungen';

const routes: Routes = [
  { path: '', redirectTo: '/arbeitszeit', pathMatch: 'full' },
  { path: 'arbeitszeit', component: ListArbeitszeit },
  { path: 'detail/:id', component: ArbeitszeitDetailComponent },
  { path: 'uebersicht', component: ListMonatsuebersicht },
  { path: 'einstellungen', component: Einstellungen }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
