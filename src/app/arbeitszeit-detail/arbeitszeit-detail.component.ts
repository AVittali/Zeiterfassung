import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'

import { Arbeitszeit } from '../arbeitszeit/arbeitszeit';
import { ArbeitszeitDataService } from '../arbeitszeit/arbeitszeit-data.service';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-arbeitszeit-detail',
  templateUrl: './arbeitszeit-detail.component.html',
  styleUrls: ['./arbeitszeit-detail.component.css']
})

export class ArbeitszeitDetailComponent implements OnInit {
  arbeitszeit: Arbeitszeit | undefined;

  constructor(
    private route: ActivatedRoute,
    private arbeitszeitService: ArbeitszeitDataService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getArbeitszeit();
  }

  getArbeitszeit(): void {

    console.log(this.route.snapshot.paramMap.get('id'));

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.arbeitszeit = this.arbeitszeitService.getArbeitszeit(id);

    console.log("Arbeitszeit mit ID " + this.arbeitszeit?.id + " einglesen");
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    // TODO Ausprogrammieren
    /*
    if (this.arbeitszeit) {
      this.arbeitszeitService.updateArbeitszeit(this.arbeitszeit)
        .subscribe(() => this.goBack());
    }
    */
    if (this.arbeitszeit) {
      this.arbeitszeitService.updateArbeitszeit(this.arbeitszeit);
    }
    this.goBack();

  }
}
