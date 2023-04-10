import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';

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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ArbeitszeitDetailComponent } from './arbeitszeit-detail/arbeitszeit-detail.component';
import { ArbeitszeitDataService } from './storage/arbeitszeit-data.service';
import { MatNativeDateModule } from '@angular/material/core';
import { ListMonatsuebersicht } from './uebersicht/list-monatsuebersicht';
import { MatMenuModule } from '@angular/material/menu';
import { TimeInputDirective } from './component/time-input.component';
import { MatFormFieldControl } from '@angular/material/form-field';
import { EinstellungenDetailComponent } from './einstellungen/einstellungen-detail';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { OrtDialog } from './ort/ort-dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

// import { Injectable } from '@angular/core';

import myLocaleDe from '@angular/common/locales/de';

registerLocaleData(myLocaleDe);

@NgModule({
  declarations: [
    AppComponent,
    ListArbeitszeit, ListMonatsuebersicht,
    ArbeitszeitDetailComponent,
    EinstellungenDetailComponent,
    OrtDialog, ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    //    Injectable,
    ReactiveFormsModule,

    // Material
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    TextFieldModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    TimeInputDirective
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }, ArbeitszeitDataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
