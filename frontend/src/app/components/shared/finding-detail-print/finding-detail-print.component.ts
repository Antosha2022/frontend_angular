import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../service/Api/api.service";
import {FindingDto} from "../../../service/Api/DTO/finding.dto";
import {SpeciesItemDto} from "../../../service/Api/DTO/species-item.dto";
import {ReviewDto} from "../../../service/Api/DTO/review.dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-finding-detail-print',
  templateUrl: './finding-detail-print.component.html',
  styleUrls: ['./finding-detail-print.component.scss']
})
export class FindingDetailPrintComponent implements OnInit{
  collectionId?: number;
  visitId?: number;
  width?: number;
  height?: number;
  version?: number;
  template_number?: string
  template_latitude?: string
  template_longitude?: string
  template_latin_name?: string
  template_trivial_name?: string
  template_sex?: string
  template_finder_first_name?: string
  template_finder_last_name?: string
  template_finder_first_name_initial?: string
  template_finder_last_name_initial?: string
  template_author?:  string
  template_visit_date?: string
  template_visit_date_year?: string
  template_visit_name?: string
  template_visit_location?: string
  findingId?: number;
  lastVersion = 0;
  finding?: FindingDto = undefined;
  speciesId = 0;
  reviewId = 0;

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private router: Router,
  ) {
  }
  ngOnInit(): void {
    this.collectionId = Number(this.router.routerState.snapshot.url.split('/')[2])
    this.visitId = Number(this.router.routerState.snapshot.url.split('/')[4])
    this.findingId = Number(this.router.routerState.snapshot.url.split('/')[6])

      this.api.findingsEndpoint.getOneFinding(this.collectionId, this.visitId, this.findingId).subscribe((finding: FindingDto) => {
        this.finding = finding;
        this.template_sex = this.finding.sex
        this.template_number = finding.number
        this.template_latitude = this.finding.location_latitude.toString()
        this.template_longitude = this.finding.location_longitude.toString()
        this.lastVersion = Number(finding.version);

        this.api.reviewEndpoint.getAllReviews().subscribe((reviews: ReviewDto[]) => {
          for (const review of reviews) {
            if (review.version === finding.version && finding.field_visit_id === review.field_visit_id) {
              this.template_finder_first_name = review.requester.first_name;
              this.template_finder_last_name = review.requester.last_name;
              this.template_finder_first_name_initial = this.template_finder_first_name.substr(0,1).toUpperCase()+'.'
              this.template_finder_last_name_initial = this.template_finder_last_name.substr(0,1).toUpperCase()+'.'
            }
          }
        })

        this.api.visitEndpoint.getOneVisit(this.collectionId!, this.visitId!).subscribe((result)=>{
          this.template_visit_date = result.date.toString()
          this.template_visit_date_year = this.template_visit_date!.substr(0,4)
          this.template_author = this.template_finder_last_name+`, `+this.template_visit_date_year
          this.template_visit_location = result.location;
          this.template_visit_name = result.name;
        })

        this.api.speciesDatabaseEndpoint.getOneSpecies(finding.species_id).subscribe((species:SpeciesItemDto)=>{
          this.template_latin_name = species.latin_name;
          this.template_trivial_name = species.trivial_name;
        })
      })
    // })
  }
  selectFindingVersion(collectionId: number, visitId: number, findingIdVersion: number, version: number){
    this.api.findingsEndpoint.getOneFindingVersion(this.collectionId!,this.visitId!, findingIdVersion,version).subscribe((finding: FindingDto)=>{
      this.finding = finding
      this.template_sex = this.finding.sex
      this.speciesId =Number(this.finding.species_id);

      this.api.speciesDatabaseEndpoint.getOneSpecies(this.speciesId).subscribe((species:SpeciesItemDto)=>{
        this.template_latin_name = species.latin_name
        this.template_trivial_name = species.trivial_name;
      })
    })
  }
  sizeForm = new FormGroup({
    width: new FormControl(210,[
      Validators.required,
      Validators.min(30),
      Validators.max(297)
    ]),
    height: new FormControl(297,[
      Validators.required,
      Validators.min(30),
      Validators.max(297)
    ])
  })
  sizeSelected = false;
  template_width?: number;
  template_height?: number;
  sizeSubmit(){
    if(this.sizeForm.valid){
    this.sizeSelected = true
    this.template_width = Number(this.sizeForm.controls.width.value)
    this.template_height = Number(this.sizeForm.controls.height.value)
    }
  }

  print(){
    // console.log('Width:' ,this.template_width)
    // console.log('Height:' ,this.template_height)
    // console.log('Version:', this.finding!.version)
    // console.log('template_number', this.template_number)
    // console.log('template_latitude:', this.template_latitude)
    // console.log('template_longitude:', this.template_longitude)
    // console.log('template_latin_name:', this.template_latin_name)
    // console.log('template_trivial_name:', this.template_trivial_name)
    // console.log('template_sex:', this.template_sex)
    // console.log('template_finder_first_name: ', this.template_finder_first_name)
    // console.log('template_finder_last_name: ', this.template_finder_last_name)
    // console.log('template_finder_first_name_initial: ', this.template_finder_first_name_initial)
    // console.log('template_finder_last_name_initial: ',this.template_finder_last_name_initial)
    // console.log('template_author: ', this.template_author)
    // console.log('template_visit_date: ', this.template_visit_date)
    // console.log('template_visit_date_year: ', this.template_visit_date_year)
    // console.log('template_visit_name: ', this.template_visit_name)
    // console.log('template_visit_location: ', this.template_visit_location)
    // const url = 'http://backend.species-collector.test/api/v1/collections/'+ this.finding!.collection_id+'/field-visits/'+this.finding!.field_visit_id+'/tags';
    // // return this.http.get(url, {width: this.width!,params:100,150,2, responseType: "arraybuffer", height: 150,version: 2,template:{number: this.finding!.number}} )
    // console.log(url)
  }
}
