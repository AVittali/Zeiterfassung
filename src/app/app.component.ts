import { Component } from '@angular/core';
import { Arbeitszeit } from './arbeitszeit/arbeitszeit';
import { ArbeitszeitDataService } from './arbeitszeit/arbeitszeit-data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LocalStorageService } from './local-storage.service';
import { format } from 'date-fns';

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
  save() {
    console.log("In Datei speichern");
    var fileName = "Arbeitszeiten " + format(new Date(), 'yyyy-MM-dd HH-mm') + ".json";
    this.writeContents(JSON.stringify(this.arbeitszeiten), fileName, 'text/plain');
  }

  writeContents(content: any, fileName: any, contentType: any) {
    var a = document.createElement('a');
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  load() {
    console.log("Aus Datei laden");

  }

}


