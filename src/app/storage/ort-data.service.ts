import { NgFor } from '@angular/common';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Arbeitszeit } from '../arbeitszeit/arbeitszeit';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class OrtDataService {

  private key: string = "orte";

  orte: string[] = this.getOrteFromLocalStorage();

  constructor(private localStorageService: LocalStorageService) { }

  getOrte(): string[] {
    return this.orte;
  }

  save(orte: string[]) {
    console.log({ save: orte });
    this.localStorageService.setItem(this.key, orte);
    this.orte = orte;
  }

  private getOrteFromLocalStorage(): string[] {

    console.log("Lese Orte vom Local Storage ein");

    const value = this.localStorageService.getItem(this.key);
    if (value === null) {
      console.log("Keine Daten im Speicher gefunden");
      return this.createDefaultOrte();
    }

    // JSON.parse erzeugt kein gültiges Datum
    let storage = value as string[];

    console.log({ storageArbeitszeitValue: storage });

    return storage.sort();

  }

  private createDefaultOrte(): string[] {

    var temp = new Array;
    temp.push("Dr. Müller");
    temp.push("Dr. Meier");
    temp.push("Dr. Schmitt");
    temp.push("Dr. Vittali");

    console.log({ "Testdaten erzeugt": temp });
    return temp;
  }

}


