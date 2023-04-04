import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate, Location, Time } from '@angular/common';
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
  detailsForm = this.formBuilder.group({
    datum: [new Date(), Validators.required],
    von: ['', Validators.required],
    bis: ['', Validators.required],
    pause: [0]
  });

  constructor(
    private route: ActivatedRoute,
    private arbeitszeitService: ArbeitszeitDataService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getArbeitszeit();
    console.log({ init: this.detailsForm.get("von")?.value });

    this.detailsForm.patchValue({
      datum: this.arbeitszeit.datum,
      von: this.arbeitszeit.von ? this.arbeitszeit.von : "",
      bis: this.arbeitszeit.bis ? this.arbeitszeit.bis : "",
      pause: this.arbeitszeit.pause,
    });
  }

  private getArbeitszeit(): void {

    var id = this.route.snapshot.paramMap.get("id");
    console.log({ id: id });

    if (id == null) {
      this.arbeitszeit = new Arbeitszeit();
      return;
    }

    // Durch die Verwendung von ReactiveForm ist dies nicht mehr notwendig.
    // this.arbeitszeit = { ...this.arbeitszeitService.getArbeitszeit(id) ?? new Arbeitszeit() };
    this.arbeitszeit = this.arbeitszeitService.getArbeitszeit(id);

    console.log("Arbeitszeit mit ID " + this.arbeitszeit?.id + " einglesen");
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {

    if (!this.detailsForm.valid) {
      console.log({ filterForm: this.detailsForm });
      console.log({ "Keine gültige Daten": this.arbeitszeit });
      // TODO Eingentlich muss hier abgebrochen werden.
      // return;
    }

    console.log({ datum: this.detailsForm.get("datum")?.value });
    console.log({ von: this.detailsForm.get("von")?.value }); // ""
    console.log({ bis: this.detailsForm.get("bis")?.value }); // ""
    console.log({ pause: this.detailsForm.get("pause")?.value }); // Korrekter Wert
    if (this.detailsForm.get("datum")?.value === null) {
      return;
    }

    // TODO Keine Ahnung was hier tue
    console.log({ values: this.detailsForm.value });

    const { datum, von, bis, pause } = this.detailsForm.value;
    if (datum == null || von == null || bis == null || pause == null) {
      return;
    }

    this.arbeitszeit.datum = datum;
    this.arbeitszeit.von = von;
    this.arbeitszeit.bis = bis;
    this.arbeitszeit.pause = pause;
    console.log({ arbeitszeit: this.arbeitszeit });

    // Leider funktioniert die obere Abfrage nicht, daher hier zur Sicherheit
    if (this.arbeitszeit.datum === null) {
      console.log({ "Ungültiges Datum, sollte eigentlich schon vorher abgefangen sein": this.arbeitszeit });
      return;
    }

    // Aktualisieren der Daten
    if (this.arbeitszeit) {
      this.arbeitszeitService.updateArbeitszeit(this.arbeitszeit);
    }

    // Auf Tabelle zurück
    // this.goBack();

  }

}
