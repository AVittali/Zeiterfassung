import { Component } from '@angular/core';
import { Arbeitszeit } from './arbeitszeit/arbeitszeit';
import { ArbeitszeitDataService } from './arbeitszeit/arbeitszeit-data.service';
import { ButtonOverviewExample } from './button-overview-example';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Zeiterfassung';

  // arbeitszeiten: Arbeitszeit[] = new ArbeitszeitDataService().getArbeitszeiten();
  
}
