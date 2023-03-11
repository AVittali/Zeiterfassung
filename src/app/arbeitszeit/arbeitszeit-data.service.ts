import { Injectable } from '@angular/core';
import { Arbeitszeit } from './arbeitszeit';

@Injectable({
  providedIn: 'root'
})
export class ArbeitszeitDataService {

  arbeitszeiten: Arbeitszeit[] = [
    { datum: "2023-03-07", von: "15:00", bis: "18:00", pause: 0 },
    { datum: "2023-03-08", von: "08:00", bis: "15:00", pause: 60 },
    { datum: "2023-03-09", von: "08:30", bis: "12:30", pause: 0 }
  ]

  constructor() { }

  getArbeitszeiten() {
    return this.arbeitszeiten;
  }
}
