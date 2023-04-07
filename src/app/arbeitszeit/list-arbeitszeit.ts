import { Component, OnInit } from '@angular/core';
import { Arbeitszeit } from './arbeitszeit';
import { ArbeitszeitDataService } from './arbeitszeit-data.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table'
import { MatListModule } from '@angular/material/list';
import format from 'date-fns/format';

/**
 * @title Basic list
 */
@Component({
  selector: 'list-arbeitszeit',
  templateUrl: 'list-arbeitszeit.html',
  styleUrls: ['./list-arbeitszeit.scss']
})

export class ListArbeitszeit {

  // Spaltenüberschriften
  displayedColumns: string[] = ['datum', 'von', 'bis', 'pause'];

  // Anzuzeigende Daten
  arbeitszeiten: Arbeitszeit[] = this.arbeitszeitDataService.getArbeitszeiten();

  // dataSource = new MatTableDataSource(this.arbeitszeiten);

  constructor(private router: Router, private arbeitszeitDataService: ArbeitszeitDataService) { }

  // ngAfterViewInit() {}

  // ngOnInit(): void {}

  /**
   * Details anzeigen
   * @param row 
   */
  navigateTo(row: any) {
    this.router.navigate(['/detail/' + row.id]);
  }

  create() {
    console.log("create clicked");

    this.router.navigate(['/detail/' + 0]);
  }

  formatDatum(datumValue: any): String {
    // console.log({formatDatum: datumValue});
    return format(datumValue, 'dd.MM.yyyy');
  }

  formatZeit(zeitValue: number): String {

    var stunden = Math.floor(zeitValue / 100);
    var minuten = zeitValue % 100;
    return this.formatNumber(stunden) + ":" + this.formatNumber(minuten);

  }

  private formatNumber(number: number): String {
    if (number < 10) {
      return "0" + number;
    }

    return number + "";
  }

}