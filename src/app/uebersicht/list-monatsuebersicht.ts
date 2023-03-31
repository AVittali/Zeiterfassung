import { Component } from '@angular/core';
import { ArbeitszeitDataService } from '../arbeitszeit/arbeitszeit-data.service';
import { Monat } from './monat';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table'
import { Arbeitszeit } from '../arbeitszeit/arbeitszeit';

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

    var monat = new Monat();
    monat.monat = 2;
    monat.stunden = 15;
    monat.tage = 1;
    monat.jahr = 2023;
    monateMap.set(monat.monat, monat);
    monat = new Monat();
    monat.monat = 3;
    monat.stunden = 13;
    monat.tage = 1;
    monat.jahr = 2023;
    monateMap.set(monat.monat, monat);
    monat = new Monat();
    monat.monat = 4;
    monat.stunden = 3;
    monat.tage = 1;
    monat.jahr = 2023;
    monateMap.set(monat.monat, monat);
    monat = new Monat();
    monat.monat = 5;
    monat.stunden = 23;
    monat.tage = 1;
    monat.jahr = 2023;
    monateMap.set(monat.monat, monat);
    monat = new Monat();
    monat.monat = 6;
    monat.stunden = 12;
    monat.tage = 1;
    monat.jahr = 2023;
    monateMap.set(monat.monat, monat);
    monat = new Monat();
    monat.monat = 7;
    monat.stunden = 13;
    monat.tage = 1;
    monat.jahr = 2023;
    monateMap.set(monat.monat, monat);
    monat = new Monat();
    monat.monat = 8;
    monat.stunden = 14;
    monat.tage = 1;
    monat.jahr = 2023;
    monateMap.set(monat.monat, monat);

    console.log({ monate: monateMap.values() });
    return Array.from(monateMap.values());

  }

  navigateTo(row: any) {
    // this.router.navigate(['/detail/' + row.id]);
  }
}