import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListArbeitszeit } from './arbeitszeit/list-arbeitszeit';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs';
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { ArbeitszeitDetailComponent } from './arbeitszeit-detail/arbeitszeit-detail.component';
import { ArbeitszeitDataService } from './arbeitszeit/arbeitszeit-data.service';
// import { Injectable } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent, ListArbeitszeit, ArbeitszeitDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
     FormsModule,
//    Injectable,
//     ReactiveFormsModule,

    // Material
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    TextFieldModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [ArbeitszeitDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
