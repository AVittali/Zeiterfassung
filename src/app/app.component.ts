import { Component } from '@angular/core';
import { Arbeitszeit } from './arbeitszeit/arbeitszeit';
import { ArbeitszeitDataService } from './storage/arbeitszeit-data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LocalStorageService } from './storage/local-storage.service';
import { format } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrtDataService } from './storage/ort-data.service';
import { EinstellungDataService } from './storage/einstellungen-data.service';
import { Einstellung } from './einstellungen/einstellung';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Zeiterfassung';



  constructor(private router: Router,
    private arbeitszeitDataService: ArbeitszeitDataService,
    private ortDataService: OrtDataService,
    private einstellungDataService: EinstellungDataService,
  ) {

    // TODO Eigentlich brauche ich diesen Block nicht: Bei Aufruf aus dem Browser funktioniert Orientation, ansonsten leider nicht
    screen.orientation.addEventListener("change", () => {
      console.log("Orientation change");

    });

    window.addEventListener("load", () => {
      console.log("Orientation load");
    });

  }

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
    this.writeContents(JSON.stringify([this.arbeitszeitDataService.getArbeitszeiten(), this.ortDataService.getOrte(), this.einstellungDataService.getEinstellung()]), fileName, 'text/plain');
  }

  writeContents(content: any, fileName: any, contentType: any) {
    var a = document.createElement('a');
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  load(): void {
    console.log("Aus Datei laden");
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.json'; // optional, specifies the file type
    if (inputElement == null)
      return;

    var fileContent: string = "";
    inputElement.onchange = () => {

      if (inputElement.files == null)
        return;

      var loadedFile = inputElement.files[0] as File;
      console.log('Selected file:', loadedFile);

      const reader = new FileReader();
      reader.readAsText(loadedFile);
      reader.onload = () => {
        fileContent = reader.result as string;
        console.log('File content:', fileContent);

        var parsed = JSON.parse(fileContent);
        var arbeitszeiten : Arbeitszeit[] = parsed[0];
        var orte : string[]= parsed[1];
        var einstellung : Einstellung= parsed[2];

        console.log('Arbeitszeiten geladen: ', arbeitszeiten);
        console.log('Orte geladen: ', orte);
        console.log('Einstellung geladen: ', einstellung);

        // TODO Hier könnte man noch einen Dialog dazwischen schalten
        // Schreiben in die Datenbank
        this.arbeitszeitDataService.saveArbeitszeitenToLocalStorage(arbeitszeiten);
        this.ortDataService.save(orte);
        this.einstellungDataService.save(einstellung);

        // Aktuelle Seite aktualisieren
        window.location.reload();
      };

    };

    inputElement.click();
  }

  settings(): void {
    this.router.navigateByUrl('/einstellungen');
  }

}


