import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FindingDto} from "../../../service/Api/DTO/finding.dto";
import {ApiService} from "../../../service/Api/api.service";
import {Router} from "@angular/router";
import {NgFor, NgIf, AsyncPipe} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormBuilder, FormsModule, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatRadioModule} from "@angular/material/radio";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient} from "@angular/common/http";
import {InfoPrintTemplateComponent} from "../info-print-template/info-print-template.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-print-tags-version0',
  templateUrl: './print-tags-version0.component.html',
  styleUrls: ['./print-tags-version0.component.scss'],
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
  ],
})
export class PrintTagsVersion0Component {
  visitId?: number;
  collectionId?: number;
  attached_finding: FindingDto[] = [];
  last_version = 0;
  selected_version = 0;
  selected_width = 0;
  selected_height = 0;
  stringValue='';
  spinnerShow = false;
  printDisable?: boolean;
  // tags: string[] = [];

  constructor(
    private api: ApiService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog

  ) {
    this.collectionId = Number(this.router.routerState.snapshot.url.split('/')[2])
    this.visitId = Number(this.router.routerState.snapshot.url.split('/')[4])
    // this.findingId = Number(this.router.routerState.snapshot.url.split('/')[6])

    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );

    // get attached finding, get last version by first element
    this.api.findingsEndpoint.getAllFindings(this.collectionId,this.visitId).subscribe((findings: FindingDto[])=>{
      this.last_version = findings[0].version
      this.selected_version = this.last_version
    })

  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;

  //initial selected tags for print version-0
  tags: string[] = [
    '{latin_name}',
    '{sex_symbol}',
    '\n',
    '({author});',
    '{visit_date_year}',
    '\n',
    'Leg. {finder_first_name_initial}.',
    '{finder_last_name}',
    '\n'
  ];
  allTags: string[] = [
    '@',
    '{latin_name}',
    '{trivial_name}',
    '{sex_symbol}',
    '({author});',
    '{visit_date_year}',
    '{latitude}',
    '{sex}',
    '{finder_first_name}',
    '{finder_last_name}',
    '{finder_first_name_initial}',
    '{finder_last_name_initial}',
    '{author}',
    '{visit_date}',
    '{visit_name}',
    '{visit_location}',
    '{version}',
    '#{number}',
    '{number}',
    'Leg. {finder_first_name_initial}.'
  ];

  chipsForm = new FormControl({
    templates: new FormControl(this.tags,[
      Validators.required
    ])
  })
  apiUri = 'http://backend.species-collector.test';
  printResponse(){
    let inputWidth = document.querySelector('#width-input');
    let inputHeight = document.querySelector('#height-input');
    // @ts-ignore
    this.selected_width = Number(inputWidth.value)
    // @ts-ignore
    this.selected_height = Number(inputHeight.value)
    // array to string and replace all tag@
    const tagsArray = this.chipsForm.value?.templates.value
    const tagsString = tagsArray!.join(' ').replace(/@/g, '\n')
    // code new string
    this.stringValue = `${encodeURIComponent(tagsString)}`;
    // pass to endpoints
    this.api.visitEndpoint.printTag(this.collectionId!, this.visitId!, this.selected_width, this.selected_height, this.selected_version, this.stringValue).subscribe((response)=>{
      this.apiUri = this.apiUri+response.uri;
      this.goToLink(this.apiUri)
    })
    // this.spinnerShow = true
    this.dialog.closeAll()
  }
  goToLink(url: string){
    window.open(url, "_blank");
  }
  closeDialog(){
    this.dialog.closeAll()
  }

  selectVersion(version:number){
    this.selected_version = version;
  }
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined;

  add(event: MatChipInputEvent): void {
    const value = (event.value || ' ' || '`\n`');

    // Add our tag
    if (value) {
      this.tags.push(value);
      this.printDisable = false;
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if(this.tags.length === 1 ){
      this.printDisable = true;
    }

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput!.nativeElement.valueOf();
    this.tagCtrl.setValue(null);
    this.printDisable = false;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  // open info-dialog
  openInfoDialog() {
    const dialogRef = this.dialog.open(InfoPrintTemplateComponent, {
    })
    dialogRef.afterClosed()
  }
}
