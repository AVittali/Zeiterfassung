import { NgFor } from '@angular/common';
import { Injectable, isDevMode } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage.service';
import { Arbeitszeit } from '../arbeitszeit/arbeitszeit';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ArbeitszeitDataService {

  private key: string = "keyForLocalStorage";

  arbeitszeiten: Arbeitszeit[] = this.getArbeitszeitenFromLocalStorage();

  constructor(private localStorageService: LocalStorageService) { }

  getArbeitszeiten(): Arbeitszeit[] {
    return this.arbeitszeiten;
  }

  public getArbeitszeit(id: String): Arbeitszeit {

    console.log({ "Lese Arbeitszeit": id });

    if (id === "")
      return new Arbeitszeit();

    return this.arbeitszeiten.find(element => element.id == id) ?? new Arbeitszeit;
  }

  /**
   * Aktualisieren der Arbeitszeit
   * @param arbeitszeit 
   */
  updateArbeitszeit(arbeitszeit: Arbeitszeit) {

    console.log({ updateArbeitszeit: arbeitszeit });


    // Neuanlage
    if (!arbeitszeit.id) {
      console.log({ neuanlage: arbeitszeit });

      arbeitszeit.id = uuidv4();
      this.arbeitszeiten.push(arbeitszeit);
      this.localStorageService.setItem(this.key, this.arbeitszeiten);
      return;
    }

    // Daten aktualisieren
    var current = this.getArbeitszeit(arbeitszeit.id);
    if (current) {
      console.log({ currentUebertragen: current });

      current.datum = arbeitszeit.datum;
      current.von = arbeitszeit.von;
      current.bis = arbeitszeit.bis;
      current.pause = arbeitszeit.pause;

    }

    console.log({ getArbeitszeit: this.getArbeitszeit(arbeitszeit.id) });

    this.localStorageService.setItem(this.key, this.arbeitszeiten);

  }

  /**
   * Löschen der Arbeitszeit
   */
  deleteArbeitszeit(id: string) {

    console.log({ "Löschen der ID": id });

    // Element löschen
    this.arbeitszeiten.forEach((value, index) => {
      if (value.id == id) {
        this.arbeitszeiten.splice(index, 1);
        console.log("Löschen erfolgreich");

      }
    });

    // Speicher aktualisieren
    this.localStorageService.setItem(this.key, this.arbeitszeiten);

  }

  public saveArbeitszeitenToLocalStorage(arbeitszeiten: Arbeitszeit[]) {
    this.localStorageService.setItem(this.key, arbeitszeiten);
    console.log("Arbeitszeiten gespeichert");

  }


  private getArbeitszeitenFromLocalStorage(): Arbeitszeit[] {

    console.log("Lese Local Storage ein");

    const value = this.localStorageService.getItem(this.key);
    if (value === null) {
      console.log("Keine Daten im Speicher gefunden");
      return this.createDefaultArbeitszeit();
    }

    console.log({ getArbeitszeitenFromLocalStorage: value });
    // if (Array.isArray(value)) {
    //  console.log("isArray");
    //}

    // JSON.parse erzeugt kein gültiges Datum
    let storageArbeitszeit = value as Arbeitszeit[];
    storageArbeitszeit.forEach(e => {
      e.datum = new Date(e.datum);
    })

    console.log({ storageArbeitszeitValue: storageArbeitszeit });

    // Nach Datum absteigend sortieren
    return storageArbeitszeit.sort((a, b) => (a.datum.getTime() - b.datum.getTime()) * -1);

  }

  private createDefaultArbeitszeit(): Arbeitszeit[] {

    var temp = new Array;
    if (isDevMode()) {
      temp.push({ id: "1", datum: new Date("2023-02-06"), von: 1000, bis: 1700, pause: 45, lohn: 12 });
      temp.push({ id: "2", datum: new Date("2023-02-07"), von: 830, bis: 1230, pause: 0, lohn: 12 });
      temp.push({ id: "3", datum: new Date("2023-02-14"), von: 1400, bis: 1800, pause: 0, lohn: 12 });
      temp.push({ id: "4", datum: new Date("2023-03-07"), von: 1500, bis: 1800, pause: 0, lohn: 12 });
      temp.push({ id: "5", datum: new Date("2023-03-08"), von: 800, bis: 1500, pause: 60, lohn: 12 });
      temp.push({ id: "6", datum: new Date("2023-03-09"), von: 830, bis: 1230, pause: 0, lohn: 12 });
      temp.push({ id: "7", datum: new Date("2023-02-14"), von: 1400, bis: 1800, pause: 0, lohn: 12 });
      temp.push({ id: "8", datum: new Date("2023-03-15"), von: 800, bis: 1600, pause: 60, lohn: 12 });
      temp.push({ id: "9", datum: new Date("2023-03-16"), von: 800, bis: 1200, pause: 0, lohn: 12 });
      temp.push({ id: "10", datum: new Date("2023-03-20"), von: 830, bis: 1430, pause: 45, lohn: 12 });
      temp.push({ id: "11", datum: new Date("2023-03-21"), von: 830, bis: 1530, pause: 60, lohn: 12 });
    }

    console.log({ "Testdaten erzeugt": temp });
    return temp;
  }

}


