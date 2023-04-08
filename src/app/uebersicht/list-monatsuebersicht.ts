import { Component } from '@angular/core';
import { ArbeitszeitDataService } from '../arbeitszeit/arbeitszeit-data.service';
import { Monat } from './monat';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table'
import { Arbeitszeit } from '../arbeitszeit/arbeitszeit';
import { TimeFunctions } from '../api/time-functions';

/*
 * Übersicht der Arbeitszeiten im aktuellen Jahr
 */
@Component({
  selector: 'list-monatsuebersicht',
  templateUrl: 'list-monatsuebersicht.html'
})

export class ListMonatsuebersicht {

  // Spaltenüberschriften
  displayedColumns: string[] = ['monat', 'tage', 'stunden'];

  monate!: Monat[];

  constructor(private arbeitszeitDataService: ArbeitszeitDataService) {
    this.monate = this.createMonate();
    console.log({ Konstruktor: this.monate });
  }

  private createMonate(): Monat[] {

    console.log("Aufbau der Monate");
    const monateMap: Map<number, Monat> = new Map();

    this.arbeitszeitDataService.getArbeitszeiten().forEach(arbeitszeit => {

      // TODO: Derzeit nur das Jahr 2023 möglich
      const jahr = arbeitszeit.datum.getFullYear();
      if (jahr === 2023) {
        const monatValue: number = arbeitszeit.datum.getMonth();
        // console.log({ monat: monatValue });
        if (monatValue === 0)
          console.log({ monat0: arbeitszeit });

        var current = monateMap.get(monatValue);
        if (current == undefined) {
          current = new Monat();
          current.jahr = jahr;
          current.monat = monatValue;
          monateMap.set(current.monat, current);
        }
        current.tage = current.tage + 1;
        // TODO Das geht leider nicht
        // current.stunden = current.stunden + arbeitszeit.getNettoArbeitszeit();
        current.stunden = current.stunden + TimeFunctions.getNettoArbeitszeit(arbeitszeit.von, arbeitszeit.bis, arbeitszeit.pause);

      }

    });

    // console.log({ monate: monateMap.values() });
    return Array.from(monateMap.values());

  }

  navigateTo(row: any) {
    // this.router.navigate(['/detail/' + row.id]);
  }

  formatMonat(monatValue: number): String {
    var datum = new Date(2023, monatValue, 1);
    // console.log({ formatMonat: monatValue });
    datum.setMonth(monatValue);
    // console.log({ datum: datum });
    return datum.toLocaleString('de', { month: 'long' });
  }
}