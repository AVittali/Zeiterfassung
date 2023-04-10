import { NgFor } from '@angular/common';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Arbeitszeit } from '../arbeitszeit/arbeitszeit';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { v4 as uuidv4 } from 'uuid';
import { Einstellung } from '../einstellungen/einstellung';

@Injectable({
  providedIn: 'root'
})
export class EinstellungDataService {

  private key: string = "einstellungen";

  einstellung: Einstellung = this.getEinstellungFromLocalStorage();

  constructor(private localStorageService: LocalStorageService) { }

  getEinstellung(): Einstellung {
    return this.einstellung;
  }

  save(einstellung: Einstellung) {
    console.log({ save: einstellung });
    this.localStorageService.setItem(this.key, einstellung);
    this.einstellung = this.einstellung;
  }

  private getEinstellungFromLocalStorage(): Einstellung {

    console.log("Lese Einstellungen vom Local Storage ein");

    const value = this.localStorageService.getItem(this.key);
    if (value === null) {
      console.log("Keine Daten im Speicher gefunden");
      return this.createDefaultOrte();
    }

    // JSON.parse erzeugt kein gültiges Datum
    let storage = value as Einstellung;

    console.log({ storageArbeitszeitValue: storage });

    return storage;

  }

  private createDefaultOrte(): Einstellung {

    var temp = new Einstellung();
    temp.stundenlohn = 12.50;
    console.log({ "Testdaten erzeugt": temp });
    return temp;
  }

}


