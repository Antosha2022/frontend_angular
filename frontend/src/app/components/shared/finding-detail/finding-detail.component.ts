import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../service/Api/api.service";
import {FindingDto} from "../../../service/Api/DTO/finding.dto";
import {SpeciesItemDto} from "../../../service/Api/DTO/species-item.dto";
import {FormControl, FormGroup} from '@angular/forms';
import {SpeciesService} from "../../../service/species.service";
import {ReviewDto} from "../../../service/Api/DTO/review.dto";
import {PrintTagsPdfDto} from "../../../service/Api/DTO/print-tags-pdf.dto";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";


@Component({
  selector: 'app-finding-detail',
  templateUrl: './finding-detail.component.html',
  styleUrls: ['./finding-detail.component.scss'],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class FindingDetailComponent implements OnInit{
  public bssPrint!: PrintTagsPdfDto;
  collectionId?: number;
  visitId?: number;
  public findingId?: number;
  // finding_number = '';
  public lastVersion = 0;
  public latinName?: string = '';
  public trivialName?: string = '';
  public finding?: FindingDto = undefined;
  visitDate = '';
  visitName = '';
  visitDescription = '';
  visitLocation = '';
  sliderGpsDisabled = false;
  sliderLvDisabled = false;
  isGpsShown: boolean = false ;
  isLvShown: boolean = false ;
  speciesId = 0;
  reviewerName = '';
  reviewerLastName = '';
  reviewerId = 0;
  reviewId = 0;
  // width = `0`;
  public lv03: object = {
    altitude: "",
    easting: "",
    northing:""
  };
  public gps: object = {
    altitude: "",
    easting: "",
    northing:""
  };

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private router: Router,
    private service: SpeciesService
  ) {
  }
  ngOnInit(): void {

    this.collectionId = Number(this.router.routerState.snapshot.url.split('/')[2])
    this.visitId = Number(this.router.routerState.snapshot.url.split('/')[4])
    this.findingId = Number(this.router.routerState.snapshot.url.split('/')[6])

        this.api.findingsEndpoint.getOneFinding(this.collectionId!, this.visitId!, this.findingId!).subscribe((finding: FindingDto) => {
          this.finding = finding;
          this.lastVersion = Number(finding.version);
          // const finding_number = finding.number;

          const speciesId =Number(this.finding.species_id);

          this.api.reviewEndpoint.getAllReviews().subscribe((reviews: ReviewDto[]) => {
            for (const review of reviews) {
              if (review.version === finding.version && finding.field_visit_id === review.field_visit_id) {
                this.reviewerId = review.reviewer_id;
                this.reviewerName = review.reviewer.first_name;
                this.reviewerLastName = review.reviewer.last_name;
                this.reviewId = review.id;
              }
            }
          })

          this.api.visitEndpoint.getOneVisit(this.collectionId!, this.visitId!).subscribe((result)=>{
            this.visitDate = result.date;
            this.visitName = result.name!;
            this.visitDescription = result.description!;
            this.visitLocation = result.location!
          })

          this.api.speciesDatabaseEndpoint.getOneSpecies(speciesId).subscribe((species:SpeciesItemDto)=>{
            this.latinName = species.latin_name
            this.trivialName = species.trivial_name;
          })
        })
  }
 selectFindingVersion(findingIdVersion: number, version: number){
    this.api.findingsEndpoint.getOneFindingVersion(this.collectionId!, this.visitId!, findingIdVersion,version).subscribe((finding: FindingDto)=>{
      this.finding = finding

      this.speciesId =Number(this.finding.species_id);
      this.api.speciesDatabaseEndpoint.getOneSpecies(this.speciesId).subscribe((species:SpeciesItemDto)=>{
        this.latinName = species.latin_name
        this.trivialName = species.trivial_name;
      })
    })
 }
  convertGpsToLv() {
    this.sliderGpsDisabled = true;
    this.isGpsShown = !this.isGpsShown;
    // this.isLvShown = !this.isLvShown;
    const Latitude = Number(this.finding!.location_latitude)
    const Longitude = Number(this.finding!.location_latitude)
    const Altitude = Number(this.finding!.location_latitude)
    this.service.convertGpsToLv03(Latitude, Longitude, Altitude).subscribe((lv03:object) => {
      this.lv03 = lv03;
      // todo: get data from this object to print-tags
      console.log('convert response with LV03 data:', lv03)
    })
  }
    convertLvToGps(){
      this.sliderLvDisabled = true;
      this.isLvShown = !this.isLvShown;
      // this.isGpsShown = !this.isGpsShown;
      const Latitude = Number(this.finding!.location_latitude)
      const Longitude = Number(this.finding!.location_latitude)
      const Altitude = Number(this.finding!.location_latitude)
      this.service.convertLv03ToGps(Latitude,Longitude,Altitude).subscribe((gps:object)=>{
        this.gps = gps;
        // todo: get data from this object to print-tags
        console.log('convert response with GPS data:', gps)
      })
    }

bssForm = new FormGroup({
  Finding_number: new FormControl(false),
  version: new FormControl(false),
  Latin_name: new FormControl(false),
  Trivial_name: new FormControl(false),
  Finding_sex: new FormControl(false),
  Comment: new FormControl(false),
  Visit_name: new FormControl(false),
  Date: new FormControl(false),
  Visit_description: new FormControl(false),
  Details: new FormControl(false),
  Collection_id: new FormControl(false),
  Visit_id: new FormControl(false),
  Finding_ID: new FormControl(false),
  Species_id: new FormControl(false),
  Reviewer_id: new FormControl(false),
  Review_id: new FormControl(false),
  Reviewer_name: new FormControl(false),
  Reviewer_last_name: new FormControl(false),
  Location: new FormControl(false),
  Latitude: new FormControl(false),
  Longitude: new FormControl(false),
  Altitude: new FormControl(false),
  LatitudeLV03: new FormControl(false),
  LongitudeLV03: new FormControl(false),
  AltitudeLV03: new FormControl(false),
  LatitudeGPS: new FormControl(false),
  LongitudeGPS: new FormControl(false),
  AltitudeGPS: new FormControl(false),
})


  // defaultValues = { min: -1, max: 9378 };
  // relevantValues = { min: 500, max: 3000 };
  // oldSelectionValues = { min: 3380, max: 5190 };
  // newSelectionValues = { min: 500, max: 3000 };
  // templateSize = new FormGroup(
  //   {
  //     Width: new FormControl('210'),
  //     Height: new FormControl('297'),
  //   })
  // templateHeight = new FormGroup({
  //     Height: new FormControl('297'),
  //   })

  allComplete: boolean = false;
  topComplete: boolean = false;
  redComplete: boolean = true;
  setAll(completed: boolean) {
    this.allComplete = completed;
  }
  setTop(completed: boolean) {
    this.topComplete = completed;
  }
  clearAll(completed: boolean){
    this.allComplete = false;
    this.topComplete = false;
    this.redComplete = false;
  }
  // width = ''
  // height = ''
  // formatLabelWidth(valueWidth: number): string {
  //   this.width = `${valueWidth}`;
  //   return `${valueWidth}mm`;
  // }
  // formatLabel(value: number): string {
  //   this.height = `${value}`;
  //   return `${value}mm`;
  // }
  // print(){
  //   console.log('form value width, mm: ',this.width)
  //   console.log('form value height, mm: ',this.height)
  // }
}
