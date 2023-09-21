import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FindingDto} from "../../../service/Api/DTO/finding.dto";
import {ApiService} from "../../../service/Api/api.service";
import {Router} from "@angular/router";
import {NgFor, NgIf, AsyncPipe} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from "@angular/material/radio";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {InfoPrintTemplateComponent} from "../info-print-template/info-print-template.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PrintTagsVersion0Component} from "../print-tags-version0/print-tags-version0.component";
import {PrintTagsVersion1Component} from "../print-tags-version1/print-tags-version1.component";
import {PrintTagsVersion2Component} from "../print-tags-version2/print-tags-version2.component";

@Component({
  selector: 'app-print-tags',
  templateUrl: './print-tags.component.html',
  styleUrls: ['./print-tags.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    NgFor,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    MatRadioModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    PrintTagsVersion0Component,
    PrintTagsVersion1Component,
    PrintTagsVersion2Component,
  ],
})
export class PrintTagsComponent {
  visitId?: number;
  collectionId?: number;
  last_version = 0;
  selected_version = 0;

  constructor(
    private api: ApiService,
    private router: Router,
    public dialog: MatDialog

  ) {
    this.collectionId = Number(this.router.routerState.snapshot.url.split('/')[2])
    this.visitId = Number(this.router.routerState.snapshot.url.split('/')[4])

    // get attached finding, get last version by first element
    this.api.findingsEndpoint.getAllFindings(this.collectionId,this.visitId).subscribe((findings: FindingDto[])=>{
      this.last_version = findings[0].version
      this.selected_version = this.last_version
    })

  }

  closeDialog(){
    this.dialog.closeAll()
  }

  selectVersion(version:number){
    this.selected_version = version;
  }

  openInfoDialog() {
    const dialogRef = this.dialog.open(InfoPrintTemplateComponent, {
    })
    dialogRef.afterClosed()
  }
}
