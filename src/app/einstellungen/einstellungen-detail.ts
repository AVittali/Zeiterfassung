import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate, Location, Time } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'

import { Arbeitszeit } from '../arbeitszeit/arbeitszeit';
import { ArbeitszeitDataService } from '../storage/arbeitszeit-data.service';
import { MatFormField } from '@angular/material/form-field';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrtDataService } from '../storage/ort-data.service';
import { EinstellungDataService } from '../storage/einstellungen-data.service';
import { Einstellung } from './einstellung';

@Component({
  selector: 'einstellungen-detail',
  templateUrl: './einstellungen-detail.html',
  styleUrls: ['./einstellungen-detail.scss']
})

export class EinstellungenDetailComponent implements OnInit {

  einstellung: Einstellung = this.einstellungDataService.getEinstellung();

  detailsForm = this.formBuilder.group({
    stundenlohn: [0, Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private einstellungDataService: EinstellungDataService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.detailsForm.patchValue({
      stundenlohn: this.einstellung.stundenlohn
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {

    if (!this.detailsForm.valid) {
      console.log({ filterForm: this.detailsForm });
      return;
    }

    const { stundenlohn } = this.detailsForm.value;
    if (stundenlohn == null) {
      return;
    }

    // Werte übertragen
    this.einstellung.stundenlohn = stundenlohn;

    // Aktualisieren der Daten
    if (this.einstellung) {
      this.einstellungDataService.save(this.einstellung);
    }

    // Zurück zur vorherigen Seite
    this.goBack();

  }

}
