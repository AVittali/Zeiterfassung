import { Component } from '@angular/core';
import { Arbeitszeit } from './arbeitszeit';
import { ArbeitszeitDataService } from './arbeitszeit-data.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table'
import { MatListModule } from '@angular/material/list';

/**
 * @title Basic list
 */
@Component({
  selector: 'list-arbeitszeit',
  templateUrl: 'list-arbeitszeit.html'
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

}