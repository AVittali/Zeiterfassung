import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListArbeitszeit } from './arbeitszeit/list-arbeitszeit';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table'
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent, ListArbeitszeit
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Material
    MatButtonModule,
    MatListModule, 
    MatTableModule,
    MatTabsModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
