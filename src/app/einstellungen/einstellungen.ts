import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate, Location, Time } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'

import { Arbeitszeit } from '../arbeitszeit/arbeitszeit';
import { ArbeitszeitDataService } from '../storage/arbeitszeit-data.service';
import { MatFormField } from '@angular/material/form-field';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrtDataService } from '../storage/ort-data.service';

@Component({
  selector: 'einstellungen',
  templateUrl: './einstellungen.html'
  // styleUrls: ['./einstellungen.css']
})

export class Einstellungen implements OnInit {

  // detailsForm = this.formBuilder.group({
  //   datum: [new Date(), Validators.required],
  //   von: [0, Validators.required],
  //   bis: [0, Validators.required],
  //   pause: [0]
  // });

  constructor(
    private route: ActivatedRoute,
    private ortDataService: OrtDataService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    // this.detailsForm.patchValue({
    //   datum: this.arbeitszeit.datum,
    //   von: this.arbeitszeit.von ? this.arbeitszeit.von : 0,
    //   bis: this.arbeitszeit.bis ? this.arbeitszeit.bis : 0,
    //   pause: this.arbeitszeit.pause,
    // });
  }

  // private getArbeitszeit(): void {

  //   var id = this.route.snapshot.paramMap.get("id");
  //   console.log({ id: id });

  //   if (id == null) {
  //     this.arbeitszeit = new Arbeitszeit();
  //     return;
  //   }

  //   // Durch die Verwendung von ReactiveForm ist dies nicht mehr notwendig.
  //   // this.arbeitszeit = { ...this.arbeitszeitService.getArbeitszeit(id) ?? new Arbeitszeit() };
  //   this.arbeitszeit = this.arbeitszeitService.getArbeitszeit(id);

  //   console.log({"Arbeitszeit eingelesen" : this.arbeitszeit});
  // }

  addOrt(): void {

  }

  goBack(): void {
    this.location.back();
  }

  save(): void {

    // if (!this.detailsForm.valid) {
    //   console.log({ filterForm: this.detailsForm });
    //   console.log({ "Keine gültige Daten": this.arbeitszeit });
    //   // TODO Eingentlich muss hier abgebrochen werden.
    //   // return;
    // }

    // const { datum, von, bis, pause } = this.detailsForm.value;
    // // const von = this.detailsForm.controls.von.zeitvalue;
    // // const bis = this.detailsForm.controls.bis.value;
    // if (datum == null || von == null || bis == null || pause == null) {
    //   return;
    // }

    // console.log({ datum: datum });
    // console.log({ von: von });
    // console.log({ bis: bis });
    // console.log({ pause: pause });
    // console.log({form: this.detailsForm});   

    // this.arbeitszeit.datum = datum;
    // this.arbeitszeit.von = von;
    // this.arbeitszeit.bis = bis;
    // this.arbeitszeit.pause = pause;
    // console.log({ arbeitszeit: this.arbeitszeit });

    // // Leider funktioniert die obere Abfrage nicht, daher hier zur Sicherheit
    // if (this.arbeitszeit.datum === null) {
    //   console.log({ "Ungültiges Datum, sollte eigentlich schon vorher abgefangen sein": this.arbeitszeit });
    //   return;
    // }

    // // Aktualisieren der Daten
    // if (this.arbeitszeit) {
    //   this.arbeitszeitService.updateArbeitszeit(this.arbeitszeit);
    // }

    // Auf Tabelle zurück
    this.goBack();

  }

}
