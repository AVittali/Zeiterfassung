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

  orte: String[] = this.getOrteFromLocalStorage();

  constructor(private localStorageService: LocalStorageService) { }

  getOrte(): String[] {
    return this.orte;
  }

  /**
   * Aktualisieren der Arbeitszeit
   * @param arbeitszeit 
   */
  updateArbeitszeit(arbeitszeit: Arbeitszeit) {

    // console.log({ updateArbeitszeit: arbeitszeit });


    // // Neuanlage
    // if (!arbeitszeit.id) {
    //   console.log({ neuanlage: arbeitszeit });

    //   arbeitszeit.id = uuidv4();
    //   this.arbeitszeiten.push(arbeitszeit);
    //   this.localStorageService.setItem(this.key, this.arbeitszeiten);
    //   return;
    // }

    // // Daten aktualisieren
    // var current = this.getArbeitszeit(arbeitszeit.id);
    // if (current) {
    //   console.log({ currentUebertragen: current });

    //   current.datum = arbeitszeit.datum;
    //   current.von = arbeitszeit.von;
    //   current.bis = arbeitszeit.bis;
    //   current.pause = arbeitszeit.pause;

    // }

    // console.log({ getArbeitszeit: this.getArbeitszeit(arbeitszeit.id) });

    // this.localStorageService.setItem(this.key, this.arbeitszeiten);

  }

  private getOrteFromLocalStorage(): String[] {

    console.log("Lese Orte vom Local Storage ein");

    const value = this.localStorageService.getItem(this.key);
    if (value === null) {
      console.log("Keine Daten im Speicher gefunden");
      return this.createDefaultOrte();
    }

    // JSON.parse erzeugt kein gültiges Datum
    let storage = value as String[];

    console.log({ storageArbeitszeitValue: storage });

    return storage.sort();

  }

  private createDefaultOrte(): String[] {

    var temp = new Array;
    temp.push("Dr. Müller");
    temp.push("Dr. Meier");
    temp.push("Dr. Schmitt");
    temp.push("Dr. Vittali");

    console.log({ "Testdaten erzeugt": temp });
    return temp;
  }

}


