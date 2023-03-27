import { Component } from '@angular/core';
import { ArbeitszeitDataService } from '../arbeitszeit/arbeitszeit-data.service';
import { Monat } from './monat';

/**
 * @title Basic list
 */
@Component({
  selector: 'list-monatsuebersicht',
  templateUrl: 'list-monatsuebersicht.html'
})

export class ListMonatsuebersicht {

  // Spaltenüberschriften
  displayedColumns: string[] = ['monat', 'stunden'];

    monate?: Monat[];

  constructor(private arbeitszeitDataService: ArbeitszeitDataService) {
    this.createMonate();
  }

  private createMonate() {

    console.log("Aufbau der Monate");
    const monateMap: Map<number, Monat> = new Map();
  
    const monat = new Monat();
    monat.monat = 2;
    monat.stunden = 15;
    monateMap.set(2, monat);
    monateMap.set(3, monat);

    this.monate = Array.from(monateMap.values());

    console.log({monate: this.monate});
    
  }
}