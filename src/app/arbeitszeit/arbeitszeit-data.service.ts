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

  getArbeitszeit(id: number): Arbeitszeit | undefined {
    return this.arbeitszeiten.find(element => element.id == id);
  }

  /**
   * Aktualisieren der Arbeitszeit
   * @param arbeitszeit 
   */
  updateArbeitszeit(arbeitszeit: Arbeitszeit) {

    console.log("arbeitszeit" + JSON.stringify(arbeitszeit))

    var current = this.getArbeitszeit(arbeitszeit.id);
    if (current) {

      console.log("current" + JSON.stringify(current))

      current.datum = arbeitszeit.datum;
      current.von = arbeitszeit.von;
      current.bis = arbeitszeit.bis;
      current.pause = arbeitszeit.pause;

      console.log("current" + JSON.stringify(current))
    }

    console.log("getArbeitszeit" + JSON.stringify(this.getArbeitszeit(arbeitszeit.id)))

    this.localStorageService.setItem(this.key, JSON.stringify(this.arbeitszeiten));

  }

  private getArbeitszeitenFromLocalStorage(): any {

    var value = this.localStorageService.getItem(this.key);
    if (value === null) {
      console.log("Keine Daten im Speicher gefunden");
      
          return [
        { id: 1, datum: "2023-02-06", von: "10:00", bis: "17:00", pause: 45 },
        { id: 2, datum: "2023-02-07", von: "08:30", bis: "12:30", pause: 0 },
        { id: 3, datum: "2023-02-14", von: "14:00", bis: "18:00", pause: 0 },
        { id: 4, datum: "2023-03-07", von: "15:00", bis: "18:00", pause: 0 },
        { id: 5, datum: "2023-03-08", von: "08:00", bis: "15:00", pause: 60 },
        { id: 6, datum: "2023-03-09", von: "08:30", bis: "12:30", pause: 0 },
        { id: 7, datum: "2023-03-15", von: "08:30", bis: "12:30", pause: 0 }
      ];

    }

       

    return JSON.parse(value);

    // return this.localStorageService.getItem(this.key);

    /*
    if (this.arbeitszeiten === null) {
      this.arbeitszeiten = [
        { id: 1, datum: "2023-02-06", von: "10:00", bis: "17:00", pause: 45 },
        { id: 2, datum: "2023-02-07", von: "08:30", bis: "12:30", pause: 0 },
        { id: 3, datum: "2023-02-14", von: "14:00", bis: "18:00", pause: 0 },
        { id: 4, datum: "2023-03-07", von: "15:00", bis: "18:00", pause: 0 },
        { id: 5, datum: "2023-03-08", von: "08:00", bis: "15:00", pause: 60 },
        { id: 6, datum: "2023-03-09", von: "08:30", bis: "12:30", pause: 0 },
        { id: 7, datum: "2023-03-15", von: "08:30", bis: "12:30", pause: 0 }
      ]
    }
    */

  }
}
