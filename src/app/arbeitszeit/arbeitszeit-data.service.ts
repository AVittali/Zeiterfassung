import { NgFor } from '@angular/common';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Arbeitszeit } from './arbeitszeit';

@Injectable({
  providedIn: 'root'
})
export class ArbeitszeitDataService {

  private key: string = "keyForLocalStorage";

  arbeitszeiten: Arbeitszeit[] = this.getArbeitszeitenFromLocalStorage();

  constructor(private localStorageService: LocalStorageService) { }

  getArbeitszeiten() {
    return this.arbeitszeiten;
  }

  getArbeitszeit(id: number): Arbeitszeit {

    if (id == 0)
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

      arbeitszeit.id = this.getNextId();
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

  private getArbeitszeitenFromLocalStorage(): Arbeitszeit[] {

    console.log("Lese Local Storage ein");

    const value = this.localStorageService.getItem(this.key);
    if (value === null) {
      console.log("Keine Daten im Speicher gefunden");
      return this.createDefaultArbeitszeit();
    }

    console.log({ getArbeitszeitenFromLocalStorage: value });
    return value;

  }

  private createDefaultArbeitszeit() {
    var temp = [
      { id: 1, datum: new Date("2023-02-06"), von: "10:00", bis: "17:00", pause: 45 },
      { id: 2, datum: new Date("2023-02-07"), von: "08:30", bis: "12:30", pause: 0 },
      { id: 3, datum: new Date("2023-02-14"), von: "14:00", bis: "18:00", pause: 0 },
      { id: 4, datum: new Date("2023-03-07"), von: "15:00", bis: "18:00", pause: 0 },
      { id: 5, datum: new Date("2023-03-08"), von: "08:00", bis: "15:00", pause: 60 },
      { id: 6, datum: new Date("2023-03-09"), von: "08:30", bis: "12:30", pause: 0 },
      { id: 7, datum: new Date("2023-02-14"), von: "14:00", bis: "18:00", pause: 0 },
      { id: 8, datum: new Date("2023-03-15"), von: "08:00", bis: "16:00", pause: 60 },
      { id: 9, datum: new Date("2023-03-16"), von: "08:00", bis: "12:00", pause: 0 },
      { id: 10, datum: new Date("2023-03-20"), von: "08:30", bis: "14:30", pause: 45 },
      { id: 11, datum: new Date("2023-03-21"), von: "08:30", bis: "15:30", pause: 60 }
    ];

    console.log({ "Testdaten erzeugt": temp });
    return temp;
  }

  getNextId(): number {

    var max: number = 0;
    this.arbeitszeiten.forEach(element => {
      if (max < element.id) {
        max = element.id
      }
    });

    return max + 1;

  }
}


