import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, Time } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'

import { Arbeitszeit } from '../arbeitszeit/arbeitszeit';
import { ArbeitszeitDataService } from '../arbeitszeit/arbeitszeit-data.service';
import { MatFormField } from '@angular/material/form-field';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-arbeitszeit-detail',
  templateUrl: './arbeitszeit-detail.component.html',
  styleUrls: ['./arbeitszeit-detail.component.css']
})

export class ArbeitszeitDetailComponent implements OnInit {
  arbeitszeit!: Arbeitszeit;
  filterForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private arbeitszeitService: ArbeitszeitDataService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getArbeitszeit();

    this.filterForm = this.formBuilder.group({
      datum: new FormControl(['', [Validators.required]])
    })

  }

  getArbeitszeit(): void {

    console.log(this.route.snapshot.paramMap.get('id'));

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.arbeitszeit = { ...this.arbeitszeitService.getArbeitszeit(id) ?? new Arbeitszeit() };
    // this.arbeitszeit = this.arbeitszeitService.getArbeitszeit(id) ?? new Arbeitszeit();

    console.log("Arbeitszeit mit ID " + this.arbeitszeit?.id + " einglesen");
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {

    if (this.filterForm.invalid) {
      console.log({ filterForm: this.filterForm });
      console.log({ "Keine gültige Daten": this.arbeitszeit });
      return;
    }

    // Leider funktioniert die obere Abfrage nicht, daher hier zur Sicherheit
    if (this.arbeitszeit.datum === null) {
      console.log({ "Ungültiges Datum, sollte eigentlich schon vorher abgefangen sein": this.arbeitszeit });
      return;
    }

    // TODO Ausprogrammieren
    /*
    if (this.arbeitszeit) {
      this.arbeitszeitService.updateArbeitszeit(this.arbeitszeit)
        .subscribe(() => this.goBack());
    }
    */

    // Aktualisieren der Daten
    if (this.arbeitszeit) {
      this.arbeitszeitService.updateArbeitszeit(this.arbeitszeit);
    }

    // Auf Tabelle zurück
    this.goBack();

  }
}
