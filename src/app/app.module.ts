import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ArbeitszeitDetailComponent } from './arbeitszeit-detail/arbeitszeit-detail.component';
import { ArbeitszeitDataService } from './arbeitszeit/arbeitszeit-data.service';
import { MatNativeDateModule } from '@angular/material/core';
import { ListMonatsuebersicht } from './uebersicht/list-monatsuebersicht';
import { MatMenuModule } from '@angular/material/menu';
import { TimeInputDirective } from './component/time-input.component';
import { MatFormFieldControl } from '@angular/material/form-field';


// import { Injectable } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent, ListArbeitszeit, ArbeitszeitDetailComponent, ListMonatsuebersicht, TimeInputDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    //    Injectable,
    ReactiveFormsModule,
    FormsModule,

    // Material
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatMenuModule,
    TextFieldModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }, ArbeitszeitDataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
