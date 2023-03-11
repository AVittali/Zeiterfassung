import {Component, OnInit} from '@angular/core';
import { Arbeitszeit } from './arbeitszeit';
import { ArbeitszeitDataService } from './arbeitszeit-data.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table'
import {MatListModule} from '@angular/material/list';

/**
 * @title Basic list
 */
@Component({
  selector: 'list-arbeitszeit',
  templateUrl: 'list-arbeitszeit.html'
})

export class ListArbeitszeit implements OnInit {
  displayedColumns: string[] = ['datum', 'von', 'bis', 'pause'];
  arbeitszeiten: Arbeitszeit[] = new ArbeitszeitDataService().getArbeitszeiten();

  dataSource = new MatTableDataSource(this.arbeitszeiten);

  constructor() {}

  ngAfterViewInit() {}

  ngOnInit(): void {}
}