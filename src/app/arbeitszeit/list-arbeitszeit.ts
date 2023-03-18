import {Component} from '@angular/core';
import { Arbeitszeit } from './arbeitszeit';
import { ArbeitszeitDataService } from './arbeitszeit-data.service';
// import { MatTableDataSource } from '@angular/material/table';
// import {MatTableModule} from '@angular/material/table'
// import {MatListModule} from '@angular/material/list';

/**
 * @title Basic list
 */
@Component({
  selector: 'list-arbeitszeit',
  templateUrl: 'list-arbeitszeit.html',
  styleUrls: ['list-arbeitszeit.css'],
})

// export class ListArbeitszeit implements OnInit {
export class ListArbeitszeit {
  displayedColumns: string[] = ['datum', 'von', 'bis', 'pause'];
  arbeitszeiten: Arbeitszeit[] = new ArbeitszeitDataService().getArbeitszeiten();

  // dataSource = new MatTableDataSource(this.arbeitszeiten);

  constructor() {}

  // ngAfterViewInit() {}

  // ngOnInit(): void {}
}