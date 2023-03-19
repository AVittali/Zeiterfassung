import { NgFor } from '@angular/common';
import { Injectable } from '@angular/core';
import { Arbeitszeit } from './arbeitszeit';

@Injectable({
  providedIn: 'root'
})
export class ArbeitszeitDataService {

  arbeitszeiten: Arbeitszeit[] = [
    { id: 1, datum: "2023-03-07", von: "15:00", bis: "18:00", pause: 0 },
    { id: 2, datum: "2023-03-08", von: "08:00", bis: "15:00", pause: 60 },
    { id: 3, datum: "2023-03-09", von: "08:30", bis: "12:30", pause: 0 },
    { id: 4, datum: "2023-03-15", von: "08:30", bis: "12:30", pause: 0 }
  ]

  constructor() { }

  getArbeitszeiten() {
    return this.arbeitszeiten;
  }

  getArbeitszeit(id: number): Arbeitszeit | undefined {
    return this.arbeitszeiten.find(element => element.id == id);
  }

  updateArbeitszeit(arbeitszeit: Arbeitszeit) {
    // TODO ausprogrammieren
    // Arbeitszeit current = this.getArbeitszeit(arbeitszeit.id);
  }
}
