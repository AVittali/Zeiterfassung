import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate, Location, Time } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'

import { Arbeitszeit } from '../arbeitszeit/arbeitszeit';
import { ArbeitszeitDataService } from '../storage/arbeitszeit-data.service';
import { MatFormField } from '@angular/material/form-field';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, ValidationErrors, Validator, Validators } from '@angular/forms';
import { OrtDataService } from '../storage/ort-data.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrtDialog } from '../ort/ort-dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EinstellungDataService } from '../storage/einstellungen-data.service';

@Component({
  selector: 'app-arbeitszeit-detail',
  templateUrl: './arbeitszeit-detail.component.html',
  styleUrls: ['./arbeitszeit-detail.component.scss']
})

export class ArbeitszeitDetailComponent implements OnInit {
  arbeitszeit!: Arbeitszeit;
  orte: string[] = this.ortDataService.getOrte();
  detailsForm = this.formBuilder.group({
    datum: [new Date(), Validators.required],
    von: [0, Validators.required],
    bis: [0, Validators.required],
    pause: [0],
    ort: [''],
    stundenlohn: [0, Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private arbeitszeitService: ArbeitszeitDataService,
    private ortDataService: OrtDataService,
    private einstellungDataService: EinstellungDataService,
    private location: Location,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    // this.detailsForm.controls.von.valueChanges.subscribe(() => {
    //   var { von, bis } = this.detailsForm.value;
    //   if (von != null && bis != null && von > bis) {
    //     this.detailsForm.controls.bis.setErrors({ invalidRange: true });
    //   } else {
    //     this.detailsForm.controls.bis.setErrors(null);
    //   }
    // });

    // this.detailsForm.controls.bis.valueChanges.subscribe(() => {
    //   var { von, bis } = this.detailsForm.value;
    //   if (von != null && bis != null && von > bis) {
    //     this.detailsForm.controls.bis.setErrors({ invalidRange: true });
    //   } else {
    //     this.detailsForm.controls.bis.setErrors(null);
    //   }
    // });

  }

  ngOnInit(): void {
    this.getArbeitszeit();
    //console.log({ init: this.detailsForm.get("von")?.value });

    this.detailsForm.patchValue({
      datum: this.arbeitszeit.datum,
      von: this.arbeitszeit.von ? this.arbeitszeit.von : 0,
      bis: this.arbeitszeit.bis ? this.arbeitszeit.bis : 0,
      pause: this.arbeitszeit.pause,
      stundenlohn: this.arbeitszeit.lohn,
      ort: this.arbeitszeit.ort
    });
  }

  private getArbeitszeit(): void {

    var id = this.route.snapshot.paramMap.get("id");
    console.log({ id: id });

    if (id == null || id == "0") {
      this.arbeitszeit = new Arbeitszeit();
      this.arbeitszeit.lohn = this.einstellungDataService.getEinstellung().stundenlohn;
      return;
    }

    // Durch die Verwendung von ReactiveForm ist dies nicht mehr notwendig.
    // this.arbeitszeit = { ...this.arbeitszeitService.getArbeitszeit(id) ?? new Arbeitszeit() };
    this.arbeitszeit = this.arbeitszeitService.getArbeitszeit(id);

    console.log({ "Arbeitszeit eingelesen": this.arbeitszeit });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {

    console.log("Save clicked");

    if (!this.detailsForm.valid) {
      console.log({ filterForm: this.detailsForm });
      console.log({ "Keine gültige Daten": this.arbeitszeit });
      // TODO Eingentlich muss hier abgebrochen werden.
      // return;
    }

    var { datum, von, bis, pause, ort, stundenlohn } = this.detailsForm.value;
    // const von = this.detailsForm.controls.von.zeitvalue;
    // const bis = this.detailsForm.controls.bis.value;
    if (datum == null || von == null || bis == null || stundenlohn == null) {
      return;
    }

    // Von-Bis-Prüfung
    // TODO Fehlermeldung
    if (von >= bis) {
      return;
    }

    console.log({ datum: datum });
    console.log({ von: von });
    console.log({ bis: bis });
    console.log({ pause: pause });
    console.log({ form: this.detailsForm });

    this.arbeitszeit.datum = datum;
    this.arbeitszeit.von = von;
    this.arbeitszeit.bis = bis;
    this.arbeitszeit.pause = pause ? pause : 0;
    this.arbeitszeit.ort = ort ? ort : "";
    this.arbeitszeit.lohn = stundenlohn;
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
    this.goBack();

  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Hier den Löschvorgang durchführen
        if (this.arbeitszeit.id != "") {
          console.log("Löschen bestätigt");
          this.arbeitszeitService.deleteArbeitszeit(this.arbeitszeit.id);
          this.goBack();
        }
      }
    });
  }

  addOrt(): void {
    console.log("Ort hinzufügen");

    const dialogRef = this.dialog.open(OrtDialog, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      if (result != null) {
        console.log(result.value);
        if (!this.orte.includes(result.value)) {
          this.orte.push(result.value);
          this.ortDataService.save(this.orte);
        } else {
          console.log("Eintrag bereits vorhanden: " + result.value);
        }
      }
    });

  }

}
