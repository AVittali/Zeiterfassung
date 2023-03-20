import { Component } from '@angular/core';
import { Arbeitszeit } from './arbeitszeit/arbeitszeit';
import { ArbeitszeitDataService } from './arbeitszeit/arbeitszeit-data.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Zeiterfassung';

  arbeitszeiten: Arbeitszeit[] = new ArbeitszeitDataService(new LocalStorageService).getArbeitszeiten();

  /*
  constructor(breakpointObserver: BreakpointObserver) {
    const layoutChanges = breakpointObserver.observe([
      '(orientation: portrait)',
      '(orientation: landscape)',
    ]);
    
    layoutChanges.subscribe(result => {
      // ngupdateMyLayoutForOrientationChange();
    });
  }
*/
  
  
}


